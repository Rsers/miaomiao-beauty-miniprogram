# 动态配置API网关使用说明

## 📋 概述

为了解决后端IP地址随时变化的问题，我们创建了一个支持动态配置的API网关系统。

## 🗂️ 文件结构

```
miaomiaomeiyan/
├── config.json                 # 配置文件
├── update_backend.py          # Python更新脚本
├── quick_update.sh            # 快速更新脚本
├── api_gateway_dynamic.py     # 动态配置API网关
└── README_动态配置.md         # 使用说明
```

## ⚙️ 配置文件 (config.json)

```json
{
  "backend": {
    "host": "43.143.246.112",    # 后端IP地址
    "port": 8000,                # 后端端口
    "protocol": "http",           # 协议
    "timeout": 30,               # 超时时间(秒)
    "retry_count": 3             # 重试次数
  },
  "gateway": {
    "host": "0.0.0.0",          # 网关监听地址
    "port": 5000,               # 网关端口
    "debug": false               # 调试模式
  }
}
```

## 🚀 使用方法

### 方法1: 使用快速更新脚本 (推荐)

```bash
# 更新IP地址
./quick_update.sh 192.168.1.100

# 脚本会自动：
# 1. 验证IP地址格式
# 2. 备份配置文件
# 3. 更新配置文件
# 4. 测试新IP连接
# 5. 重启API网关服务
# 6. 测试API功能
```

### 方法2: 使用Python脚本

```bash
# 更新IP地址
python3 update_backend.py 192.168.1.100

# 脚本功能：
# 1. 验证IP地址格式
# 2. 测试新IP连接
# 3. 更新配置文件
# 4. 重启API网关服务
# 5. 测试API功能
```

### 方法3: 手动编辑配置文件

```bash
# 1. 编辑配置文件
nano config.json

# 2. 修改backend.host字段
{
  "backend": {
    "host": "新的IP地址",
    ...
  }
}

# 3. 重启API网关服务
pm2 restart api-gateway
```

### 方法4: 使用API接口更新

```bash
# 通过API更新配置
curl -X POST https://www.gongjuxiang.work/api/v1/config \
  -H "Content-Type: application/json" \
  -d '{
    "backend": {
      "host": "192.168.1.100",
      "port": 8000
    }
  }'
```

## 🔧 部署动态API网关

### 1. 停止旧服务

```bash
pm2 stop api-gateway
pm2 delete api-gateway
```

### 2. 启动新服务

```bash
# 使用动态配置API网关
pm2 start api_gateway_dynamic.py --name api-gateway --interpreter python3
pm2 save
pm2 startup
```

### 3. 验证服务

```bash
# 检查服务状态
pm2 status

# 测试API
curl https://www.gongjuxiang.work/api/v1/health
curl https://www.gongjuxiang.work/api/v1/info
```

## 📊 监控和调试

### 查看配置

```bash
# 查看当前配置
curl https://www.gongjuxiang.work/api/v1/config

# 查看API信息
curl https://www.gongjuxiang.work/api/v1/info

# 健康检查
curl https://www.gongjuxiang.work/api/v1/health
```

### 查看日志

```bash
# 查看PM2日志
pm2 logs api-gateway

# 实时查看日志
pm2 logs api-gateway --lines 100 -f
```

## 🔄 配置更新流程

1. **备份配置**: 自动备份到 `config.json.backup.时间戳`
2. **验证IP**: 检查IP地址格式和连接性
3. **更新配置**: 修改配置文件
4. **重启服务**: 自动重启API网关
5. **测试功能**: 验证API功能正常

## 🛠️ 故障排除

### 常见问题

1. **IP地址格式错误**
   ```
   ❌ 无效的IP地址格式: 192.168.1
   ```
   解决：使用正确的IP地址格式，如 `192.168.1.100`

2. **后端连接失败**
   ```
   ⚠️ 新IP连接测试失败
   ```
   解决：检查后端服务是否运行在指定端口

3. **API网关重启失败**
   ```
   ❌ 重启API网关失败
   ```
   解决：手动重启 `pm2 restart api-gateway`

### 回滚配置

```bash
# 查看备份文件
ls config.json.backup.*

# 回滚到之前的配置
cp config.json.backup.20240921_134500 config.json

# 重启服务
pm2 restart api-gateway
```

## 📈 优势

- ✅ **无需重启**: 动态加载配置
- ✅ **自动备份**: 防止配置丢失
- ✅ **连接测试**: 验证新IP可用性
- ✅ **一键更新**: 简化操作流程
- ✅ **API接口**: 支持远程配置更新
- ✅ **日志记录**: 完整的操作日志

## 🔐 安全建议

1. **限制API访问**: 在生产环境中限制 `/api/v1/config` 接口的访问
2. **定期备份**: 定期备份配置文件
3. **监控日志**: 监控配置更新日志
4. **IP白名单**: 限制可更新的IP地址范围

## 📞 技术支持

如果遇到问题，请检查：
1. 配置文件格式是否正确
2. 后端服务是否正常运行
3. API网关服务状态
4. 网络连接是否正常
