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

---

### Frontend

---
### Installation
```bash
$ cd front-end
$ npm i
```

---
### Running
```bash
$ npx prisma migrate dev
$ npm run dev
```
Dashboard
![image](https://github.com/hhd182/LTUD_IOT/assets/82596802/8e166dca-bfdd-4bb5-81e0-94ddc734b072)

---
Data sensor
![image](https://github.com/hhd182/LTUD_IOT/assets/82596802/a703cfd2-d849-45cc-a8b8-3eef9eee34bc)
![image](https://github.com/hhd182/LTUD_IOT/assets/82596802/b7be26d4-66d6-47d0-ae8f-467af3f6dc8b)
![image](https://github.com/hhd182/LTUD_IOT/assets/82596802/311b6c31-ce4e-4520-928b-1e5898a24f55)

---
Action History
![image](https://github.com/hhd182/LTUD_IOT/assets/82596802/5c2138be-be17-4ff8-9bd0-38bdb1d0598b)

---
Profile
![image](https://github.com/hhd182/LTUD_IOT/assets/82596802/1541b07d-52c7-4d99-9da9-b160fc93be88)


### API DOCS
```
http://${your host}:${your port}/api-docs
```
