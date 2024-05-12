# Project IOT
### Table of contents

1. [Clone](#clone)
2. [Backend](#backend)
    - [Installation](#installation)
    - [Config](#config)
    - [Database](#database)
    - [Running](#running)
3. [Frontend](#frontend)
    - [Installation](#installation-1)
    - [Running](#running-1)
4. [API DOCS](#api-docs)
### Clone

```bash
$ git clone https://github.com/hhd182/LTUD_IOT.git
```

### Backend

---
### Installation
```bash
$ cd back-end
$ npm i
```
---
### Config
Create file `.env`
```
DB_USERNAME = 'your username'
DB_PASSWORD = 'your password'
DB_HOST = 'your host'
DB_PORT = 'your port'
DB_NAME = 'your database'

MQTT_USERNAME = 'your broker username'
MQTT_PASSWORD = 'your broker password'
MQTT_PORT = 'your port broker connect'

DATABASE_URL="mysql://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
MQTT_BROKER_URL="http://localhost:${MQTT_PORT}"
```

---
### Database
config database
```
back-end/prisma/schema.prisma
```
Connect
```bash
$ npx prisma migrate dev
```

---
### Running
```bash
$ npm start
```
Terminal

![image](https://github.com/hhd182/LTUD_IOT/assets/82596802/6a6e53ad-983e-49cb-b594-cac56e31eeeb)


### API DOCS
```
http://${your host}:${your port}/api-docs
```
