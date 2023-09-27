/*    Importing Required Packages:
        const express = require('express'): This line imports the Express.js framework, which is a popular framework for building web applications in Node.js.
        const app = express(): It creates an instance of the Express application, which you'll use to configure and define routes for your web application.
        const mongoose = require('mongoose'): Mongoose is an ODM (Object Data Modeling) library for MongoDB, and it's often used to interact with MongoDB databases in Node.js applications.
        const passport = require('passport'): Passport is a middleware for handling user authentication in Node.js applications. It provides various authentication strategies (e.g., local, OAuth) for securing your application.
        const session = require('express-session'): This package provides session middleware for Express.js. Sessions are used to store user data on the server between HTTP requests.
        const MongoStore = require('connect-mongo')(session): This line creates a store for session data using MongoDB. It's typically used with express-session to store session information in a MongoDB database.
        const flash = require('express-flash'): The express-flash package is used for displaying flash messages in your application. Flash messages are typically used to provide feedback to users after an action has been performed.
        const logger = require('morgan'): The morgan package is a middleware for logging HTTP requests and responses. It's often used for debugging and monitoring purposes.

This code sets up the basic dependencies for a Node.js web application, but it's just the starting point. To build a fully functional application, you would need to define routes, configure the database connection using Mongoose, set up authentication with Passport, and handle sessions and flash messages appropriately
*/
const express = require('express')  
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')

// the line 22 up to line 24 This portion of the code is likely part of the setup for your Node.js application, where you're including additional modules and routes. Let's break it down:
const connectDB = require('./config/database') // Database Connection: It appears that you're importing a module named connectDB from a file located at ./config/database. This is a common practice for separating the database configuration from the main application code. The connectDB module likely contains the code necessary to establish a connection to your MongoDB database using Mongoose.
const connectDB = require('./config/database') 
//Routes:
/*
const mainRoutes = require('./routes/main'): You're importing a module named mainRoutes from a file located at ./routes/main. This suggests that you are setting up routes for your main application, which could include routes for the homepage or other core parts of your web application.
        const todoRoutes = require('./routes/todos'): Similarly, you're importing a module named todoRoutes from a file located at ./routes/todos. This suggests that you are setting up routes related to handling todo items or tasks within your application.

These lines of code are organizing your application's functionality into different modules and files, which is a good practice for maintaining a clean and modular codebase. Each of these imported modules likely defines routes and other functionality that will be used later in your application.

*/
const mainRoutes = require('./routes/main')     
const todoRoutes = require('./routes/todos')   

require('dotenv').config({path: './config/.env'})
/*
.env file located in the ./config/ directory. Here's what it does step by step:

    require('dotenv'): This line imports the dotenv package. dotenv is a commonly used package in Node.js applications to load environment variables from a .env file into the Node.js process environment.

    .config({ path: './config/.env' }): This line calls the config method on the dotenv package, passing in an options object with the path property set to './config/.env'. This tells dotenv to look for the .env file in the specified path.

*/

// Passport config
require('./config/passport')(passport)
/*
    require('./config/passport')(passport):
        This line is using require to import a module located at ./config/passport.
        The require statement appears to be passing an argument, passport, to the imported module.


*/

connectDB()
/*
The connectDB() function  mentioned is likely a custom function defined somewhere in Node.js application. It's commonly used to establish a connection to a database
*/

//
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))


// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    



/*



  */