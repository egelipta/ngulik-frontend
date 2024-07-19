FROM node:20-slim as base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

ARG SHORT_SHA="latest"

RUN apt-get update && \
  apt-get install -y openssh-client git jq curl

WORKDIR /usr/src/app/
COPY . ./
RUN sed -i "s/54b63c91/${SHORT_SHA}/g" /usr/src/app/src/components/Footer/index.tsx


# USER root
# COPY ./id_rsa_shared /root/.ssh/id_rsa
# RUN chmod 600 /root/.ssh/id_rsa
# COPY .npmrc /root/.npmrc

RUN corepack prepare pnpm@latest-8 --activate
# RUN pnpm config set store-dir .pnpm-store
# RUN pnpm set registry http://npmjs.dgos.id
# RUN pnpm install
# COPY ./ ./
# RUN pnpm build

# FROM base AS prod-deps
# RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN pnpm config set always-auth true
# COPY .npmrc /root/.npmrc

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install
# RUN pnpm install --frozen-lockfile
RUN pnpm build

FROM nginx:1.25-alpine
WORKDIR /usr/share/nginx/html/
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist  /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] ⁠
