#!/usr/bin/env python3
"""
动态配置的API网关
支持从配置文件读取后端IP地址，无需重启即可更新
"""

import json
import os
import time
import requests
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import logging
from datetime import datetime

# 配置日志
logging.basicConfig(
    level=logging.INFO, format="%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)


class ConfigManager:
    """配置管理器"""

    def __init__(self, config_path="config.json"):
        self.config_path = config_path
        self.config = self.load_config()
        self.last_modified = 0

    def load_config(self):
        """加载配置文件"""
        try:
            with open(self.config_path, "r", encoding="utf-8") as f:
                config = json.load(f)
                logger.info(f"配置文件加载成功: {self.config_path}")
                return config
        except FileNotFoundError:
            logger.error(f"配置文件不存在: {self.config_path}")
            return self.get_default_config()
        except json.JSONDecodeError as e:
            logger.error(f"配置文件格式错误: {e}")
            return self.get_default_config()

    def get_default_config(self):
        """获取默认配置"""
        return {
            "backend": {
                "host": "43.143.246.112",
                "port": 8000,
                "protocol": "http",
                "timeout": 30,
                "retry_count": 3,
            },
            "gateway": {"host": "0.0.0.0", "port": 5000, "debug": False},
        }

    def reload_config(self):
        """重新加载配置"""
        try:
            # 检查文件修改时间
            current_modified = os.path.getmtime(self.config_path)
            if current_modified > self.last_modified:
                self.config = self.load_config()
                self.last_modified = current_modified
                logger.info("配置已重新加载")
                return True
        except Exception as e:
            logger.error(f"重新加载配置失败: {e}")
        return False

    def get_backend_url(self, endpoint=""):
        """获取后端URL"""
        backend = self.config["backend"]
        base_url = f"{backend['protocol']}://{backend['host']}:{backend['port']}"
        return f"{base_url}{endpoint}" if endpoint else base_url

    def get_backend_config(self):
        """获取后端配置"""
        return self.config["backend"]


# 全局配置管理器
config_manager = ConfigManager()


def make_backend_request(method, endpoint, **kwargs):
    """向后端发送请求"""
    # 重新加载配置（检查是否有更新）
    config_manager.reload_config()

    backend_config = config_manager.get_backend_config()
    url = config_manager.get_backend_url(endpoint)

    # 设置超时
    timeout = kwargs.get("timeout", backend_config.get("timeout", 30))
    kwargs["timeout"] = timeout

    logger.info(f"向后端发送请求: {method} {url}")

    try:
        response = requests.request(method, url, **kwargs)
        logger.info(f"后端响应: {response.status_code}")
        return response
    except requests.exceptions.Timeout:
        logger.error(f"后端请求超时: {url}")
        return None
    except requests.exceptions.ConnectionError:
        logger.error(f"后端连接失败: {url}")
        return None
    except Exception as e:
        logger.error(f"后端请求异常: {e}")
        return None


@app.route("/api/v1/health", methods=["GET"])
def health_check():
    """健康检查"""
    config_manager.reload_config()
    backend_config = config_manager.get_backend_config()

    # 测试后端连接
    backend_status = "disconnected"
    backend_error = None

    try:
        response = make_backend_request("GET", "/api/v1/status/test")
        if response and response.status_code == 200:
            backend_status = "connected"
        elif response:
            backend_status = "error"
            backend_error = f"HTTP {response.status_code}"
    except Exception as e:
        backend_error = str(e)

    return jsonify(
        {
            "status": "healthy",
            "gateway_status": "running",
            "backend_status": backend_status,
            "backend_error": backend_error,
            "backend_url": config_manager.get_backend_url(),
            "timestamp": time.time(),
        }
    )


@app.route("/api/v1/info", methods=["GET"])
def api_info():
    """API信息"""
    config_manager.reload_config()
    backend_config = config_manager.get_backend_config()

    return jsonify(
        {
            "name": "PhotoEnhance API Gateway",
            "version": "1.0.0",
            "description": "为微信小程序提供HTTPS API接口",
            "backend": config_manager.get_backend_url(),
            "endpoints": {
                "enhance": "/api/v1/enhance",
                "status": "/api/v1/status/{task_id}",
                "download": "/api/v1/download/{task_id}",
                "health": "/api/v1/health",
                "info": "/api/v1/info",
            },
        }
    )


@app.route("/api/v1/enhance", methods=["POST"])
def enhance_image():
    """图片增强"""
    if "image" not in request.files:
        return jsonify({"success": False, "message": "未找到图片文件"}), 400

    file = request.files["image"]
    if file.filename == "":
        return jsonify({"success": False, "message": "未选择文件"}), 400

    # 转发到后端
    files = {"image": (file.filename, file.stream, file.content_type)}
    response = make_backend_request("POST", "/api/v1/enhance", files=files)

    if response is None:
        return jsonify({"success": False, "message": "后端服务不可用"}), 503

    try:
        return jsonify(response.json()), response.status_code
    except:
        return response.text, response.status_code


@app.route("/api/v1/status/<task_id>", methods=["GET"])
def get_status(task_id):
    """查询任务状态"""
    response = make_backend_request("GET", f"/api/v1/status/{task_id}")

    if response is None:
        return jsonify({"success": False, "message": "后端服务不可用"}), 503

    try:
        return jsonify(response.json()), response.status_code
    except:
        return response.text, response.status_code


@app.route("/api/v1/download/<task_id>", methods=["GET"])
def download_result(task_id):
    """下载处理结果"""
    response = make_backend_request("GET", f"/api/v1/download/{task_id}", stream=True)

    if response is None:
        return jsonify({"success": False, "message": "后端服务不可用"}), 503

    if response.status_code == 200:
        return send_file(
            response.raw,
            mimetype=response.headers.get("Content-Type", "application/octet-stream"),
            as_attachment=True,
            download_name=f"enhanced_{task_id}.jpg",
        )
    else:
        try:
            return jsonify(response.json()), response.status_code
        except:
            return response.text, response.status_code


@app.route("/api/v1/config", methods=["GET"])
def get_config():
    """获取当前配置"""
    config_manager.reload_config()
    return jsonify(
        {
            "backend": config_manager.get_backend_config(),
            "gateway": config_manager.config.get("gateway", {}),
            "last_updated": datetime.now().isoformat(),
        }
    )


@app.route("/api/v1/config", methods=["POST"])
def update_config():
    """更新配置"""
    try:
        new_config = request.json
        if "backend" in new_config:
            # 更新配置文件
            config_manager.config["backend"].update(new_config["backend"])

            # 保存配置文件
            with open(config_manager.config_path, "w", encoding="utf-8") as f:
                json.dump(config_manager.config, f, indent=2, ensure_ascii=False)

            logger.info(f"配置已更新: {new_config['backend']}")
            return jsonify({"success": True, "message": "配置更新成功"})
        else:
            return jsonify({"success": False, "message": "无效的配置格式"}), 400
    except Exception as e:
        logger.error(f"更新配置失败: {e}")
        return jsonify({"success": False, "message": str(e)}), 500


if __name__ == "__main__":
    config_manager.reload_config()
    gateway_config = config_manager.config.get("gateway", {})

    host = gateway_config.get("host", "0.0.0.0")
    port = gateway_config.get("port", 5000)
    debug = gateway_config.get("debug", False)

    logger.info(f"启动API网关: {host}:{port}")
    logger.info(f"后端地址: {config_manager.get_backend_url()}")

    app.run(host=host, port=port, debug=debug)
