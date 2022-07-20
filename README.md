# Node APP: CALORIE TRACKING APP

#### Discription : This is simple node js application. which provide below functionality :

     > Create user with different role(admin/c_taker)
     > User able to make food entry with required field
     > Get list of specific user food
     > Get all food list if user role is admin
     > Calories daily wise per user limit
     > User can update there calories daily limit.
     > We have specific route for all of this functionality.

####

# TECHNOLOGY/ LIBRARY DETAILS

###### DATABASE : Mongodb Atlas

###### LANGULAGE : Javascript(Node)

###### FRAMEWORK : Mongoose, Express

## API URLS

#### User create

     > URL: '/api/createUser'
     > Payload : {"name":"Pooja Patel", "email": "pooja.patel@gmail.com","password": "pooja@123", "userRole": "c_taker", "calorie_limit": "200"}
     > Method : POST

#### UPdate Calorie daily limit

     > URL : '/api/updateCLimit'
     > Payload : {"newLimit":"<Numeric Value>", "userId": "<userId>"}
     > Method : POST

#### User can make food entry

     > URL : '/api/food-taken'
     > Payload : {"product_name":"Milk", "taken_date_time": "2022-07-19T22:27:55.768Z","calorie_value": "50", "userId": "62d74a7fe751e03b204aa94c"}
     > Method : POST

#### Get food by user id - if user role is equal to admin then return whole record

     > URL : '/api/food/:userId'
     > Payload : <userId>
     > Method : Get

## Project Specifications

**POSTMAN API TESTING AND DATABASE VIEWS**

### PORT : 3000

### JWT authentication token with expries time

### API KEY authentication

### .env Contains all confidential info of project

```
**Commands**
- install: `npm install`
- run: `npm start`
```
