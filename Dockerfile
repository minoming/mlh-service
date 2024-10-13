# node
FROM node:alpine3.19

MAINTAINER Minomi Kim <minomi.kim@miracom-inc.com>

# install chromium
RUN apk update
RUN apk add chromium

# setting env
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium

# working directory
WORKDIR /usr/src/app

# copy files to working directory in container
COPY ./ ./

# npm install
RUN npm install

# run
CMD ["node", "app.js"]

