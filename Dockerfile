FROM node:18-alpine AS builder

WORKDIR /task_backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:18-alpine AS runner

WORKDIR /task_backend

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /task_backend/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]