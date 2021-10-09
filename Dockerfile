FROM hayd/alpine-deno:1.5.2

EXPOSE 8000

WORKDIR /app

# USER deno

COPY deps.ts .
RUN deno cache --unstable deps.ts

COPY . .
RUN deno cache --unstable server.ts

CMD ["run", "--allow-net", "--allow-read","--allow-write","--allow-env","--unstable", "server.ts"]