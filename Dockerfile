FROM node:16
ENV PORT=3000
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .

EXPOSE 3000
CMD [ "node", "app.js" ]