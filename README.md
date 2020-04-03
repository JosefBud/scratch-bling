# Scratch Bling API

This is a simple API developed as an assessment for Byte.lion

## Documentation

### API Endpoints

| API endpoint  | HTTP method | Description                                                                                  |
| ------------- | ----------- | -------------------------------------------------------------------------------------------- |
| /items        | GET         | Retrieves a list of all items                                                                |
| /items/[name] | GET         | Retrieves an item by its name, must be URL encoded (ex: /items/The%20Itcher)                 |
| /items        | POST        | Creates an item using the request body format below                                          |
| /items/[name] | DELETE      | Deletes an item by its name, must be URL encoded (ex: /items/The%20Itcher)                   |
| /items/[name] | PUT         | Edits an item by its name, must be URL encoded **and** include a request body (format below) |

### Request Body

For POST and PUT requests, use a `x-www-form-urlencoded` body with the following fields:

| Field name             | Data type |
| ---------------------- | --------- |
| name (required)        | String    |
| description (required) | String    |
| size (required)        | Array     |
| cost (required)        | String    |
