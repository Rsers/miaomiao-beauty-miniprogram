# GPU 服务器镜像制作 - 快速开始

**目标：** 把 81.70.41.132 制作成标准镜像，用于自动扩缩容

---

## 🚀 快速开始（3 步完成）

### 步骤 1：运行检查脚本

```bash
# SSH 登录到服务器
ssh ubuntu@81.70.41.132

# 下载并运行检查脚本
wget https://raw.githubusercontent.com/你的仓库/scripts/check-server-for-imaging.sh
chmod +x check-server-for-imaging.sh
sudo ./check-server-for-imaging.sh
```

**预期结果：**
```
✓ 服务器已准备好制作镜像！
```

---

### 步骤 2：运行清理脚本

```bash
# 下载并运行清理脚本
wget https://raw.githubusercontent.com/你的仓库/scripts/cleanup-server-for-imaging.sh
chmod +x cleanup-server-for-imaging.sh
sudo ./cleanup-server-for-imaging.sh
```

**清理内容：**
- ✅ 临时文件
- ✅ 日志文件
- ✅ 上传文件
- ✅ Python 缓存
- ✅ Shell 历史

---

### 步骤 3：制作镜像

```bash
# 停止所有服务
sudo systemctl stop gfpgan-api facefusion-api nginx

# 关机
sudo shutdown -h now
```

然后在**腾讯云控制台**：
1. 云服务器 → 实例 → 选择 81.70.41.132
2. 更多 → 镜像 → 制作镜像
3. 镜像名称：`gfpgan-facefusion-gpu-v1.0`
4. 等待制作完成（约 10-15 分钟）

---

## ✅ 验证新服务器

使用镜像创建新服务器后，验证服务是否正常：

```bash
# SSH 登录到新服务器
ssh ubuntu@新服务器IP

# 检查服务状态
systemctl status gfpgan-api
systemctl status facefusion-api
systemctl status nginx

# 检查 GPU
nvidia-smi

# 测试 API
curl http://localhost:8000/health
curl http://localhost:8001/health
```

**预期结果：**
```
✓ GFPGAN API: 正常运行
✓ FaceFusion API: 正常运行
✓ Nginx: 正常运行
✓ GPU: 识别正常
```

---

## 🔧 需要修改的关键配置

### 1. 硬编码 IP 地址

**位置：** Python 代码、Shell 脚本、Nginx 配置

❌ **错误：**
```python
API_HOST = "81.70.41.132"
```

✅ **正确：**
```python
API_HOST = os.environ.get("API_HOST", "0.0.0.0")
```

---

### 2. 数据库路径

**位置：** Python 代码

❌ **错误：**
```python
DB_PATH = "/home/ubuntu/gfpgan/data/pixels.db"
```

✅ **正确：**
```python
DB_PATH = os.environ.get("DB_PATH", "/tmp/pixels.db")
```

---

### 3. COS 密钥

**位置：** Python 代码、配置文件

❌ **错误：**
```python
COS_SECRET_ID = "AKIDxxxxxxx"
COS_SECRET_KEY = "xxxxxxx"
```

✅ **正确：**
```python
COS_SECRET_ID = os.environ.get("COS_SECRET_ID")
COS_SECRET_KEY = os.environ.get("COS_SECRET_KEY")
```

---

### 4. Nginx 配置

**位置：** `/etc/nginx/sites-enabled/*`

❌ **错误：**
```nginx
upstream gfpgan_backend {
    server 81.70.41.132:8000;
}
```

✅ **正确：**
```nginx
upstream gfpgan_backend {
    server 127.0.0.1:8000;
}
```

---

## 📊 自动扩缩容（可选）

### 使用腾讯云 Auto Scaling

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

# 3. 创建伸缩策略（基于 GPU 使用率）
tccli as CreateScalingPolicy \
  --AutoScalingGroupId asg-xxxxxxxx \
  --ScalingPolicyName "scale-on-gpu" \
  --AdjustmentType CHANGE_IN_CAPACITY \
  --AdjustmentValue 1 \
  --MetricAlarm.MetricName GPU_UTILIZATION \
  --MetricAlarm.ComparisonOperator GREATER_THAN \
  --MetricAlarm.Threshold 80
```

---

## 🔍 常见问题

### Q: 检查脚本报错怎么办？

**A:** 根据报错类型处理：
- **硬编码 IP**：搜索并替换为环境变量
- **敏感信息**：移动到环境变量文件
- **服务未启用**：执行 `systemctl enable 服务名`

### Q: 新服务器启动后 API 无法访问？

**A:** 检查：
1. 服务是否启动：`systemctl status gfpgan-api`
2. 端口是否监听：`netstat -tlnp | grep 8000`
3. GPU 是否识别：`nvidia-smi`
4. 日志查看：`journalctl -u gfpgan-api -n 50`

### Q: 如何更新镜像？

**A:**
1. 启动使用旧镜像的服务器
2. 更新代码或配置
3. 运行清理脚本
4. 制作新镜像（版本号 +1）

---

## 📚 详细文档

- **完整指南：** `docs/GPU服务器镜像制作指南.md`
- **检查脚本：** `scripts/check-server-for-imaging.sh`
- **清理脚本：** `scripts/cleanup-server-for-imaging.sh`

---

## 📞 技术支持

如果遇到问题，请检查：
1. 服务器是否满足制作镜像的要求
2. 检查脚本是否运行成功
3. 清理脚本是否执行完整
4. 镜像制作是否成功

---

**制作时间：** 2025-11-01  
**版本：** v1.0  
**适用于：** 81.70.41.132（GFPGAN + FaceFusion）

