# Fruturity API Documentation
## Overview

The Fruturity API provides access to various functionalities related to the application. This documentation outlines the endpoints, their functionalities, requests, and responses.

### Base Url
```link
https://fruturity.com
```

### Technology
This API is built with Express.js, a framework for Node.js

## Endpoints
### 1. Get Fruits Data
- **Endpoint**: `/fruit/get`
- **Method**: `GET`
- **Description**: List all of the fruits in the database.
- **Request Parameters**: None
- **Response**:
    - Status code: `200 OK`
    - Body:
    ```json
    [
        {
            "date": {
                "_seconds": 1631145600,
                "_nanoseconds": 0
            },
            "image": "download.jpeg",
            "bookmark": true,
            "ripeness": "very ripe",
            "imageUrl": "https://storage.googleapis.com/fruit-image-bucket/img/9712e4cb-19ca-4f36-ba1e-f7b637bf918f",
            "id": "2ca78478-7417-407b-b08f-36688e2e12c8",
            "category": "mango",
            "note": "haiii"
        },
        {
            "date": {
                "_seconds": 1631145600,
                "_nanoseconds": 0
            },
            "image": "b9456e9a-91d2-401c-8a92-cd80688e39bfjpeg",
            "bookmark": true,
            "ripeness": "very ripe",
            "imageUrl": "https://storage.googleapis.com/fruit-image-bucket/img/b9456e9a-91d2-401c-8a92-cd80688e39bf.jpeg",
            "id": "8d4af300-0a47-49c9-935f-45696495aef5",
            "category": "mango"
        }
    ]
    ```

### 2. Get Fruit By Id
- **Endpoint**: `/fruit/:id`
- **Method**: `GET`
- **Description**: Get a fruit data by the given id.
- **Request Parameters**:
    - `id`: The unique string identifier of the fruit to retrieve.
- **Response**:
    - Status code: `200 OK`
    - Body:
    ```json
    {
        "date": {
            "_seconds": 1631145600,
            "_nanoseconds": 0
        },
        "image": "download.jpeg",
        "bookmark": true,
        "ripeness": "very ripe",
        "imageUrl": "https://storage.googleapis.com/fruit-image-bucket/img/9712e4cb-19ca-4f36-ba1e-f7b637bf918f",
        "id": "2ca78478-7417-407b-b08f-36688e2e12c8",
        "category": "mango",
        "note": "haiii"
    }
    ```

### 3. Add Fruit Data
- **Endpoint**: `/fruit/add`
- **Method**: `POST`
- **Description**: Add a new fruit to the database.
- **Request Parameters**: None
- **Body Parameters**:
    - `ripeness` (string, required): ripeness level of fruit.
    - `category` (string, required): fruit category.
    - `date` (string, required): input date (format: YYYY-MM-DD).
    - `bookmark` (boolean, required): sign the fruit is bookmarked or not.
    - `file` (file, required): image that will be uploaded.
- **Response**:
    - Status code: `200 OK`



