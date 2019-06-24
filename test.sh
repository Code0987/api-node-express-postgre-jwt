#!/bin/bash

api="http://localhost:3000" # "https://api-node-express-postgre-jwt.herokuapp.com"
token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicGF5bG9hZCIsImlhdCI6MTU2MTM4NTg4MSwiZXhwIjoxNTYxODE3ODgxfQ.zGvaN04wAAYsFrQ0wkL7hCXz_g5xa5NmF-lcsKytw60"

h_auth="Authorization: Bearer $token"

# GET /
curl -v -X GET "$api"
echo "\n"

# GET /token
curl -v -X GET "$api/token"
echo "\n"

# POST /token
curl -v -X POST -H "$h_auth" "$api/token"
echo "\n"

# GET /branch?ifsc={IFSC}
curl -v -X GET -H "$h_auth" "$api/branch?ifsc=ABHY0065022"
echo "\n"

# GET /branches?name={Bank name}&city={City}&limit={Limit}&offset={Offset}
curl -v -X GET -H "$h_auth" "$api/branches?name=AXIS%20BANK&city=MUMBAI&limit=3&offset=1"
echo "\n"
