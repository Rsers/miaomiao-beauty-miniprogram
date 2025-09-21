#!/bin/bash

# 快速更新后端IP地址脚本
# 使用方法: ./quick_update.sh <新的IP地址>
# 例如: ./quick_update.sh 192.168.1.100

set -e

# 检查参数
if [ $# -ne 1 ]; then
    echo "使用方法: $0 <新的IP地址>"
    echo "例如: $0 192.168.1.100"
    exit 1
fi

NEW_IP=$1
CONFIG_FILE="config.json"

# 验证IP地址格式
if ! [[ $NEW_IP =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]]; then
    echo "❌ 无效的IP地址格式: $NEW_IP"
    exit 1
fi

echo "🔄 正在更新后端IP地址为: $NEW_IP"

# 检查配置文件是否存在
if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ 配置文件不存在: $CONFIG_FILE"
    exit 1
fi

# 备份配置文件
cp "$CONFIG_FILE" "${CONFIG_FILE}.backup.$(date +%Y%m%d_%H%M%S)"
echo "✅ 配置文件已备份"

# 更新配置文件
python3 -c "
import json
import sys

# 加载配置
with open('$CONFIG_FILE', 'r', encoding='utf-8') as f:
    config = json.load(f)

# 显示当前IP
old_ip = config['backend']['host']
print(f'📋 当前后端IP: {old_ip}')
print(f'📋 新后端IP: $NEW_IP')

if old_ip == '$NEW_IP':
    print('ℹ️  IP地址未变化，无需更新')
    sys.exit(0)

# 更新IP
config['backend']['host'] = '$NEW_IP'

# 保存配置
with open('$CONFIG_FILE', 'w', encoding='utf-8') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)

print('✅ 配置文件更新成功')
"

# 测试新IP连接
echo "🔍 测试新IP连接: $NEW_IP:8000"
if timeout 5 bash -c "</dev/tcp/$NEW_IP/8000" 2>/dev/null; then
    echo "✅ 新IP连接测试成功"
else
    echo "⚠️  新IP连接测试失败，但继续更新"
fi

# 重启API网关服务
echo "🔄 重启API网关服务..."

# 检查是否有PM2进程
if command -v pm2 >/dev/null 2>&1; then
    if pm2 list | grep -q "api-gateway"; then
        echo "🔄 重启PM2 API网关服务..."
        pm2 restart api-gateway
        echo "✅ API网关服务已重启"
    else
        echo "⚠️  未找到PM2 API网关服务"
    fi
else
    echo "⚠️  PM2未安装，请手动重启API网关服务"
fi

# 等待服务启动
echo "⏳ 等待服务启动..."
sleep 3

# 测试API网关
echo "🔍 测试API网关..."
if curl -s -f "https://www.gongjuxiang.work/api/v1/health" >/dev/null; then
    echo "✅ API网关测试成功"
    
    # 显示后端状态
    BACKEND_STATUS=$(curl -s "https://www.gongjuxiang.work/api/v1/health" | python3 -c "
import json, sys
try:
    data = json.load(sys.stdin)
    print(data.get('backend_status', 'unknown'))
except:
    print('unknown')
")
    echo "📊 后端状态: $BACKEND_STATUS"
else
    echo "⚠️  API网关测试失败"
fi

echo ""
echo "🎉 后端IP地址更新完成！"
echo "📋 新配置: $NEW_IP:8000"
echo "🌐 API地址: https://www.gongjuxiang.work/api/v1/"
echo ""
echo "💡 提示:"
echo "   - 配置文件: $CONFIG_FILE"
echo "   - 备份文件: ${CONFIG_FILE}.backup.*"
echo "   - 如需回滚: cp ${CONFIG_FILE}.backup.* $CONFIG_FILE"
