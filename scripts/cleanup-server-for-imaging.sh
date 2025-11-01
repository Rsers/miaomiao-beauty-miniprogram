#!/bin/bash
# GPU 服务器镜像制作前的自动清理脚本
# 用法：bash cleanup-server-for-imaging.sh

set -e

echo "============================================"
echo "GPU 服务器镜像制作清理脚本"
echo "服务器: 81.70.41.132"
echo "清理时间: $(date)"
echo "============================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 确认清理
echo -e "${YELLOW}⚠ 警告：此脚本将清理以下内容：${NC}"
echo "  - 临时文件 (/tmp/*)"
echo "  - 缓存文件 (~/.cache/*)"
echo "  - 上传文件 (*/uploads/*)"
echo "  - 日志文件 (*/logs/*)"
echo "  - Python 缓存 (__pycache__, *.pyc)"
echo "  - Shell 历史 (.bash_history)"
echo ""
read -p "确认继续清理？(y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "取消清理"
    exit 1
fi

echo ""
echo "🧹 开始清理..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. 清理临时文件
echo -e "\n${GREEN}► 清理临时文件${NC}"
TEMP_COUNT=$(find /tmp -type f 2>/dev/null | wc -l)
echo "  发现 $TEMP_COUNT 个临时文件"
rm -rf /tmp/* 2>/dev/null || true
echo "  ✓ /tmp/ 已清理"

# 2. 清理缓存文件
echo -e "\n${GREEN}► 清理缓存文件${NC}"
rm -rf /home/ubuntu/.cache/* 2>/dev/null || true
echo "  ✓ ~/.cache/ 已清理"
rm -rf /root/.cache/* 2>/dev/null || true
echo "  ✓ /root/.cache/ 已清理"

# 3. 清理上传文件
echo -e "\n${GREEN}► 清理上传文件${NC}"
find /home/ubuntu -type d -name "uploads" 2>/dev/null | while read dir; do
    UPLOAD_COUNT=$(find "$dir" -type f 2>/dev/null | wc -l)
    if [ "$UPLOAD_COUNT" -gt 0 ]; then
        echo "  发现 $UPLOAD_COUNT 个上传文件: $dir"
        rm -rf "$dir"/* 2>/dev/null || true
        echo "  ✓ $dir 已清理"
    fi
done

# 4. 清理日志文件
echo -e "\n${GREEN}► 清理日志文件${NC}"
find /home/ubuntu -type d -name "logs" 2>/dev/null | while read dir; do
    LOG_SIZE=$(du -sh "$dir" 2>/dev/null | awk '{print $1}')
    if [ -n "$LOG_SIZE" ]; then
        echo "  发现日志: $dir ($LOG_SIZE)"
        rm -rf "$dir"/* 2>/dev/null || true
        echo "  ✓ $dir 已清理"
    fi
done

# 5. 清理 Python 缓存
echo -e "\n${GREEN}► 清理 Python 缓存${NC}"
PYCACHE_COUNT=$(find /home/ubuntu -type d -name "__pycache__" 2>/dev/null | wc -l)
echo "  发现 $PYCACHE_COUNT 个 __pycache__ 目录"
find /home/ubuntu -type d -name "__pycache__" -exec rm -rf {} + 2>/dev/null || true
echo "  ✓ __pycache__ 已清理"

PYC_COUNT=$(find /home/ubuntu -type f -name "*.pyc" 2>/dev/null | wc -l)
echo "  发现 $PYC_COUNT 个 .pyc 文件"
find /home/ubuntu -type f -name "*.pyc" -delete 2>/dev/null || true
echo "  ✓ .pyc 文件已清理"

# 6. 清理 Shell 历史
echo -e "\n${GREEN}► 清理 Shell 历史${NC}"
if [ -f /home/ubuntu/.bash_history ]; then
    rm -f /home/ubuntu/.bash_history
    echo "  ✓ /home/ubuntu/.bash_history 已清理"
fi
if [ -f /root/.bash_history ]; then
    rm -f /root/.bash_history
    echo "  ✓ /root/.bash_history 已清理"
fi
history -c
echo "  ✓ 当前会话历史已清理"

# 7. 清理 SSH 已知主机（可选）
echo -e "\n${GREEN}► 清理 SSH 配置（可选）${NC}"
read -p "是否清理 SSH 已知主机？(y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    rm -f /home/ubuntu/.ssh/known_hosts 2>/dev/null || true
    rm -f /root/.ssh/known_hosts 2>/dev/null || true
    echo "  ✓ SSH 已知主机已清理"
else
    echo "  - 跳过 SSH 已知主机清理"
fi

# 8. 清理数据库（可选）
echo -e "\n${GREEN}► 清理数据库（可选）${NC}"
find /home/ubuntu -name "*.db" 2>/dev/null | while read db; do
    echo "  发现数据库: $db"
done
read -p "是否清理数据库文件？(y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    find /home/ubuntu -name "*.db" -delete 2>/dev/null || true
    echo "  ✓ 数据库文件已清理"
else
    echo "  - 跳过数据库清理"
fi

# 9. 清理 apt 缓存
echo -e "\n${GREEN}► 清理 apt 缓存${NC}"
if command -v apt-get &>/dev/null; then
    apt-get clean 2>/dev/null || true
    echo "  ✓ apt 缓存已清理"
fi

# 10. 清理 journal 日志
echo -e "\n${GREEN}► 清理 journal 日志${NC}"
if command -v journalctl &>/dev/null; then
    journalctl --vacuum-time=1d 2>/dev/null || true
    echo "  ✓ journal 日志已清理（保留最近1天）"
fi

echo ""
echo "============================================"
echo "清理完成！"
echo "============================================"
echo ""

# 显示清理后的磁盘使用情况
echo "磁盘使用情况："
df -h / | tail -1
echo ""

# 显示主要目录大小
echo "主要目录大小："
du -sh /home/ubuntu/* 2>/dev/null | sort -hr | head -10
echo ""

echo -e "${GREEN}✓ 服务器已准备好制作镜像！${NC}"
echo ""
echo "下一步："
echo "1. 停止所有服务: systemctl stop gfpgan-api facefusion-api nginx"
echo "2. 关机: shutdown -h now"
echo "3. 在云平台控制台制作镜像"

