FROM node:18

USER root

RUN apt-get update && apt-get install -y \
    libnspr4 \
    libnss3 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libgdk-pixbuf2.0-0 \
    libnspr4-dev \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpangocairo-1.0-0 \
    libpango-1.0-0 \
    libssl-dev \
    fonts-liberation \
    libappindicator3-1 \
    libxss1 \
    lsb-release \
    wget \
    gosu \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY . .

COPY package.json ./

RUN npm install

ENV PORT 3001

#ENTRYPOINT ["/entrypoint.sh"]

CMD ["npm", "run", "watch:dev"]