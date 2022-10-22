
# 📝 Notes API

This is a Node.js applicaion that exposes a REST API for a Notes Management System.   
A user can sign-up or login and then use the API for storing and retriving notes in the server (CURD).  
MongoDB is being used with Express.js for storing the notes. The applicaion can also be run on docker. 

## 🛠 Technologies used


- Javascript
- Node
- Express
- Bcrypt
- JWT (Json Web Tokens)
- MongoDb
- Mongoose
- Docker
- Docker Compose   
## 💻 API Reference

#### Register new user

```http
  POST /auth/signup
  Content-Type: application/x-www-form-urlencoded
```

| Request Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | Username of new user. |
| `email` | `string` | New email for registration. |
| `password` | `string` | Password for the account. |

Successful response: 
```
{
  "result": "ok",
  "data": "Created user with email: rounik@dev.com"
}
```


#### User Sign-In

```http
  POST /auth/login
  Content-Type: application/x-www-form-urlencoded
```

| Request Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | Your registered email. |
| `password` | `string` | Password to your account. |

Successful response: 
```
{
  "result": "ok",
  "data": {
    "token": "JWT (Acess token)"
  }
}
```

### Notes API Requests: 

All these requests must include Bearer Token in the header for authorization. 

| Headers | Type     | Description                |
| :-------- | :------- | :------------------------- |
| Authorization | string | Bearer <JWT> for server side authorization



#### Fetch all Notes

```http
  GET /notes/
```

Successful response (List of notes): 
```
{
  "result": "ok",
  "data": [
    {
      "_id": "63541bd8bf10e32d08c15b99",
      "title": "This is a note",
      "description": "First note that was added!",
      "createdBy": "63541ba8bf10e32d08c15b95",
      "__v": 0
    },
    {
      "_id": "635422e2a96f9850461bda85",
      "title": "This is another note",
      "description": "So this one is the second note!",
      "createdBy": "63541ba8bf10e32d08c15b95",
      "__v": 0
    }
  ]
}
```
#### Fetch a Note by ID

```http
  GET /notes/{id}
```

| URL Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| id | string | ID of the note to be fetched |

Successful response (Single note document): 
```
{
  "result": "ok",
  "data": {
    "_id": "635422e2a96f9850461bda85",
    "title": "This is another note",
    "description": "def",
    "createdBy": "63541ba8bf10e32d08c15b95",
    "__v": 0
  }
}
```

```http
  POST /notes/add/
  Content-Type: application/x-www-form-urlencoded
```

| Request Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| title | string | Title of the new note |
| description | string | Description of the new note |

Successful response: 
```
{
  "result": "ok",
  "data": "Note added successfully"
}
```

#### Update a Note by ID
```http
  POST /notes/update/
  Content-Type: application/x-www-form-urlencoded
```

| Request Body | Type     | Description                |
| :-------- | :------- | :------------------------- |
| id | string | ID of the note to be updated |
| title | string | Updated title |
| description | string | Updated description  |

Successful response: 
```
{
  "result": "ok",
  "data": "Successfully updated note with id: <id>"
}
```

#### Delete a Note by ID
```http
  POST /notes/delete/{id}
  Content-Type: application/x-www-form-urlencoded
```

| URL Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| id | string | ID of the note to be deleted |

Successful response: 
```
{
  "result": "ok",
  "data": "Successfully updated note with id: <id>"
}
```
