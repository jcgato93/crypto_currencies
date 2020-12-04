FROM node:10-alpine
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["node", "build/app.js"]