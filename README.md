# REST API BSale Test


## Ejecutar APP

    node app

# REST API

## Obtener Productos
### Request

`GET /api/product/`

    curl -i -H 'Accept: application/json' http://localhost:8000/api/product/

### Response

    "products": [
        {
            "id": 5,
            "name": "ENERGETICA MR BIG",
            "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
            "price": 1490,
            "category": 1
        },
        ...]

## Obtener Categorias
### Request

`GET /api/product/`

    curl -i -H 'Accept: application/json' http://localhost:8000/api/product/

### Response

    "category": [
        {
            "id": 1,
            "name": "bebida energetica"
        },
        {
            "id": 2,
            "name": "pisco"
        },
        ...]

### Para fines practicos y utilización de está API en el Front-end, está API tiene un deploy en Heroku en el siguiente link:<a href="https://backend-bsale-roberto.herokuapp.com"> Heroku</a>


