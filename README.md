# Securing Upload File/Image Sensitive

Tips &amp; tricks to secure uploaded file/image sensitive, this method work in all any programming language, for this example i use `NodeJs` for Back End and `ReactJs` for Front End, if you run app using docker run app first, before worker app and
dockerfile.worker metadata from must be match with images container name.

# Environtment Worker

```env
##################
# APP ENVIRONMENT
##################
PORT=4000
NODE_ENV=production
MAX_OLD_SPACE=32768
CRYPTO_SECRET_KEY=a505285292637a969305c9a3bd2d44d5a158b40e3b4b6bacc7333f906371767d

########################
# DATABASE ENVIRONMENT
########################
PG_HOST=localhost
PG_PORT=5432
PG_USER=admin
PG_PASSWORD=admin
PG_DBNAME=postgres

######################
# AWS S3 ENVIRONMENT
######################
S3_ACCESS_KEY='bacc7333f906371767d'
S3_SECRET_KEY='a969305c9a3bd2d44d'
S3_BUCKET_NAME='node'
S3_REGION='us‑east‑1'

############################
# MESSAGE BROKER ENVIRONMENT
############################
RABBITMQ_VHOST='/'
RABBITMQ_HOST=localhost
RABBITMQ_PROTOCOL=amqp
RABBITMQ_USERNAME=admin
RABBITMQ_PASSWORD=admin
RABBITMQ_PORT=5672
```
