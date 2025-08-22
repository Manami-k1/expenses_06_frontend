# Dockerfile（frontend）
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# panda codegen はここでは実行しない（ローカルで済ませる）
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
