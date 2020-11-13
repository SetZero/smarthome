# base image
FROM node:15.1-alpine

# set working directory
WORKDIR /my-app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /my-app/node_modules/.bin:$PATH

# install and cache app dependencies
RUN yarn global add serve@11.3.2
RUN yarn global add react-scripts@4.0.0

COPY ./start.sh /opt/start.sh
RUN chmod +x /opt/start.sh

COPY ./package.json ./package.json
RUN yarn install
COPY ./  ./
RUN npm run build