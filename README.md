# Securing Upload File/Image (Coming Soon)

Tips &amp; tricks to secure every uploaded file/image, this method work in all any programming language, for this example i use `NodeJs` for Back End and `ReactJs` for Front End, if you run app using docker run app first, before worker app and
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
CRYPTO_IV_KEY=85778679eff9d38cd91232946277c703

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
S3_ACCESS_KEY='AKIA2YBSL7CRU5X66V4I'
S3_SECRET_KEY='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'
S3_BUCKET_NAME='vos-abs'
S3_REGION='ap-southeast-3'

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
