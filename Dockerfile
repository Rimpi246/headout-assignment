FROM node:16-alpine

RUN mkdir -p /tmp/data && \
    for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32; do \
    head -c $((100 * 1024 * 1024)) /dev/urandom | base64 > "/tmp/data/$i.txt"; \
    done

COPY package*.json ./
COPY . .

EXPOSE 8080

CMD ["npm", "start"]

