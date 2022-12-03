# Builder
FROM node:14.15.1 As builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# Final
FROM nginx:alpine

COPY --from=builder /app/.nuxt/dist/ /usr/share/nginx/html
