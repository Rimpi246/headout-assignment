FROM node:16-alpine AS build
COPY package*.json ./
RUN npm install
COPY . .

# Create data files with random text content for development purposes
# COPY generate-files.js /tmp/generate-files.js
# RUN node /tmp/generate-files.js
# Create data files with random text content for development purposes
RUN mkdir -p /tmp/data
RUN for i in $(seq 1 30); do \
    openssl rand -base64 65536 > "/tmp/data/$i.txt"; \
    done
EXPOSE 8080
CMD ["node", "app.js"]