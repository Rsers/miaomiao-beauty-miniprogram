# GPU 服务器镜像制作 - 极简版

**原则：能用就好！**  
**目标：新服务器创建后自动启动服务**

---

## 🚀 2 步完成（5 分钟）

### 步骤 1：确保服务自动启动

```bash
# SSH 登录到 81.70.41.132
ssh ubuntu@81.70.41.132

# 检查并启用服务（只需运行一次）
sudo systemctl enable gfpgan-api
sudo systemctl enable facefusion-api  
sudo systemctl enable nginx

# 验证是否启用成功
systemctl is-enabled gfpgan-api facefusion-api nginx
```

**预期输出：**
```
enabled
enabled
enabled
```

✅ 如果都显示 `enabled`，说明配置完成！

---

### 步骤 2：制作镜像

```bash
# 停止服务（可选，不停也行）
sudo systemctl stop gfpgan-api facefusion-api nginx

# 关机
sudo shutdown -h now
```

然后在**腾讯云控制台**：
1. 云服务器 → 实例 → 选择 81.70.41.132
2. 更多 → 镜像 → 制作镜像
3. 镜像名称：`gpu-server-auto-v1`
4. 等待完成（10-15 分钟）

---

## ✅ 完成！

使用这个镜像创建新服务器后：
- ✅ GFPGAN API 自动启动（端口 8000）
- ✅ FaceFusion API 自动启动（端口 8001）
- ✅ Nginx 自动启动（端口 80）

**无需任何手动配置！**

---

## 🔧 验证新服务器（可选）

```bash
# SSH 登录到新服务器
ssh ubuntu@新服务器IP

# 查看服务状态
systemctl status gfpgan-api facefusion-api nginx

# 测试 API（可选）
curl http://localhost:8000/health
curl http://localhost:8001/health
```

---

## 📝 注意事项

### 不需要做的事情（简化）

❌ 不需要修改硬编码的 IP（内网使用，无所谓）  
❌ 不需要清理缓存和日志（不影响功能）  
❌ 不需要修改密钥配置（能用就行）  
❌ 不需要清理临时文件（占用空间不大）  
❌ 不需要修改数据库路径（默认就能用）  

### 唯一重要的事情

✅ **确保 systemd 服务已启用（开机自动启动）**

---

## 🎉 就这么简单！

**原则：** 能用就好，不追求完美  
**目标：** 新服务器启动后服务自动运行  
**时间：** 5 分钟完成  

---

## 🔍 如果新服务器服务没启动

可能原因：忘记执行 `systemctl enable`

**解决方法：**
```bash
# 手动启动服务
sudo systemctl start gfpgan-api facefusion-api nginx

# 或重启服务器
sudo reboot
```

---

**制作时间：** 2025-11-01  
**版本：** 极简版 v1.0  
**适用场景：** 快速部署，不在意细节

