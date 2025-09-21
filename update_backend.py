#!/usr/bin/env python3
"""
后端IP地址更新脚本
使用方法：
python3 update_backend.py 新的IP地址
例如：python3 update_backend.py 192.168.1.100
"""

import json
import sys
import os
import subprocess
import time


def load_config():
    """加载配置文件"""
    config_path = os.path.join(os.path.dirname(__file__), "config.json")
    try:
        with open(config_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"❌ 配置文件不存在: {config_path}")
        return None
    except json.JSONDecodeError as e:
        print(f"❌ 配置文件格式错误: {e}")
        return None


def save_config(config):
    """保存配置文件"""
    config_path = os.path.join(os.path.dirname(__file__), "config.json")
    try:
        with open(config_path, "w", encoding="utf-8") as f:
            json.dump(config, f, indent=2, ensure_ascii=False)
        print(f"✅ 配置文件已更新: {config_path}")
        return True
    except Exception as e:
        print(f"❌ 保存配置文件失败: {e}")
        return False


def test_backend_connection(host, port):
    """测试后端连接"""
    import socket

    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(5)
        result = sock.connect_ex((host, port))
        sock.close()
        return result == 0
    except Exception:
        return False


def restart_api_gateway():
    """重启API网关服务"""
    try:
        # 检查是否有PM2进程
        result = subprocess.run(["pm2", "list"], capture_output=True, text=True)
        if "api-gateway" in result.stdout:
            print("🔄 重启PM2 API网关服务...")
            subprocess.run(["pm2", "restart", "api-gateway"], check=True)
            print("✅ API网关服务已重启")
        else:
            print("⚠️  未找到PM2 API网关服务，请手动重启")
    except subprocess.CalledProcessError as e:
        print(f"❌ 重启API网关失败: {e}")
    except FileNotFoundError:
        print("⚠️  PM2未安装，请手动重启API网关服务")


def main():
    if len(sys.argv) != 2:
        print("使用方法: python3 update_backend.py <新的IP地址>")
        print("例如: python3 update_backend.py 192.168.1.100")
        sys.exit(1)

    new_ip = sys.argv[1]

    # 验证IP地址格式
    import re

    ip_pattern = r"^(\d{1,3}\.){3}\d{1,3}$"
    if not re.match(ip_pattern, new_ip):
        print(f"❌ 无效的IP地址格式: {new_ip}")
        sys.exit(1)

    print(f"🔄 正在更新后端IP地址为: {new_ip}")

    # 加载配置
    config = load_config()
    if not config:
        sys.exit(1)

    old_ip = config["backend"]["host"]
    print(f"📋 当前后端IP: {old_ip}")
    print(f"📋 新后端IP: {new_ip}")

    if old_ip == new_ip:
        print("ℹ️  IP地址未变化，无需更新")
        sys.exit(0)

    # 测试新IP连接
    print(f"🔍 测试新IP连接: {new_ip}:8000")
    if test_backend_connection(new_ip, 8000):
        print("✅ 新IP连接测试成功")
    else:
        print("⚠️  新IP连接测试失败，但继续更新配置")

    # 更新配置
    config["backend"]["host"] = new_ip

    if save_config(config):
        print("✅ 配置文件更新成功")

        # 重启API网关
        restart_api_gateway()

        # 等待服务启动
        print("⏳ 等待服务启动...")
        time.sleep(3)

        # 测试API网关
        print("🔍 测试API网关...")
        try:
            import requests

            response = requests.get(
                "https://www.gongjuxiang.work/api/v1/health", timeout=10
            )
            if response.status_code == 200:
                print("✅ API网关测试成功")
                data = response.json()
                print(f"📊 后端状态: {data.get('backend_status', 'unknown')}")
            else:
                print(f"⚠️  API网关响应异常: {response.status_code}")
        except Exception as e:
            print(f"⚠️  API网关测试失败: {e}")

        print("\n🎉 后端IP地址更新完成！")
        print(f"📋 新配置: {new_ip}:8000")
        print("🌐 API地址: https://www.gongjuxiang.work/api/v1/")

    else:
        print("❌ 配置文件更新失败")
        sys.exit(1)


if __name__ == "__main__":
    main()
