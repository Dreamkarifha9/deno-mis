# MIS_BACKEND

MIS_POSTGRES

```
denon run --allow-net --unstable --allow-read server.ts
```

#docker

```
docker-compose build
docker save -o d:\KI\Deno\denomis.tar deno-docker-mis

docker load -i d:\Inbox\denomis.tar

docker run -it --rm -p 0.0.0.0:8000:8000 -v uploads:/app/uploads -v uploadplan:/app/uploadplan -v Rolefile:/app/Rolefile -v Kpimain:/app/Kpimain -v Kpiminor:/app/Kpiminor -v uploadhistory:/app/uploadhistory --name deno-docker-mis deno-docker-mis
```

#postgres

```
docker run --name pgkigroup --rm -e POSTGRES_PASSWORD=200711 -d -p 5432:5432 -v pgdatavolume:/var/lib/postgresql/data postgres
```
