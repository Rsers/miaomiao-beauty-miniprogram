# GPU 服务器镜像制作指南

**目标服务器：** 81.70.41.132  
**用途：** 制作标准镜像，用于自动扩缩容  
**支持的 API：** GFPGAN、FaceFusion  

---

## 📋 镜像制作前的检查清单

### 🚨 必须修改的配置

#### 1. 移除硬编码的 IP 地址和主机名

**检查位置：**
```bash
# 搜索硬编码的 IP 地址
grep -r "81.70.41.132" /home/ubuntu/
grep -r "127.0.0.1" /home/ubuntu/ --include="*.py" --include="*.sh" --include="*.conf"
grep -r "localhost" /home/ubuntu/ --include="*.py" --include="*.sh" --include="*.conf"
```

**应该改为：**
```python
# ❌ 错误：硬编码 IP
API_HOST = "81.70.41.132"

# ✅ 正确：使用环境变量或动态获取
API_HOST = os.environ.get("API_HOST", "0.0.0.0")
```

---

#### 2. 数据库路径配置

**检查位置：**
```bash
# 搜索数据库文件路径
find /home/ubuntu -name "*.db" -o -name "*.sqlite"
grep -r "DB_PATH\|DATABASE_URL\|db_path" /home/ubuntu/ --include="*.py"
```

**应该改为：**
```python
# ❌ 错误：硬编码路径
DB_PATH = "/home/ubuntu/gfpgan/data/pixels.db"

# ✅ 正确：使用环境变量
DB_PATH = os.environ.get("DB_PATH", "/tmp/pixels.db")

# 或动态检测环境
if os.environ.get('VERCEL'):
    DB_PATH = "/tmp/pixels.db"
else:
    DB_PATH = "/home/ubuntu/gfpgan/data/pixels.db"
```

---

#### 3. 文件上传路径配置

**检查位置：**
```bash
# 搜索上传目录
grep -r "UPLOAD_FOLDER\|uploads\|/tmp" /home/ubuntu/ --include="*.py"
```

**应该改为：**
```python
# ❌ 错误：硬编码上传目录
UPLOAD_FOLDER = "/home/ubuntu/gfpgan/uploads"

# ✅ 正确：使用临时目录或环境变量
UPLOAD_FOLDER = os.environ.get("UPLOAD_FOLDER", "/tmp/uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
```

---

#### 4. COS/OSS 配置

**检查位置：**
```bash
# 搜索对象存储配置
grep -r "SECRET_ID\|SECRET_KEY\|BUCKET\|cos\|oss" /home/ubuntu/ --include="*.py" --include="*.conf"
```

**应该改为：**
```python
# ❌ 错误：硬编码密钥
COS_SECRET_ID = "AKIDxxxxxxx"
COS_SECRET_KEY = "xxxxxxx"

# ✅ 正确：使用环境变量
COS_SECRET_ID = os.environ.get("COS_SECRET_ID")
COS_SECRET_KEY = os.environ.get("COS_SECRET_KEY")
COS_BUCKET = os.environ.get("COS_BUCKET", "photoenhancei-bj-1259206939")
COS_REGION = os.environ.get("COS_REGION", "ap-beijing")
```

---

#### 5. 日志文件路径

**检查位置：**
```bash
# 搜索日志配置
grep -r "log_file\|LOG_FILE\|/var/log" /home/ubuntu/ --include="*.py" --include="*.conf"
```

**应该改为：**
```python
# ❌ 错误：硬编码日志路径
LOG_FILE = "/home/ubuntu/gfpgan/logs/app.log"

# ✅ 正确：使用临时目录或环境变量
LOG_DIR = os.environ.get("LOG_DIR", "/tmp/logs")
os.makedirs(LOG_DIR, exist_ok=True)
LOG_FILE = os.path.join(LOG_DIR, "app.log")
```

---

#### 6. GPU 设备配置

**检查位置：**
```bash
# 搜索 GPU 设备配置
grep -r "CUDA_VISIBLE_DEVICES\|cuda:0\|/dev/nvidia" /home/ubuntu/ --include="*.py"
```

**应该改为：**
```python
# ❌ 错误：硬编码 GPU 设备
os.environ["CUDA_VISIBLE_DEVICES"] = "0"

# ✅ 正确：动态检测或使用环境变量
CUDA_DEVICE = os.environ.get("CUDA_VISIBLE_DEVICES", "0")
os.environ["CUDA_VISIBLE_DEVICES"] = CUDA_DEVICE

# 或自动检测可用 GPU
import torch
if torch.cuda.is_available():
    device = torch.device("cuda")
else:
    device = torch.device("cpu")
```

---

### ✅ 推荐配置的内容

#### 7. 服务端口配置

**检查位置：**
```bash
# 搜索端口配置
grep -r "port\|PORT\|8000\|5000" /home/ubuntu/ --include="*.py" --include="*.sh"
```

**应该改为：**
```python
# ✅ 推荐：使用环境变量
API_PORT = int(os.environ.get("API_PORT", "8000"))
app.run(host="0.0.0.0", port=API_PORT)
```

---

#### 8. 模型文件路径

**检查位置：**
```bash
# 搜索模型文件路径
find /home/ubuntu -name "*.pth" -o -name "*.onnx" -o -name "*.pb"
grep -r "MODEL_PATH\|model_path\|checkpoint" /home/ubuntu/ --include="*.py"
```

**应该改为：**
```python
# ✅ 推荐：使用环境变量，但提供合理的默认值
MODEL_DIR = os.environ.get("MODEL_DIR", "/home/ubuntu/models")
GFPGAN_MODEL = os.path.join(MODEL_DIR, "GFPGANv1.4.pth")
```

---

### 🗑️ 需要清理的内容

#### 9. 临时文件和缓存

```bash
# 清理临时文件
rm -rf /tmp/*
rm -rf /home/ubuntu/.cache/*
rm -rf /home/ubuntu/gfpgan/uploads/*
rm -rf /home/ubuntu/facefusion/uploads/*

# 清理日志文件
rm -rf /home/ubuntu/gfpgan/logs/*
rm -rf /home/ubuntu/facefusion/logs/*
rm -rf /var/log/gfpgan/*
rm -rf /var/log/facefusion/*

# 清理 Python 缓存
find /home/ubuntu -type d -name "__pycache__" -exec rm -rf {} +
find /home/ubuntu -type f -name "*.pyc" -delete
```

---

#### 10. 用户特定配置

```bash
# 清理 shell 历史
rm -f /home/ubuntu/.bash_history
rm -f /root/.bash_history

# 清理 SSH 密钥（如果有）
rm -f /home/ubuntu/.ssh/id_rsa*
rm -f /root/.ssh/id_rsa*

# 清理用户特定配置
rm -f /home/ubuntu/.vimrc.local
rm -f /home/ubuntu/.gitconfig.local
```

---

#### 11. 数据库文件

```bash
# 清理或重置数据库
rm -f /home/ubuntu/gfpgan/data/*.db
rm -f /home/ubuntu/facefusion/data/*.db

# 或提供干净的初始数据库
cp /home/ubuntu/gfpgan/data/pixels.db.template /home/ubuntu/gfpgan/data/pixels.db
```

---

### 🔧 systemd 服务配置

#### 12. 确保服务自动启动

**检查位置：**
```bash
# 查看已启用的服务
systemctl list-unit-files | grep enabled | grep -E "gfpgan|facefusion"
```

**应该包含：**
```bash
# GFPGAN API 服务
sudo systemctl enable gfpgan-api.service

# FaceFusion API 服务
sudo systemctl enable facefusion-api.service
```

**服务配置文件示例：**
```ini
# /etc/systemd/system/gfpgan-api.service
[Unit]
Description=GFPGAN API Service
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/gfpgan
Environment="PATH=/home/ubuntu/gfpgan/venv/bin:/usr/local/bin:/usr/bin:/bin"
Environment="PYTHONPATH=/home/ubuntu/gfpgan"
# ✅ 使用环境变量
EnvironmentFile=/etc/default/gfpgan
ExecStart=/home/ubuntu/gfpgan/venv/bin/python app.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**环境变量文件：**
```bash
# /etc/default/gfpgan
API_PORT=8000
LOG_DIR=/tmp/logs
UPLOAD_FOLDER=/tmp/uploads
DB_PATH=/tmp/pixels.db
CUDA_VISIBLE_DEVICES=0
# COS 配置（启动时注入）
COS_SECRET_ID=${COS_SECRET_ID}
COS_SECRET_KEY=${COS_SECRET_KEY}
```

---

### 🌐 Nginx 配置

#### 13. 反向代理配置

**检查位置：**
```bash
# 查看 Nginx 配置
cat /etc/nginx/sites-enabled/*
```

**应该使用：**
```nginx
# /etc/nginx/sites-available/api.conf
upstream gfpgan_backend {
    # ❌ 错误：硬编码 IP
    # server 81.70.41.132:8000;
    
    # ✅ 正确：使用本地回环
    server 127.0.0.1:8000;
}

upstream facefusion_backend {
    server 127.0.0.1:8001;
}

server {
    listen 80;
    server_name _;  # 接受任何域名
    
    location /api/v1/gfpgan {
        proxy_pass http://gfpgan_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /api/v1/facefusion {
        proxy_pass http://facefusion_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 🚀 镜像制作步骤

### 步骤 1：准备工作

```bash
# SSH 登录到 81.70.41.132
ssh ubuntu@81.70.41.132

# 切换到 root
sudo su -
```

---

### 步骤 2：修改配置文件

```bash
# 1. 修改 Python 代码，移除硬编码配置
# 参考上面的示例修改

# 2. 创建环境变量配置文件
cat > /etc/default/gfpgan << 'EOF'
API_PORT=8000
LOG_DIR=/tmp/logs
UPLOAD_FOLDER=/tmp/uploads
DB_PATH=/tmp/pixels.db
CUDA_VISIBLE_DEVICES=0
EOF

cat > /etc/default/facefusion << 'EOF'
API_PORT=8001
LOG_DIR=/tmp/logs
UPLOAD_FOLDER=/tmp/uploads
CUDA_VISIBLE_DEVICES=0
EOF

# 3. 更新 systemd 服务配置
# 添加 EnvironmentFile=/etc/default/gfpgan
systemctl daemon-reload
```

---

### 步骤 3：清理临时文件

```bash
# 执行清理脚本
cat > /tmp/cleanup.sh << 'EOF'
#!/bin/bash
set -e

echo "开始清理临时文件..."

# 清理临时文件
rm -rf /tmp/*
rm -rf /home/ubuntu/.cache/*
rm -rf /home/ubuntu/gfpgan/uploads/*
rm -rf /home/ubuntu/facefusion/uploads/*

# 清理日志
rm -rf /home/ubuntu/gfpgan/logs/*
rm -rf /home/ubuntu/facefusion/logs/*
rm -rf /var/log/gfpgan/*
rm -rf /var/log/facefusion/*

# 清理 Python 缓存
find /home/ubuntu -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
find /home/ubuntu -type f -name "*.pyc" -delete 2>/dev/null || true

# 清理历史记录
rm -f /home/ubuntu/.bash_history
rm -f /root/.bash_history
history -c

# 清理数据库（可选，根据需要）
# rm -f /home/ubuntu/gfpgan/data/*.db

echo "清理完成！"
EOF

chmod +x /tmp/cleanup.sh
/tmp/cleanup.sh
```

---

### 步骤 4：验证服务自动启动

```bash
# 检查服务状态
systemctl is-enabled gfpgan-api
systemctl is-enabled facefusion-api

# 如果未启用，执行：
systemctl enable gfpgan-api
systemctl enable facefusion-api

# 测试服务重启
systemctl restart gfpgan-api
systemctl restart facefusion-api

# 检查服务状态
systemctl status gfpgan-api
systemctl status facefusion-api
```

---

### 步骤 5：停止服务并制作镜像

```bash
# 停止所有服务
systemctl stop gfpgan-api
systemctl stop facefusion-api
systemctl stop nginx

# 关机
shutdown -h now
```

---

### 步骤 6：在云平台制作镜像

#### 腾讯云
```bash
# 1. 登录腾讯云控制台
# 2. 云服务器 → 实例 → 选择 81.70.41.132
# 3. 更多 → 镜像 → 制作镜像
# 4. 镜像名称：gfpgan-facefusion-gpu-v1.0
# 5. 描述：包含 GFPGAN 和 FaceFusion 的 GPU 服务器镜像
# 6. 等待制作完成
```

#### 阿里云
```bash
# 1. 登录阿里云控制台
# 2. 云服务器 ECS → 实例与镜像 → 实例
# 3. 选择实例 → 更多 → 磁盘和镜像 → 创建自定义镜像
# 4. 填写镜像名称和描述
# 5. 等待制作完成
```

---

## 🔄 使用镜像创建新服务器

### 方法 1：手动创建

```bash
# 1. 云平台控制台 → 创建实例
# 2. 选择镜像：自定义镜像 → gfpgan-facefusion-gpu-v1.0
# 3. 选择 GPU 机型（如 V100、T4）
# 4. 设置网络和安全组
# 5. 创建实例
```

---

### 方法 2：自动化脚本（推荐）

```bash
# 使用腾讯云 CLI 创建实例
tccli cvm RunInstances \
  --InstanceChargeType POSTPAID_BY_HOUR \
  --InstanceType GN7.2XLARGE32 \
  --ImageId img-xxxxxxxx \
  --SystemDisk.DiskType CLOUD_SSD \
  --SystemDisk.DiskSize 100 \
  --InternetAccessible.InternetMaxBandwidthOut 100 \
  --InstanceCount 1 \
  --InstanceName "gfpgan-auto-$(date +%s)" \
  --SecurityGroupIds '["sg-xxxxxxxx"]' \
  --VirtualPrivateCloud.SubnetId subnet-xxxxxxxx
```

---

### 方法 3：自动扩缩容（Auto Scaling）

```bash
# 1. 创建启动配置
tccli as CreateLaunchConfiguration \
  --LaunchConfigurationName "gfpgan-launch-config" \
  --ImageId img-xxxxxxxx \
  --InstanceType GN7.2XLARGE32

# 2. 创建伸缩组
tccli as CreateAutoScalingGroup \
  --AutoScalingGroupName "gfpgan-scaling-group" \
  --LaunchConfigurationId lc-xxxxxxxx \
  --MinSize 1 \
  --MaxSize 10 \
  --DesiredCapacity 2

# 3. 创建伸缩策略（基于 CPU 使用率）
tccli as CreateScalingPolicy \
  --AutoScalingGroupId asg-xxxxxxxx \
  --ScalingPolicyName "scale-on-cpu" \
  --AdjustmentType CHANGE_IN_CAPACITY \
  --AdjustmentValue 1 \
  --MetricAlarm.MetricName CPU_UTILIZATION \
  --MetricAlarm.ComparisonOperator GREATER_THAN \
  --MetricAlarm.Threshold 80
```

---

## 📝 新服务器启动后的配置

### 首次启动脚本

```bash
# /usr/local/bin/first-boot.sh
#!/bin/bash
set -e

echo "首次启动配置..."

# 1. 设置主机名
INSTANCE_ID=$(curl -s http://metadata.tencentyun.com/latest/meta-data/instance-id)
hostnamectl set-hostname "gfpgan-${INSTANCE_ID}"

# 2. 注入 COS 配置（从用户数据或云参数）
if [ -n "$COS_SECRET_ID" ]; then
    sed -i "s/\${COS_SECRET_ID}/$COS_SECRET_ID/g" /etc/default/gfpgan
    sed -i "s/\${COS_SECRET_KEY}/$COS_SECRET_KEY/g" /etc/default/gfpgan
fi

# 3. 创建必要的目录
mkdir -p /tmp/logs
mkdir -p /tmp/uploads
chmod 777 /tmp/uploads

# 4. 启动服务
systemctl start gfpgan-api
systemctl start facefusion-api
systemctl start nginx

# 5. 注册到负载均衡器（可选）
# curl -X POST http://api-gateway/register -d '{"ip":"'$(curl -s ifconfig.me)'","port":80}'

echo "首次启动配置完成！"

# 禁用此脚本，避免重复执行
systemctl disable first-boot.service
```

**配置 systemd 服务：**
```ini
# /etc/systemd/system/first-boot.service
[Unit]
Description=First Boot Configuration
After=network-online.target
Wants=network-online.target

[Service]
Type=oneshot
ExecStart=/usr/local/bin/first-boot.sh
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
```

```bash
# 启用首次启动服务
systemctl enable first-boot.service
```

---

## 🎯 验证清单

### 镜像制作后验证

- [ ] 所有硬编码的 IP 地址已移除
- [ ] 数据库路径使用环境变量
- [ ] 文件上传路径使用临时目录
- [ ] COS 配置使用环境变量
- [ ] 日志路径使用临时目录或环境变量
- [ ] GPU 设备配置动态检测
- [ ] 服务端口使用环境变量
- [ ] 临时文件已清理
- [ ] 日志文件已清理
- [ ] Shell 历史已清理
- [ ] systemd 服务已启用
- [ ] Nginx 配置使用 127.0.0.1

### 新服务器启动后验证

- [ ] GFPGAN API 可访问（http://新IP:8000/health）
- [ ] FaceFusion API 可访问（http://新IP:8001/health）
- [ ] Nginx 反向代理正常
- [ ] GPU 识别正常（nvidia-smi）
- [ ] 模型加载正常
- [ ] 图片处理正常
- [ ] COS 上传正常
- [ ] 日志正常写入

---

## 🔍 故障排查

### 常见问题

#### 1. 服务无法启动
```bash
# 查看服务日志
journalctl -u gfpgan-api -n 50
journalctl -u facefusion-api -n 50

# 检查环境变量
systemctl show gfpgan-api | grep Environment
```

#### 2. GPU 无法识别
```bash
# 检查 NVIDIA 驱动
nvidia-smi

# 检查 CUDA
nvcc --version

# 重新安装驱动（如果需要）
# 注意：镜像应该已包含驱动
```

#### 3. COS 上传失败
```bash
# 检查 COS 配置
cat /etc/default/gfpgan | grep COS

# 测试 COS 连接
curl -X GET https://photoenhancei-bj-1259206939.cos.ap-beijing.myqcloud.com/
```

---

## 📚 参考资料

- 腾讯云镜像制作文档：https://cloud.tencent.com/document/product/213/4942
- 阿里云镜像制作文档：https://help.aliyun.com/document_detail/35109.html
- systemd 服务配置：https://www.freedesktop.org/software/systemd/man/systemd.service.html
- Nginx 配置最佳实践：https://www.nginx.com/resources/wiki/start/

---

**制作时间：** 2025-11-01  
**版本：** v1.0  
**维护者：** GPU 服务器运维团队

