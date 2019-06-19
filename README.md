# API using Node + Express + Postgre + JWT

## Install

Install node modules
```sh
npm install
```

Install postgre and follow below in psql.
Data is in `data\dump.sql`.
```sql
set CLIENT_ENCODING TO 'utf8';

create database bank;
create user bank;
alter user bank with encrypted password 'pass';
grant all privileges on database bank to bank;

\c bank;
\i data/dump.sql;

grant all privileges on table banks to bank;
grant all privileges on table branches to bank;
grant all privileges on table bank_branches to bank;

\d banks;
\d branches;
```

## Run 

Start postgre server.
Then,
```sh
npm run dev
```

```sh
curl -v -X GET 'http://localhost:3000/'

curl -v -X GET 'http://localhost:3000/token'

curl -v -X POST 'http://localhost:3000/token' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidG9rZW4iLCJpYXQiOjE1NjA5Mzg5MzcsImV4cCI6MTU2MTM3MDkzN30.bgx-VPGLnlUOLdP8EQHUQUh_bVJC8ZV-RJLeJVIKeAE'

curl -v -X GET 'http://localhost:3000/branches/AXIS BANK/MUMBAI/3/1' \ 
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidG9rZW4iLCJpYXQiOjE1NjA5Mzg5MzcsImV4cCI6MTU2MTM3MDkzN30.bgx-VPGLnlUOLdP8EQHUQUh_bVJC8ZV-RJLeJVIKeAE'

curl -v -X GET 'http://localhost:3000/branch/ABHY0065022' \ 
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidG9rZW4iLCJpYXQiOjE1NjA5Mzg5MzcsImV4cCI6MTU2MTM3MDkzN30.bgx-VPGLnlUOLdP8EQHUQUh_bVJC8ZV-RJLeJVIKeAE'

```