FROM node:12.18-alpine
ENV NODE_ENV=production

# URL for https connections
ENV URL_NAME=<your_url>

# Simple password, not safe! Change as you like your API access policy
ENV PSW_API=<your_api_psw>

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
COPY uhubctl/ uhubctl/
RUN apk add build-base libusb-dev
RUN cd uhubctl && make clean && make
EXPOSE 443
CMD ["node", "app.js"]
