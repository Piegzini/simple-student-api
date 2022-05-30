# Simple Student API

Simple Student API is a REST api application made to learn how to build such a service. I never delved into how such a website works and how it should be built from scratch, because I usually used headless cms for my small projects. I started building the site by playing around with the database.

##### Link to site: https://golden-daffodil-ac7f6e.netlify.app
##### API Link : https://simple-student-api.herokuapp.com

### Last Release 30/05/2022.
###### Github version is not always up-to-date.


## Description

### What does this app do?

By logging in to the application and entering our email, we receive a JWT token which allows us to use the end points of the application. Logging is implemented using passport.js on jwt strategy.

### Technologies used

* <b>node.js,</b>
* <b>react,</b>
* <b>express.js,</b>
* <b>passport.js - jwt strategy,</b>
* <b>nodemailer (gmail), </b>
* <b>postgresql,</b>
* <b>NPM library,</b>
* <b> In development - docker, </b>

### Please report every issue and bug!


## Documentation

### How to get access token?

To get access token to API you need to take few steps.

<ol> 
    <li>Go to the site: https://simple-student-api.herokuapp.com,</li>
    <li>Register your account with username, password and email,</li>
    <li>Login to your account, and then access token will be sent to your email,</li>
    <li>Now you can use the service.</li>
</ol>

### Data
We have three databases:
<ul>
    <li>Books,</li>
    <li>Borrowings,</li>
    <li>Students.</li>
</ul>

### Models in database

#### Book: 
    id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
    title: {
            type: DataTypes.STRING(70),
            allowNull: false,
            required: true,
        },

#### Student:
     id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        pesel: {
            type: DataTypes.STRING(11),
            allowNull: false,
            unique: true,
            len: [11, 11],
        },
        name: {
            type: DataTypes.STRING(70),
            allowNull: false,
        },

        surname: {
            type: DataTypes.STRING(70),
            allowNull: false,
        },

#### Borrowing 
    id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
            allowNull: false,
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true,
        },

        book_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true,
        },


### Endpoints
##### Getters
On books example:

/books - send users data. Default it use pagination with 20 elements limit.

/books/:id - send data information about user with this id.
##### Post
/books - create a new book in database. You must send all data required for book object.
##### Puts
/books - update book in database. You must send all data required for book object.
#### Deletes
/books/:id - delete book with indicated id.

### Pagintation
page - number of page.
limit - number of elements in one page.

example:

<code> https://simple-student-api.herokuapp.com/api/v1/books?page=3&liimit=8 </code> 

You will receive a third page of books with eight items on it


<i> Readme inspired by @tzmcion </i>

