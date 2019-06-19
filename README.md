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
curl -v -X GET 'https://api-node-express-postgre-jwt.herokuapp.com/'

curl -v -X GET 'https://api-node-express-postgre-jwt.herokuapp.com/token'

curl -v -X POST 'https://api-node-express-postgre-jwt.herokuapp.com/token' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicGF5bG9hZCIsImlhdCI6MTU2MDk0ODE3MSwiZXhwIjoxNTYxMzgwMTcxfQ.EwDY_IhkvpFaVaNuI5EnQt0w67y2UZV_h4ZNW7rxSkI'

curl -v -X GET 'https://api-node-express-postgre-jwt.herokuapp.com/branch/ABHY0065022' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicGF5bG9hZCIsImlhdCI6MTU2MDk0ODE3MSwiZXhwIjoxNTYxMzgwMTcxfQ.EwDY_IhkvpFaVaNuI5EnQt0w67y2UZV_h4ZNW7rxSkI'

curl -v -X GET 'https://api-node-express-postgre-jwt.herokuapp.com/branches/AXIS%20BANK/MUMBAI/3/1' -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicGF5bG9hZCIsImlhdCI6MTU2MDk0ODE3MSwiZXhwIjoxNTYxMzgwMTcxfQ.EwDY_IhkvpFaVaNuI5EnQt0w67y2UZV_h4ZNW7rxSkI'


```