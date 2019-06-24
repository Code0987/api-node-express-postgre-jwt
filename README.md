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

GET /

GET /token - Create a new JWT token with 5 days expiration

POST /token - Decodes token and returns the decoded data

GET /branch?ifsc={IFSC} - Returns the branch found with given IFSC

GET /branches?name={Bank name}&city={City}&limit={Limit}&offset={Offset} - Returns the paginated list of branches found with given bank name and city

Test curl @ [test.sh](./tesh.sh)