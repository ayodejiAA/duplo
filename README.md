## Starting App

Clone repo and run with docker

```bash
$ cd duplo
$ docker compose up
```

## Endpoints

Businesses and their respective department head accounts will automatically be seeded when application starts running.

Health Check

- GET localhost:5000/api/v1/health-check

Get All Businesses on the platform **_Note: You will use the business Id to retrieve order details and credit score_**

- GET localhost:5000/api/v1/business

Curate and process orders from businesses' department heads. This simulates placing orders directly on the platform. The process logs successful order to mongodb and send order data to the tax authority.

- POST localhost:5000/api/v1/orders/curate

Retrieve Business Credit Score

- GET localhost:5000/api/v1/orders/credit-score/<-businessId->

Retrieve Business Order Details

- GET localhost:5000/api/v1/orders/details/<-businessId->
