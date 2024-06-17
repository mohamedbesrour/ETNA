# ETNA
 Application web et mobile E-commerce

BACKEND /
npm i express pg
npm install pg-promise
npm i body-parser

DOCKER /
docker-compose --version
docker-compose up
docker-compose up --build

docker ps   -- pour consulter les ID images docker

pour connaitre l'IP
docker container ls
docker inspect 24006bb24900 
"IPAddress": "172.18.0.3",

  postgres:
    volumes:
      - ./pgdata:/var/lib/postgres/data

  node:
    environment:
      DATABASE_URL: postgres://root:root@postgres/velo,


docker exec -it 2b09b1d35e5a bash       id de etna-node
apt-get install netcat -y
root@2b09b1d35e5a:/server# nc -zv postgres 5432
DNS fwd/rev mismatch: postgres != postgres.etna_default
postgres [172.18.0.3] 5432 (postgresql) open


FRONT-END /
npm create vite@latest  ==> React  ==> Typescript
cd client

Docker HUB:
CMD
- docker images
puis ajouter les images utilisé 
- docker tag b80081928e1d mohamedbesrour/garage-auto:back  
- docker tag 49aaca57ef70 mohamedbesrour/garage-auto:front                                                  

ensuite push
- docker push mohamedbesrour/garage-auto:back
- docker push mohamedbesrour/garage-auto:front