# 使用Node.js 20.18官方镜像作为基础镜像
FROM node:20.18-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装所有依赖（包括devDependencies用于构建）
RUN npm ci

# 复制源代码
COPY . .

# 构建项目
RUN npm run build

# 安装serve来提供静态文件服务
RUN npm install -g serve

# 暴露端口3000
EXPOSE 3000

# 设置启动命令
CMD ["serve", "-s", "dist", "-l", "3000"]