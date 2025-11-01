#!/bin/bash
# GPU 服务器镜像制作检查脚本
# 用法：bash check-server-for-imaging.sh

set -e

echo "============================================"
echo "GPU 服务器镜像制作检查脚本"
echo "服务器: 81.70.41.132"
echo "检查时间: $(date)"
echo "============================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查结果统计
TOTAL_CHECKS=0
PASSED_CHECKS=0
FAILED_CHECKS=0
WARNING_CHECKS=0

# 检查函数
check_pass() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    PASSED_CHECKS=$((PASSED_CHECKS + 1))
    echo -e "${GREEN}✓${NC} $1"
}

check_fail() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    FAILED_CHECKS=$((FAILED_CHECKS + 1))
    echo -e "${RED}✗${NC} $1"
}

check_warning() {
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    WARNING_CHECKS=$((WARNING_CHECKS + 1))
    echo -e "${YELLOW}⚠${NC} $1"
}

echo "📋 第1步：检查硬编码配置"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 检查硬编码 IP
if grep -r "81\.70\.41\.132" /home/ubuntu/ --include="*.py" --include="*.sh" --include="*.conf" 2>/dev/null | grep -v ".pyc\|__pycache__"; then
    check_fail "发现硬编码 IP 地址 81.70.41.132"
else
    check_pass "未发现硬编码 IP 地址"
fi

# 检查硬编码数据库路径
if grep -r "DB_PATH.*=.*['\"]/" /home/ubuntu/ --include="*.py" 2>/dev/null | grep -v "environ\|os\.getenv" | grep -v ".pyc\|__pycache__"; then
    check_warning "发现硬编码数据库路径（建议使用环境变量）"
else
    check_pass "数据库路径配置正确"
fi

# 检查硬编码上传目录
if grep -r "UPLOAD_FOLDER.*=.*['\"]/" /home/ubuntu/ --include="*.py" 2>/dev/null | grep -v "environ\|os\.getenv" | grep -v ".pyc\|__pycache__"; then
    check_warning "发现硬编码上传目录（建议使用环境变量）"
else
    check_pass "上传目录配置正确"
fi

echo ""
echo "🔐 第2步：检查敏感信息"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 检查硬编码 COS 密钥
if grep -r "SECRET_ID.*=.*['\"][A-Z0-9]" /home/ubuntu/ --include="*.py" --include="*.conf" 2>/dev/null | grep -v "environ\|os\.getenv" | grep -v ".pyc\|__pycache__"; then
    check_fail "发现硬编码 COS SECRET_ID（必须使用环境变量）"
else
    check_pass "COS SECRET_ID 配置安全"
fi

if grep -r "SECRET_KEY.*=.*['\"][A-Za-z0-9]" /home/ubuntu/ --include="*.py" --include="*.conf" 2>/dev/null | grep -v "environ\|os\.getenv" | grep -v ".pyc\|__pycache__"; then
    check_fail "发现硬编码 COS SECRET_KEY（必须使用环境变量）"
else
    check_pass "COS SECRET_KEY 配置安全"
fi

echo ""
echo "🗑️  第3步：检查需要清理的文件"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 检查临时文件
TEMP_FILES=$(find /tmp -type f 2>/dev/null | wc -l)
if [ "$TEMP_FILES" -gt 100 ]; then
    check_warning "临时文件较多 ($TEMP_FILES 个)，建议清理 /tmp/"
else
    check_pass "临时文件数量合理 ($TEMP_FILES 个)"
fi

# 检查日志文件
LOG_SIZE=$(du -sh /home/ubuntu/*/logs 2>/dev/null | awk '{sum+=$1} END {print sum}')
if [ -n "$LOG_SIZE" ] && [ "$LOG_SIZE" -gt 100 ]; then
    check_warning "日志文件较大，建议清理"
else
    check_pass "日志文件大小合理"
fi

# 检查上传文件
UPLOAD_FILES=$(find /home/ubuntu/*/uploads -type f 2>/dev/null | wc -l)
if [ "$UPLOAD_FILES" -gt 0 ]; then
    check_warning "上传目录有文件 ($UPLOAD_FILES 个)，建议清理"
else
    check_pass "上传目录已清空"
fi

# 检查 Python 缓存
PYCACHE=$(find /home/ubuntu -type d -name "__pycache__" 2>/dev/null | wc -l)
if [ "$PYCACHE" -gt 0 ]; then
    check_warning "发现 Python 缓存 ($PYCACHE 个)，建议清理"
else
    check_pass "无 Python 缓存文件"
fi

# 检查 shell 历史
if [ -f /home/ubuntu/.bash_history ] || [ -f /root/.bash_history ]; then
    check_warning "发现 shell 历史文件，建议清理"
else
    check_pass "shell 历史已清理"
fi

echo ""
echo "🔧 第4步：检查 systemd 服务"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 检查 GFPGAN 服务
if systemctl is-enabled gfpgan-api 2>/dev/null | grep -q "enabled"; then
    check_pass "GFPGAN 服务已启用（开机自动启动）"
else
    check_fail "GFPGAN 服务未启用（需要执行：systemctl enable gfpgan-api）"
fi

# 检查 FaceFusion 服务
if systemctl is-enabled facefusion-api 2>/dev/null | grep -q "enabled"; then
    check_pass "FaceFusion 服务已启用（开机自动启动）"
else
    check_fail "FaceFusion 服务未启用（需要执行：systemctl enable facefusion-api）"
fi

# 检查 Nginx 服务
if systemctl is-enabled nginx 2>/dev/null | grep -q "enabled"; then
    check_pass "Nginx 服务已启用（开机自动启动）"
else
    check_warning "Nginx 服务未启用"
fi

echo ""
echo "🌐 第5步：检查 Nginx 配置"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 检查 Nginx 配置中是否有硬编码 IP
if grep -r "81\.70\.41\.132" /etc/nginx/ 2>/dev/null; then
    check_fail "Nginx 配置中发现硬编码 IP（应使用 127.0.0.1）"
else
    check_pass "Nginx 配置无硬编码 IP"
fi

# 检查是否使用 127.0.0.1
if grep -r "127\.0\.0\.1" /etc/nginx/sites-enabled/ 2>/dev/null | grep -q "proxy_pass\|upstream"; then
    check_pass "Nginx 使用本地回环地址"
else
    check_warning "Nginx 可能未使用本地回环地址"
fi

echo ""
echo "🎮 第6步：检查 GPU 配置"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 检查 NVIDIA 驱动
if nvidia-smi &>/dev/null; then
    check_pass "NVIDIA 驱动正常"
else
    check_fail "NVIDIA 驱动异常（需要重新安装）"
fi

# 检查硬编码 CUDA 设备
if grep -r "CUDA_VISIBLE_DEVICES.*=.*['\"][0-9]" /home/ubuntu/ --include="*.py" 2>/dev/null | grep -v "environ\|os\.getenv" | grep -v ".pyc\|__pycache__"; then
    check_warning "发现硬编码 CUDA 设备（建议使用环境变量）"
else
    check_pass "CUDA 设备配置正确"
fi

echo ""
echo "📦 第7步：检查环境变量配置"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 检查环境变量文件
if [ -f /etc/default/gfpgan ]; then
    check_pass "GFPGAN 环境变量文件存在"
else
    check_warning "GFPGAN 环境变量文件不存在（建议创建）"
fi

if [ -f /etc/default/facefusion ]; then
    check_pass "FaceFusion 环境变量文件存在"
else
    check_warning "FaceFusion 环境变量文件不存在（建议创建）"
fi

echo ""
echo "============================================"
echo "检查结果汇总"
echo "============================================"
echo -e "总检查项: ${TOTAL_CHECKS}"
echo -e "${GREEN}通过: ${PASSED_CHECKS}${NC}"
echo -e "${YELLOW}警告: ${WARNING_CHECKS}${NC}"
echo -e "${RED}失败: ${FAILED_CHECKS}${NC}"
echo ""

if [ $FAILED_CHECKS -eq 0 ] && [ $WARNING_CHECKS -eq 0 ]; then
    echo -e "${GREEN}✓ 服务器已准备好制作镜像！${NC}"
    exit 0
elif [ $FAILED_CHECKS -eq 0 ]; then
    echo -e "${YELLOW}⚠ 服务器基本准备好，但有一些警告项需要注意${NC}"
    exit 0
else
    echo -e "${RED}✗ 服务器尚未准备好，请修复失败的检查项${NC}"
    exit 1
fi

