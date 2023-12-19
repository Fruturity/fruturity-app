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
            "bookmark": false,
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

### 2. Get Fruit by Id
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
    - `file` (file, required): image that will be uploaded.
- **Request**:
    - Content-Type: application/json
    - Body:
    ```json
    {
        "ripeness": "ripe",
        "category": "mango",
        "file": [image file]
    }
    ```
- **Response**:
    - Status code: `200 OK`
    - Body:
    ```json
    {
        "message": "Data added successfully"
    }
    ```

### 4. Add Note
- **Endpoint**: `/fruit/:id/add/note`
- **Method**: `POST`
- **Description**: Add note on an exist fruit data.
- **Request Parameters**:
    - `id`: The unique string identifier of the fruit to retrieve.
- **Body Parameters**:
    - `note` (string, required): Note that want to be added to the fruit data.
- **Request**:
    - Content-Type: application/json
    - Body:
    ```json
    {
        "note": "This fruit is delicious"
    }
    ```
- **Response**:
    - Status code: `200 OK`
    - Body:
    ```json
    {
        "message": "Note saved successfully"
    }
    ```

### 5. Delete Fruit Data by Id
- **Endpoint**: `/fruit/delete/:id`
- **Method**: `DELETE`
- **Description**: Delete an existing fruit data by id.
- **Request Parameters**:
    - `id`: The unique string identifier of the fruit to retrieve.
- **Response**:
    - Status code: `200 OK`
    - Body:
    ```json
    {
        "message": "Fruit deleted successfully"
    }
    ```

### 6. Get Bananas
- **Endpoint**: `/fruit/bananas`
- **Method**: `GET`
- **Description**: Get all data that have banana category.
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
            "bookmark": false,
            "ripeness": "very ripe",
            "imageUrl": "https://storage.googleapis.com/fruit-image-bucket/img/9712e4cb-19ca-4f36-ba1e-f7b637bf918f",
            "id": "2ca78478-7417-407b-b08f-36688e2e12c8",
            "category": "banana",
            "note": "banana is delicious"
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
            "category": "banana"
        }
    ]
    ```

### 7. Get Mangos
- **Endpoint**: `/fruit/mangos`
- **Method**: `GET`
- **Description**: Get all data that have mango category.
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
            "image": "mango.jpeg",
            "bookmark": true,
            "ripeness": "very ripe",
            "imageUrl": "https://storage.googleapis.com/fruit-image-bucket/img/9712e4cb-19ca-4f36-ba1e-f7b637bf918f",
            "id": "2ca78478-7417-407b-b08f-36688e2e12c8",
            "category": "mango",
            "note": "mango is delicious"
        },
        {
            "date": {
                "_seconds": 1631145600,
                "_nanoseconds": 0
            },
            "image": "b9456e9a-91d2-401c-8a92-cd80688e39bfjpeg",
            "bookmark": false,
            "ripeness": "very ripe",
            "imageUrl": "https://storage.googleapis.com/fruit-image-bucket/img/b9456e9a-91d2-401c-8a92-cd80688e39bf.jpeg",
            "id": "8d4af300-0a47-49c9-935f-45696495aef5",
            "category": "mango"
        }
    ]
    ```

### 8. Get Bookmarked Fruit
- **Endpoint**: `/fruit/bookmark`
- **Method**: `GET`
- **Description**: Get all data that bookmarked.
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
            "image": "mango.jpeg",
            "bookmark": true,
            "ripeness": "very ripe",
            "imageUrl": "https://storage.googleapis.com/fruit-image-bucket/img/9712e4cb-19ca-4f36-ba1e-f7b637bf918f",
            "id": "2ca78478-7417-407b-b08f-36688e2e12c8",
            "category": "banana",
            "note": "banana is delicious"
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

### 9. Make Fruit Bookmarked
- **Endpoint**: `/fruit/:id/bookmark`
- **Method**: `POST`
- **Description**: Make a fruit is bookmarked,
- **Request Parameters**:
    - `id`: The unique string identifier of the fruit to retrieve.
- **Response**:
    - Status code: `200 OK`
    - Body:
    ```json
    {
        "message": "Fruit bookmarked",
        "data": {
            "date": {
                "_seconds": 1631145600,
                "_nanoseconds": 0
            },
            "image": "36d429da-ca5f-4bfb-90d3-3e3f6d286cfd.jpg",
            "ripeness": "very ripe",
            "imageUrl": "https://storage.googleapis.com/fruit-image-bucket/img/36d429da-ca5f-4bfb-90d3-3e3f6d286cfd.jpg",
            "id": "048d15a9-6040-4321-bdda-b4bfac3678e4",
            "category": "banana",
            "bookmark": true
        }
    }
    ```


