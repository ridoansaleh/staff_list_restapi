# Staff List REST API

**Database**: MongoDB Atlas (Cloud Database)  
**Framework**: Express

### Features:

1. Create a company as a user ==> (POST)
2. Login as a company's admin ==> (POST)
3. Get all staff ==> (GET)
4. Add a new staff ==> (POST)
5. Edit a staff ==> (PUT)
6. Delete a staff ==> (DELETE)

### Deployment:

Hosting: ~~AWS (Lets try this)~~ **Heroku**

All endpoints deployed are as shown in the table:

| HTTP Method | Endpoint                                                          |  Description  |
| ----------- | ----------------------------------------------------------------- | :-----------: |
| `POST`      | https://blooming-sierra-10191.herokuapp.com/registration          |               |
| `POST`      | https://blooming-sierra-10191.herokuapp.com/login                 |               |
| `GET`       | https://blooming-sierra-10191.herokuapp.com/all_staffs/:companyID | require token |
| `POST`      | https://blooming-sierra-10191.herokuapp.com/staff                 | require token |
| `PUT`       | https://blooming-sierra-10191.herokuapp.com/staff/:id             | require token |
| `DELETE`    | https://blooming-sierra-10191.herokuapp.com/staff/:id             | require token |

Notes:

> Heroku can't read environment variables from .env file. So, i have to manually defined it in Heroku dashboard (project detail).

> I 've tried to deploy this to **Amazon API Gateway** (AWS) with no success yet.

### Database Structure

1. Company

| Field              |  Type  |  Explanation   |
| ------------------ | :----: | :------------: |
| `_id`              | string | auto generated |
| company_name       | string |                |
| address            | string |                |
| city               | string |                |
| country            | string |                |
| number_of_employee | number |                |
| industry           | string |                |
| admin_username     | string |                |
| admin_password     | string |                |

2. Staff

| Field           |  Type  |     Explanation      |
| --------------- | :----: | :------------------: |
| `_id`           | string |    auto generated    |
| `company_id`    | string |     Foreign Key      |
| name            | string |                      |
| gender          | string |   (male or female)   |
| religion        | string |                      |
| marital_status  | string | (married or single)  |
| address         | string |                      |
| city            | string |                      |
| country         | string |                      |
| start_date      | string |                      |
| salary          | number |                      |
| position        | string |                      |
| employee_status | string | (intern or fulltime) |
