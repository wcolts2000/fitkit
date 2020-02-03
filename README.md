# FitnizKit Backend | Meal and Fitness Tracking App

## NAVIGATION

[Register User](#register) | [Login](#login) | [Environment Variables](#envVar) |

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
  "err": "Invalid Request."
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
  "err": "Invalid Credentials."
}
```

> If you send empty email or password fields, the endpoint will return an HTTP response with a status code 400 and a body as below.

```
{
  "err": "Invalid Request."
}
```

# Environment Variables <a name="envVar"></a>

- PORT
- NODE_ENV
- JWT_SECRET
