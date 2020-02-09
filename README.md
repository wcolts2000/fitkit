# FitnizKit Backend | Meal and Fitness Tracking App

[Register User](#register) | [Login](#login) | [Get User](#getUser) | [Get All Users](#getAllUsers) | [Put User](#putUser) | [Del User](#delUser) | [Environment Variables](#envVar) |

# Base URL

- coming soon

## Register <a name="register"></a>

**_URL: /users/register_**

**_HTTP Method: [POST]_**

### Headers

| name         | type   | required | description      |
| ------------ | ------ | -------- | ---------------- |
| Content-Type | String | Yes      | application/json |

### Body

| name     | type   | required | description |
| -------- | ------ | -------- | ----------- |
| username | String | Yes      |             |
| email    | String | Yes      | unique      |
| password | String | Yes      |             |

_example:_

```
{
  username: "john doe",
  password: "password123",
  email: "johndoe@email.com"
}
```

### Response

**201 (OK)**

> If you successfully register a user the endpoint will return an HTTP response with a status code 201 and a body as below.

```
{
  "message": "welcome john doe",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MzM1NjUxLCJleHAiOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXoE"
}
```

**400 (Bad Request)**

> If you send in invalid fields, the endpoint will return an HTTP response with a status code 400 and a body as below.

```
{
  "message": "Invalid Request."
}
```

---

## LOGIN <a name="login"></a>

### Logs a user in

_Method Url: /users/login_

_HTTP method: [POST]_

### Headers

| name         | type   | required | description      |
| ------------ | ------ | -------- | ---------------- |
| Content-Type | String | Yes      | application/json |

### Body

| name     | type   | required | description                                                        |
| -------- | ------ | -------- | ------------------------------------------------------------------ |
| email    | String | Yes      | Must match an email in the database                                |
| password | String | Yes      | Must match a password in the database corresponding to above email |

_example:_

```
{
  email: "johndoe@email.com",
  password: "password123"
}
```

### Response

**200 (OK)**

> If you successfully login, the endpoint will return an HTTP response with a status code 200 and a body as below.

```
{
  "message": "Welcome john doe",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTQ0MzM1NjUxLCJleHAiOjE1NzU4OTMyNTF9.uqd2OHBYkGQpwjLTPPiPWYkYOKlG7whQDFkk46xGXoE"
}
```

**400 (Bad Request)**

> If you send invalid email or password, the endpoint will return an HTTP response with a status code 400 and a body as below.

```
{
  "message": "Invalid Credentials."
}
```

> If you send empty email or password fields, the endpoint will return an HTTP response with a status code 400 and a body as below.

```
{
  "message": "Invalid Request."
}
```

---

## GET SINGLE USER <a name="getUser"></a>

### Returns a single user matching users id

_Method Url: /users/:id_

_HTTP method: [GET]_

### Headers

| name           | type    | required | description                    |
| -------------- | ------- | -------- | ------------------------------ |
| Authentication | token   | Yes      | must attach to request headers |
| Authentication | private | Yes      | users id must match to access  |

### Response

**200 (OK)**

> If you're id matches the endpoints id, the endpoint will return an HTTP response with a status code 200 and a body as below.

```
  {
    "id": 1,
    "username": "john doe",
    "email": "johndoe@email.com"
    "password": "$2a$12$y1WMR1AM69O3MHEeygGG1ex7m0uPm6UvHwE5KEYnVq9MgUCrL5Bna"
  }
```

---

## GET ALL USERS <a name="getAllUsers"></a>

### Retrieves all users if you are admin whitelisted

_Method Url: /users_

_HTTP method: [GET]_

### Headers

| name           | type  | required | description                    |
| -------------- | ----- | -------- | ------------------------------ |
| Authentication | token | Yes      | must attach to request headers |
| Authentication | admin | Yes      | must be in admin whitelist     |

### Response

**200 (OK)**

> If you are an admin, the endpoint will return an HTTP response with a status code 200 and a body as below.

```
[
  {
    "id": 1,
    "username": "john doe",
    "email": "johndoe@email.com"
    "password": "$2a$12$y1WMR1AM69O3MHEeygGG1ex7m0uPm6UvHwE5KEYnVq9MgUCrL5Bna"
  },
  {
    "id": 2,
    "username": "jane doe",
    "email": "jdee@gmail.com",
    "password": "$2a$12$FEIARePDsflFFNLtrhK.G.NK4ftLVX/gIX908GrX.ryCK46f8IToW"
  }
]
```

---

## PUT USER <a name="putUser"></a>

### Updates a single user matching users id

_Method Url: /users/:id_

_HTTP method: [PUT]_

### Headers

| name           | type    | required | description                    |
| -------------- | ------- | -------- | ------------------------------ |
| Authentication | token   | Yes      | must attach to request headers |
| Authentication | private | Yes      | users id must match to access  |

### Body

| name     | type   | required | description |
| -------- | ------ | -------- | ----------- |
| username | String | No       |             |
| email    | String | No       | unique      |

> Can change either username or email or both

_example:_

```
{
  username: "johnny doe",
  email: "jdoe@email.com"
}
```

### Response

**200 (OK)**

> If you're id matches the endpoints id, the endpoint will return an HTTP response with a status code 200 and a body as below.

```
  1
```

---

## DELETE USER <a name="delUser"></a>

### Delete your user acct

_Method Url: /users/:id_

_HTTP method: [DEL]_

### Headers

| name           | type    | required | description                    |
| -------------- | ------- | -------- | ------------------------------ |
| Authentication | token   | Yes      | must attach to request headers |
| Authentication | private | Yes      | users id must match to access  |

### Response

**200 (OK)**

> If you're id matches the endpoints id, the endpoint will return an HTTP response with a status code 200 and a body as below.

```
  1
```

---

# Environment Variables <a name="envVar"></a>

- PORT
- NODE_ENV
- JWT_SECRET
