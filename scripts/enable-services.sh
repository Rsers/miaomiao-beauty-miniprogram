#!/bin/bash
# GPU 服务器 - 一键启用所有服务

echo "=========================================="
echo "一键启用服务（开机自动启动）"
echo "=========================================="
echo ""

# 启用 GFPGAN
echo "► 启用 GFPGAN API..."
systemctl enable gfpgan-api
echo "  ✓ 完成"

# 启用 FaceFusion
echo "► 启用 FaceFusion API..."
systemctl enable facefusion-api
echo "  ✓ 完成"

# 启用 Nginx
echo "► 启用 Nginx..."
systemctl enable nginx
echo "  ✓ 完成"

echo ""
echo "=========================================="
echo "✓ 所有服务已启用！"
echo "=========================================="
echo ""

# 验证
echo "验证结果："
systemctl is-enabled gfpgan-api facefusion-api nginx
echo ""

echo "下一步："
echo "1. 关机：shutdown -h now"
echo "2. 在云平台控制台制作镜像"

