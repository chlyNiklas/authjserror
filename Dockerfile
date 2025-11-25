FROM node:25-trixie AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
# RUN corepack enable
RUN npm install -g pnpm

RUN apt-get update && \
	apt-get install -y python3 build-essential 

ENV CI=true
ENV npm_config_build_from_source=true

WORKDIR /app

COPY ./package.json ./
COPY ./pnpm-lock.yaml ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile 

FROM base AS build

COPY . /app

ENV DATABASE_URL=build.db

COPY .env.example .env

RUN pnpm run build

FROM base
WORKDIR /app

COPY --from=build /app/build .
COPY ./drizzle ./drizzle
COPY ./drizzle.config.ts ./drizzle.config.ts
COPY ./start.sh ./start.sh


EXPOSE 3000
CMD [ "sh", "start.sh" ]

