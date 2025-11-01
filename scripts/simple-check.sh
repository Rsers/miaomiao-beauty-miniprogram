#!/bin/bash
# GPU 服务器镜像制作 - 极简检查脚本
# 只检查服务是否启用

echo "=========================================="
echo "GPU 服务器镜像制作检查（极简版）"
echo "=========================================="
echo ""

# 颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

ALL_OK=true

echo "📋 检查服务是否启用（开机自动启动）"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 检查 GFPGAN
if systemctl is-enabled gfpgan-api 2>/dev/null | grep -q "enabled"; then
    echo -e "${GREEN}✓${NC} GFPGAN API：已启用"
else
    echo -e "${RED}✗${NC} GFPGAN API：未启用"
    echo "  修复命令：sudo systemctl enable gfpgan-api"
    ALL_OK=false
fi

# 检查 FaceFusion
if systemctl is-enabled facefusion-api 2>/dev/null | grep -q "enabled"; then
    echo -e "${GREEN}✓${NC} FaceFusion API：已启用"
else
    echo -e "${RED}✗${NC} FaceFusion API：未启用"
    echo "  修复命令：sudo systemctl enable facefusion-api"
    ALL_OK=false
fi

# 检查 Nginx
if systemctl is-enabled nginx 2>/dev/null | grep -q "enabled"; then
    echo -e "${GREEN}✓${NC} Nginx：已启用"
else
    echo -e "${YELLOW}⚠${NC} Nginx：未启用（可选）"
    echo "  修复命令：sudo systemctl enable nginx"
fi

echo ""
echo "=========================================="

if [ "$ALL_OK" = true ]; then
    echo -e "${GREEN}✓ 服务器已准备好制作镜像！${NC}"
    echo ""
    echo "下一步："
    echo "1. 关机：sudo shutdown -h now"
    echo "2. 在云平台控制台制作镜像"
    exit 0
else
    echo -e "${RED}✗ 有服务未启用，请先修复${NC}"
    echo ""
    echo "快速修复（一键执行）："
    echo "sudo systemctl enable gfpgan-api facefusion-api nginx"
    exit 1
fi

