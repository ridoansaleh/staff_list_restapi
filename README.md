# Staff List RestAPI  

**Database**: MongoDB Atlas (Cloud Database)  
**Framework**: Express

### Features:
1. Create a company as a user (Registration / Sign Up) ==> (POST)
2. Login as a company's admin ==> (POST)
3. Get all staff ==> (GET)
3. Add a new staff's data ==> (POST)
4. Edit a staff's data ==> (PUT)
5. Delete a staff's data ==> (DELETE)

### Deployment: 
Hosting: AWS (Lets try this)

### Database Structure

1. Company

| Field               | Type          | Explanation    |
| --------------------|:-------------:| :-------------:|
| `_id`               | string        | auto generated |
| company_name        | string        |     |
| address             | string        |     |
| city                | string        |     |
| country             | string        |     |
| number_of_employee  | number        |     |
| industry            | string        |     |
| admin_username      | string        |     |
| admin_password      | string        |     |

2. Staff

| Field               | Type          | Explanation    |
| --------------------|:-------------:| :-------------:|
| `_id`               | string        | auto generated |
| name                | string        |     |
| gender              | string        |  (male or female)   |
| religion            | string        |     |
| marital_status      | string        |  (married or single)   |
| address             | string        |     |
| city                | string        |     |
| country             | string        |     |
| start_date          | string        |     |
| salary              | number        |     |
| position            | string        |     |
| employee_status     | string        |  (intern or fulltime)   |
