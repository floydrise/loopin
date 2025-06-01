FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock ./
RUN ["bun" ,"install"]

COPY server/ ./server/
COPY auth.ts drizzle.config.ts tsconfig.json ./
COPY view/dist ./view/dist

EXPOSE 3000

CMD ["bun", "server/index.ts"]