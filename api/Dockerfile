# 1. Node.js'in hafif sürümünü kullan
FROM node:18-alpine

# 2. Çalışma dizinini belirle
WORKDIR /app

# 3. Bağımlılıkları yükle
COPY package.json package-lock.json ./
RUN npm install

# 4. Tüm dosyaları kopyala
COPY . .

# 5. API portunu aç
EXPOSE 5000

# 6. Uygulamayı başlat
CMD ["node", "server.js"]
