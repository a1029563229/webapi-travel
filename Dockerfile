# 基础镜像
FROM node:14.20-alpine

# 设置工作目录
WORKDIR /usr/src/app
# 复制本地文件到工作目录
COPY . .
# 安装依赖
RUN npm install
# 构建应用
RUN npm run build
# 暴露应用的运行端口
EXPOSE 10100

# 运行命令
CMD [ "npm", "run", "start:prod" ]