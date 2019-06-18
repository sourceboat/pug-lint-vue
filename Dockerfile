FROM node:10

WORKDIR /app

# Install dependencies
COPY package.json yarn.* ./
RUN yarn install

# Copy our code on top
COPY lib ./lib
COPY bin ./bin

ENTRYPOINT ["bin/pug-lint-vue"]
