#!/bin/bash

set -e  # 出错即退出
echo "🚀 Starting full build and deploy..."

# 1. 构建子页面 Jekyll
echo "🔧 Building Jekyll subpage..."
cd ../github-pages/R3AG-SIGIR-AP.github.io  # 根据你的目录结构调整
bundle install
bundle exec jekyll build --destination ../../public/sigir-ap-workshop-2nd

# 2. 回到主项目目录
cd ..

# 3. 构建主站点
# echo "🛠️ Building main site..."
# pnpm run build-only

# 4. 部署
echo "🌐 Deploying to GitHub Pages..."
pnpm run deploy

echo "✅ Deployment complete!"