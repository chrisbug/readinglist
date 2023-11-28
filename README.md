# READING LIST

This is a small web applicaiton built with [Express](https://expressjs.com/) using [EJS](https://ejs.co) view engine, [Mongoose ODM](https://mongoosejs.com/) to connect to a MongoDB instance. This project follows the MVC pattern.


This MongoDB instance is hosted by [MongoDB](https://www.mongodb.com/)

The Application is hosted on [AWS](https://aws.amazon.com/) using an [EC2](https://aws.amazon.com/ec2/?nc2=type_a) instance.

![alt text](public/reading.svg)


## SETUP
Install node packages
```
npm install
```

Set enviroment varaibles

```
export MONGO_USER=<user_name>
export MONGO_PASSWORD=<password>
export MONGO_CLUSTER=<cluster>
export MONGO_DBNAME=<db_name>
export MONGO_USER_ID=<mongo_user_collection_id>
```
NOTE: MONGO_USER_ID is from custom user collection in db.
You can access the database with [MongoDB compass](https://www.mongodb.com/products/tools/compass) copy from name down to create a user object
```
{
  "_id": {
    "$oid": "****" 
  },
  "name": "user"
  "email": "user@test.com",
  "reading": {
    "items": []
  }
}
```

To Start the applicaiton run
```
npm start
```

## TESTING
This project uses [Mocha](https://mochajs.org) and [Chai](https://chaijs.com/) for testing.
All Tests can be found in the test folder.

To run tests. If they begin to timeout due to new tests update the timeout value in the sripts test section in package.json
```
npm test
```


## CONTROLLERS
|       NAME        |           DESCRITION                                 |
|-------------------|------------------------------------------------------|
| `admin`           | Handles the creation updating and deletion  of books |
| `book`            | Handles getting books                                |
| `reading`         | Handles getting reading list and favorite genre      |
| `error`           | Handles all error events                             |

## MODELS
|       NAME        |           DESCRITION                                             |
|-------------------|------------------------------------------------------------------|
| `book`            | Handles book data no extra features just wrapped with mongoose   |
| `user`            | Handles all user data and reading lists                          |


## ROUTES 
### admin
|          Paths             |  METHOD   |
|----------------------------|-----------|
| `admin/add-book`           |   POST    |
| `admin/edit-book/:bookId`  |   POST    |
| `admin/delete-book`        |   POST    |

### book
|         Paths             |   METHOD  |
|---------------------------|-----------|
| `/`                       |   GET     |
| `/books`                  |   GET     |
| `/books/:bookId`          |   GET     |


### reading
|         Paths             |   METHOD  |
|---------------------------|-----------|
| `/reading/list`           | GET/POST  |
| `/reading/favorite-genre`         |   POST    |
| `/reading/favorite-data`  |   POST    |
| `/reading/delete-item`    |   POST    |

### Views
### admin
|       view            |         DESCRITION            |
|-----------------------|-------------------------------|
| `/edit-books`          | Used to edit and create books |

### book
|       view            |         DESCRITION            |
|-----------------------|-------------------------------|
| `book-details`        | Used to view book             |
| `index`               | Used to view list of books    |


### reading
|       view            |                   DESCRITION                   |
|-----------------------|------------------------------------------------|
| `favorite`            | Used to view pie chart built with reading list |
| `list`                | Used to view reading list                      |

### includes
|       view            |                       DESCRITION                          |
|-----------------------|-----------------------------------------------------------|
| `add-to-reading`      | A button in inject into view to add books to reading list |
| `end`                 | End of html page                                          |
| `head`                | Top of html page                                          |
| `navigation`          | Navigatoin bar to be used in all views                    |

