FROM node:20.5.1 AS builder-dependencies
WORKDIR /usr/src/application
COPY ./package*.json ./
RUN npm clean-install

FROM node:20.5.1 AS runner-dependencies
WORKDIR /usr/src/application
ENV NODE_ENV=production
COPY ./package*.json ./
RUN npm clean-install --omit=dev --ignore-scripts

FROM node:20.5.1 AS builder
WORKDIR /usr/src/application
COPY --from=builder-dependencies /usr/src/application/node_modules ./node_modules
COPY ./ ./
RUN npm run build

FROM gcr.io/distroless/nodejs20-debian11:latest AS runner
WORKDIR /usr/src/application
ENV NODE_ENV=production
ENV NODE_OPTIONS=--enable-source-maps
COPY --from=runner-dependencies /usr/src/application/node_modules ./node_modules
COPY --from=builder /usr/src/application/package.json ./package.json
COPY --from=builder /usr/src/application/build ./build
COPY --from=builder /usr/src/application/uploads ./uploads
CMD ["./build/index.js"]
