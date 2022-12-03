FROM node:14.15.1

WORKDIR /app

COPY . .

RUN npm install
# RUN npm install -g nodemon

EXPOSE 53372

#CMD ["./node_modules/.bin/pm2", "start", "startup.json", "--name", "API", "--no-daemon"]
CMD ["node", "app.js"]