# Server

First server side coding then client

create serever Folder

..\chat-app\server> npm init

package name: (server)
version: (1.0.0)
description:            
entry point: (index.js) 
test command:              
git repository:                
keywords:             
author:                                             
license: (ISC)       

create index.js file

we need some libraries to install

npm i express mongoose cors dotenv


To run index.js in dev continuously when yousave changes
npm i nodemon

//package.json

```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "First server side coding then client",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js", //Changes made
    "dev": "nodemon index.js" //Changes made
  },
  "author": "Manish Singh",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.18.2",
    "mongoose": "^8.0.1",
    "nodemon": "^3.0.1"
  }
}
```

now run - ..\chat-app\server> npm run dev   


basic setup
```js 
//index.js

const express = require('express');
const app = express();

const port = 5001;

app.listen(port, () => {
    console.log(`server running on ${port}`)
});
```

we can make port as env variable.

To make the port value configurable using an environment variable, you can modify your index.js file to read the port from the environment variable. Here's an example using the dotenv package to load variables from a .env file:

Create a .env file in the same directory as your index.js with the following content:
PORT=5001

Modify your index.js file:

```js 
//index.js

const express = require('express');
const app = express();
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Use process.env.PORT as the port value or default to 5001
const port = process.env.PORT || 5001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

```

## CORS (Cross-Origin Resource Sharing)

app.use(cors());

CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers that restricts web pages from making requests to a different domain than the one that served the web page. This security measure helps prevent malicious websites from making unauthorized requests to a different domain on behalf of the user.

When you're building a web application with a frontend and a backend served from different domains (or ports), you might encounter CORS issues. In such cases, you need to configure your server to include the necessary CORS headers in its responses to allow cross-origin requests.

```js 
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Use process.env.PORT as the port value or default to 5001
const port = process.env.PORT || 5001;

// Enable CORS for all routes
app.use(cors()); 

//OR

// app.use(cors({
//     origin: ['http://example.com', 'http://localhost:3000'] // Add your allowed origins here
// }));


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

```

By adding app.use(cors());, you allow all origins to access your server. If you want to restrict it to specific origins, you can pass an options object to cors() with the origin property set to an array of allowed origins:

```js 
app.use(cors({
    origin: ['http://example.com', 'http://localhost:3000'] // Add your allowed origins here
}));

```

This way, you can control which domains are allowed to make requests to your server. Adjust the origins based on your specific requirements.

## MiddleWare

app.use(express.json());

express.json(): This is a method provided by the express module. When you use express.json(), it returns middleware that parses incoming JSON requests. It understands JSON-encoded data in the body of the request and makes it available in req.body.

app.use(): This is an Express method used to mount middleware. Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. These functions can perform various tasks, modify the request or response objects, or end the request-response cycle.


Example : 
```js 
//server.js

const express = require('express');
const app = express();

// This middleware is added to the application's request-response cycle.
// It parses incoming JSON requests and makes the data available in req.body.
app.use(express.json());

// Your routes and other middleware can now access JSON data in req.body.

// Example route:
app.post('/example', (req, res) => {
  const jsonData = req.body; // Access the JSON data sent in the request.
  // Your logic here...
  res.send('Response sent back to the client.');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

```

## mongoose Connection

```js 
//server.js
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5001;
const uri = process.env.ATLAS_URI

app.use(cors());
app.use(express.json());


app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});


mongoose.connect(uri).then(() => {
    console.log("MongoDB connection established")
}).catch((error) => {
    console.log("MongoDb Connection Failed:" + error.message)
})

```



## app.get()

It's a part of the Express application object (app) and is used to specify what should happen when a client makes a GET request to a specific route.

Here's a basic example of how to use app.get:

```js 
//index.js

const express = require('express');
const app = express();
const cors = require('cors')
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT || 5001;
app.use(cors());

// Define a route for handling GET requests at the root path '/'
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Define another route for handling GET requests at the '/about' path
app.get('/about', (req, res) => {
    res.send('About Us');
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
```
<hr>

### Different app methods

1. **`app.get(path, callback [, callback ...])`**: Defines a route for handling HTTP GET requests.
    ```javascript
    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });
    ```

2. **`app.post(path, callback [, callback ...])`**: Defines a route for handling HTTP POST requests.
    ```javascript
    app.post('/submit', (req, res) => {
        res.send('Form submitted!');
    });
    ```

3. **`app.put(path, callback [, callback ...])`**: Defines a route for handling HTTP PUT requests.
    ```javascript
    app.put('/update', (req, res) => {
        res.send('Resource updated!');
    });
    ```

4. **`app.delete(path, callback [, callback ...])`**: Defines a route for handling HTTP DELETE requests.
    ```javascript
    app.delete('/remove', (req, res) => {
        res.send('Resource deleted!');
    });
    ```

5. **`app.use([path,] callback [, callback...])`**: Mounts middleware functions at the specified path. If no path is specified, the middleware is executed for every request.
    ```javascript
    app.use(express.static('public'));
    ```

6. **`app.all(path, callback [, callback ...])`**: This method is like the standard HTTP methods but matches all HTTP methods.
    ```javascript
    app.all('/secret', (req, res, next) => {
        console.log('Accessing the secret section ...');
        next(); // pass control to the next handler
    });
    ```

7. **`app.route(path)`**: Returns an instance of a single route, which you can then use to handle HTTP methods for that route.
    ```javascript
    app.route('/books')
        .get((req, res) => {
            res.send('Get a list of books');
        })
        .post((req, res) => {
            res.send('Add a new book');
        })
        .put((req, res) => {
            res.send('Update the book');
        })
        .delete((req, res) => {
            res.send('Delete the book');
        });
    ```

### req and res methods

### Request (`req`) Object Methods:

1. **`req.params`**: An object containing properties mapped to the named route "parameters."
    ```javascript
    app.get('/users/:userId', (req, res) => {
        const userId = req.params.userId;
        // ...
    });
    ```

2. **`req.query`**: An object containing a property for each query string parameter in the route.
    ```javascript
    app.get('/search', (req, res) => {
        const query = req.query.q;
        // ...
    });
    ```

3. **`req.body`**: Contains key-value pairs of data submitted in the request body. Requires middleware like `express.json()` or `body-parser` to parse the body.
    ```javascript
    app.post('/login', (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        // ...
    });
    ```

### Response (`res`) Object Methods:

1. **`res.send([body])`**: Sends the HTTP response. The body parameter can be a string, an object, an array, or a buffer.
    ```javascript
    app.get('/', (req, res) => {
        res.send('Hello, World!');
    });
    ```

2. **`res.json([body])`**: Sends a JSON response. It automatically sets the `Content-Type` header to `application/json`.
    ```javascript
    app.get('/json', (req, res) => {
        res.json({ message: 'Hello, JSON!' });
    });
    ```

3. **`res.status(code)`**: Sets the HTTP status code.
    ```javascript
    app.get('/error', (req, res) => {
        res.status(404).send('Not Found');
    });
    ```

4. **`res.redirect([status,] path)`**: Redirects the request to the specified path. The status code is optional and defaults to 302.
    ```javascript
    app.get('/old-route', (req, res) => {
        res.redirect('/new-route');
    });
    ```

5. **`res.render(view [, locals])`**: Renders a view template using the specified view engine.
    ```javascript
    app.get('/home', (req, res) => {
        res.render('home', { title: 'Home Page' });
    });
    ```

6. **`res.cookie(name, value [, options])`**: Sets a cookie in the response.
    ```javascript
    app.get('/set-cookie', (req, res) => {
        res.cookie('username', 'johnDoe', { maxAge: 900000, httpOnly: true });
        res.send('Cookie set successfully!');
    });
    ```


Create 3 new Folders
Models
Controllers
Routes


## Models:

Purpose: The Models folder is typically used to store data models or schema definitions. In the context of MongoDB and Mongoose (which you seem to be using), this is where you define your data structures and interact with the database.
Example: If your application involves users, you might have a User.js file in the Models folder that defines the schema for user data.

```js 
// Models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // ... other fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;

```


## Controllers:

Purpose: The Controllers folder is where you define the logic that handles requests and responses. Controllers interpret the incoming requests, interact with the models (if necessary), and send back an appropriate response.
Example: If you have a user-related route, you might have a UserController.js file in the Controllers folder.

```js
// Controllers/UserController.js
const User = require('../Models/User');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getAllUsers };


```


## Routes:

Purpose: The Routes folder is where you define the routes for your application. This is where you specify which controller function should handle each type of request.
Example: If you have a user-related API, you might have a userRoutes.js file in the Routes folder.

```js 
// Routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

// Define routes
router.get('/users', UserController.getAllUsers);

module.exports = router;

```

In your main index.js file (or wherever you set up your Express app), you would then use these routes:

```js 
const express = require('express');
const app = express();
const userRoutes = require('./Routes/userRoutes');

app.use('/api', userRoutes); // Assuming all user-related routes start with /api/users

```

`code`

```js 
//userModel.js
const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 3, maxLength: 30 },
    email: { type: String, required: true, minLength: 3, maxLength: 200, unique: true },
    password: { type: String, required: true, minLength: 3, maxLength: 1024 },
}, {
    timestamps: true,
});

//create user model
const userModel = mongoose.Model("User", userSchema);

module.exports = userModel;
```


Define all Routes here in Routes folder to avoid messing up in index.js
```js 
//userRoute.js

const express = require('express');
const router = express.Router();

router.get("/register",(req,res) =>{ //just for testing created as get.
    res.send("hiiiii");
})

module.exports = router;

```


Now you can call the specific router under middleWare.

```js
//server.js
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./Routes/userRoute.js");
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5001;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter); //This change

//CRUD
app.get("/", (req, res) => {
    res.json({ message: "hi" });
});


app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});


mongoose.connect(uri).then(() => {
    console.log("MongoDB connection established")
}).catch((error) => {
    console.log("MongoDb Connection Failed:" + error.message)
})
```

`http://localhost:5002/api/user/register`


Now lets create userController.js in Controllers,move the logic(callback in router) to controller fn.

```js 
// userController.js

const registerUser = (req,res) => {
    res.send("register")
}

//we can have many more like login etc..

module.exports = {registerUser}


```

```js 
//userRoute.js

const express = require('express');
const router = express.Router();
const { registerUser } = require('../Controllers/userController');

router.post("/register", registerUser);


module.exports = router;

```


Lets workon userController logic like registering user.
Before that we need install some more packages

`npm i bcrypt jsonwebtoken validator`

### bcrypt:

Purpose: Bcrypt is a library for hashing passwords. When users create accounts or log in, their passwords should never be stored in plain text for security reasons. Bcrypt helps you securely hash and store passwords by applying a one-way hashing algorithm with salt.
Usage: Typically used to hash passwords before storing them in a database and compare hashed passwords during user login.

### jsonwebtoken:

Purpose: JSON Web Tokens (JWT) are a compact, URL-safe means of representing claims to be transferred between two parties. In the context of authentication, JWTs are often used to securely transmit information between the client and server as a compact and self-contained token.
Usage: Commonly used for creating and verifying authentication tokens. When a user logs in, a JWT can be issued and sent to the client. The client includes the JWT in subsequent requests, allowing the server to verify the user's identity.


### validator:

Purpose: Validator is a library for data validation. When dealing with user inputs, it's crucial to validate the data to ensure it meets the expected format and criteria, preventing security vulnerabilities and ensuring data integrity.
Usage: Used for validating user input, such as email addresses, passwords, and other form data.


`small code change`

```js 
//userController.js

const userModel = require("../Models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const validator = require('validator');

//From frontend we would be getting req (client to sever), we can access these params.
const registerUser = (req,res) => {
    const {name, email, password} = req.body;
}

module.exports = {registerUser}
```

`so how do we get these params from client side, what tag it is in input? or something else?`

To send data from the client side to the server side, you typically use HTML forms or JavaScript to make HTTP requests. Assuming you're using a form to collect user registration data, you would use input fields to capture the values for name, email, and password. Here's a basic example using HTML:

```html
<!-- HTML form in your frontend -->
<form id="registrationForm">
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required>

  <button type="submit">Register</button>
</form>

```

In this example, each input field has a unique id attribute, and the name attribute corresponds to the field name you're expecting on the server side (name, email, and password).

On the client side, you would use JavaScript to handle the form submission and send the data to the server. Here's a simple example using vanilla JavaScript:

```js 
// JavaScript in your frontend
document.getElementById('registrationForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Now you can send these values to the server using fetch or another AJAX method
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });

  // Handle the server response as needed
  const result = await response.json();
  console.log(result);
});

```

The event.preventDefault() prevents the form from being submitted the traditional way, allowing you to handle the submission with JavaScript.
The values of name, email, and password are obtained from the input fields.
The fetch function is used to make a POST request to the server, sending the data as JSON in the request body.
This is a basic example, and in a real-world scenario, you would likely want to add more error handling and validation. Additionally, you may want to use a frontend framework or library like React, Angular, or Vue.js to manage state and handle form submissions more efficiently.

`code`

```js
const userModel = require("../Models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const validator = require('validator');

//From frontend we would be getting req (client to sever), we can access params.
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).json("User with the given email already exists!");

    // Check if any of the required fields is empty
    if (!name || !email || !password) return res.status(400).json("All fields are required!");

    // Validate the data
    if (!validator.isEmail(email)) return res.status(400).json("Email must be a valid email");
    if (!validator.isStrongPassword(password)) return res.status(400).json("Password must be a strong password");

    // Create a new user instance
    user = new userModel({ name, email, password });

    // Generate a salt and hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save the user to the database
    await user.save();
}

module.exports = { registerUser }

```

Check for Existing User: It queries the database to check if a user with the provided email already exists. If so, it returns a 400 status with an error message.

Check for Empty Fields: It ensures that the required fields (name, email, password) are not empty. If any of them is empty, it returns a 400 status with an appropriate error message.

Data Validation: It uses the validator library to validate the email format and password strength. If the email is not a valid email or the password is not strong, it returns a 400 status with the corresponding error message.
`we would have 2 vaidations frontend and backend. And backend validation is more important`

User Instance Creation: It creates a new instance of the userModel with the provided name, email, and password.

Password Hashing: It generates a salt and hashes the user's password using bcrypt before saving it to the database.

Save User to Database: It saves the user instance, including the hashed password, to the database.

Exports the Function: The function is exported for use in other parts of the application.


`userModel.findOne({email}) ?`

userModel: This is an instance of a Mongoose model. In Mongoose, models are used to interact with MongoDB collections. The userModel is specifically designed to interact with the "users" collection in your MongoDB database. It's based on the schema you've defined for a user.

findOne({ email }): This method is used to find a single document in the MongoDB collection that matches the specified query criteria. In this case, you're searching for a user where the "email" field matches the provided email address ({ email } is a shorthand for { email: email } when the property name and variable name are the same).


# Mongoose Model Methods

1. **`save()`:**
   Saves a document instance to the database. This method is used to persist new or modified documents.

2. **`findOne(conditions)`:**
   Finds a single document in the collection that matches the specified conditions.

3. **`findById(id)`:**
   Finds a single document by its `_id` field.

4. **`updateOne(conditions, update)`:**
   Updates a single document that matches the specified conditions.

5. **`deleteOne(conditions)`:**
   Deletes a single document that matches the specified conditions.

6. **`find(conditions)`:**
   Finds all documents in the collection that match the specified conditions.

7. **`findOneAndUpdate(conditions, update)`:**
   Finds a single document that matches the specified conditions and updates it.

8. **`countDocuments(conditions)`:**
   Counts the number of documents in the collection that match the specified conditions.
