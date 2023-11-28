# READING LIST

Reading List is a small web application built with the MVC pattern using [Express](https://expressjs.com/), [EJS](https://ejs.co) view engine, and [Mongoose ODM](https://mongoosejs.com/) to connect to a MongoDB instance hosted by [MongoDB](https://www.mongodb.com/). It is hosted on [AWS](https://aws.amazon.com/) using an [EC2](https://aws.amazon.com/ec2/?nc2=type_a) instance.

![alt text](public/reading.svg)


## Setting up the Application

To set up the application:

1. Install node packages.
```
npm install
```

2. Set environment variables.

```
export MONGO_USER=<user_name>
export MONGO_PASSWORD=<password>
export MONGO_CLUSTER=<cluster>
export MONGO_DBNAME=<db_name>
export MONGO_USER_ID=<mongo_user_collection_id>
```
3. Copy from name down to create a user object as shown below. 
NOTE: MONGO_USER_ID is from the custom user collection in the database.
You can access the database with [MongoDB compass](https://www.mongodb.com/products/tools/compass).
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

4. To start the application, run the following command:
```
npm start
```

## Testing the Application
This project uses [Mocha](https://mochajs.org) and [Chai](https://chaijs.com/) for testing.
All Tests can be found in the test folder.

To test the application, run the following command. 
```
npm test
```
NOTE: If the tests begin to timeout due to new tests being created, update the timeout value in the scripts test section in the package.json file.



## Controllers
|       Name        |           Description                                 |
|-------------------|-------------------------------------------------------|
| `admin`           | Handles the creation, updating, and deletion of books |
| `book`            | Handles getting books                                 |
| `reading`         | Handles getting reading list and favorite genre       |
| `error`           | Handles all error events                              |

## Models


|       Name        |           Description                                            |
|-------------------|------------------------------------------------------------------|
| `book`            | Handles book data                                                |
| `user`            | Handles all user data and reading lists                          |


## Routes 

### admin
|          Paths             |  Method   |
|----------------------------|-----------|
| `admin/add-book`           |   POST    |
| `admin/edit-book/:bookId`  |   POST    |
| `admin/delete-book`        |   POST    |

### book
|         Paths             |   Method  |
|---------------------------|-----------|
| `/`                       |   GET     |
| `/books`                  |   GET     |
| `/books/:bookId`          |   GET     |


### reading
|         Paths             |   METHOD  |
|---------------------------|-----------|
| `/reading/list`           | GET/POST  |
| `/reading/favorite-genre` |   POST    |
| `/reading/favorite-data`  |   POST    |
| `/reading/delete-item`    |   POST    |

## Views
### admin
|       View            |         Description           |
|-----------------------|-------------------------------|
| `/edit-books`         | Used to edit and create books |

### book
|       View            |         Description           |
|-----------------------|-------------------------------|
| `book-details`        | Used to view books            |
| `index`               | Used to view list of books    |


### reading
|       View            |                   Description                  |
|-----------------------|------------------------------------------------|
| `favorite`            | Used to view pie chart built with reading list |
| `list`                | Used to view reading list                      |

### includes
|       View            |                       Description                         |
|-----------------------|-----------------------------------------------------------|
| `add-to-reading`      | A button to inject into view to add books to reading list |
| `end`                 | End of HTML page                                          |
| `head`                | Top of HTML page                                          |
| `navigation`          | Navigation bar used in all views                    |

