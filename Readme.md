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

<hr>

Lets Create JWT Token

```js 
const userModel = require("../Models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const validator = require('validator');


const createJWTToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET_KEY;

    return jwt.sign(
        { _id },
        jwtKey,
        { expiresIn: '3d' }
    );
}

//From frontend we would be getting req (client to sever), we can access params.
const registerUser = async (req, res) => {

    try {

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
        const token = createJWTToken(user._id);

        res.status(200).json({ _id: user._id, name, email, token })
    } catch (error) {
        console.log("Error during creating User : ", error);
        res.status(500).json(error)
    }
}

module.exports = { registerUser }

```

`res.status(200).json({_id : user._id, name, email, token})  y do i need to send token?`

Sending a token as part of the response is a common practice in authentication mechanisms, particularly when a user registers or logs in. Here are some reasons why you might want to include the token in the response:

Authentication and Authorization:

The token serves as a form of authentication. Once the user successfully registers, the token can be used for subsequent requests to authenticate and authorize the user. This is commonly done by including the token in the headers of future requests.
Stateless Communication:

Tokens allow for stateless communication between the client and the server. Instead of relying on server-side sessions to track user state, the token contains the necessary information to verify the user's identity.
Reduced Server Load:

With tokens, the server doesn't need to store user sessions, which can reduce the load on the server, especially in a distributed or stateless architecture.
Secure Information Exchange:

Tokens can be designed to contain specific information about the user (claims) and can be encrypted to ensure the integrity and confidentiality of the information.
Consistent User Experience:

Including the token in the response allows the client to store it locally (e.g., in a cookie or local storage) and automatically include it in subsequent requests. This helps maintain a consistent user experience without requiring the user to reauthenticate with every request.

`but we arent showing this token to actual user right? so in realworld and all the application,token decides whether the user is authenticated or should be kept as authenticated unless token expires correct?`

Yes, that's correct. In many real-world applications, tokens play a crucial role in determining whether a user is authenticated. Here's a breakdown of how it typically works:

Authentication:

When a user logs in or is otherwise authenticated, the server generates a token.
This token is then sent to the client, and the client stores it securely (e.g., in a cookie, local storage, or another secure storage mechanism).
Authorization:

For each subsequent request to a protected resource or action, the client includes the token in the request headers.
The server verifies the token to determine the user's identity and whether they have the necessary permissions (authorization) to perform the requested action.
Token Expiration:

Tokens often have an expiration time (specified in the token itself). If a token expires, the user is required to reauthenticate by obtaining a new token.
Secure Communication:

The use of tokens allows for stateless and secure communication between the client and server. The server doesn't need to store session information, making it suitable for scalable and distributed architectures.
Revocation and Renewal:

In some systems, there may be mechanisms for token revocation (e.g., if a user logs out or if a token is compromised). Additionally, some systems implement token renewal to provide a seamless experience for the user without requiring frequent logins.
By relying on tokens, applications can implement secure and scalable authentication and authorization mechanisms, and they can also benefit from the advantages of stateless communication. Keep in mind that the specifics may vary based on the authentication and authorization strategy chosen for a particular application.


<hr>

Lets create loginUser

its simple

```js 
const userModel = require("../Models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const validator = require('validator');


const createJWTToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET_KEY;

    return jwt.sign(
        { _id },
        jwtKey,
        { expiresIn: '3d' }
    );
}

//From frontend we would be getting req (client to sever), we can access params.
const registerUser = async (req, res) => {
    try {
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
        const token = createJWTToken(user._id);

        res.status(200).json({ _id: user._id, name, email, token })
    } catch (error) {
        console.log("Error during creating User : ", error);
        res.status(500).json(error)
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (!user) return res.status(400).json("Invalid user or password!1");

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return res.status(400).json("Invalid user or password!2");

        const token = createJWTToken(user._id);

        res.status(200).json({ _id: user._id, name: user.name, email, token });
    } catch (error) {
        console.log("Error during Login User : ", error);
        res.status(500).json(error)
    }

}

module.exports = { registerUser, loginUser }

```
Also changes made in useRoute.js

```js 
//userRoute.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../Controllers/userController');

router.post("/register", registerUser);
router.post("/login", loginUser)

module.exports = router;

```


Now lets work on getting single and all user which will be helpful for this project requirement frontend.

```js
//userRoute.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, findUser, getUsers } = require('../Controllers/userController');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/findUser/:userId", findUser);
router.get("/getUsers", getUsers);

module.exports = router;

```

```js 
const userModel = require("../Models/userModel");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const validator = require('validator');


const createJWTToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET_KEY;

    return jwt.sign(
        { _id },
        jwtKey,
        { expiresIn: '3d' }
    );
}

//From frontend we would be getting req (client to sever), we can access params.
const registerUser = async (req, res) => {

    try {

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
        const token = createJWTToken(user._id);

        res.status(200).json({ _id: user._id, name, email, token })
    } catch (error) {
        console.log("Error during creating User : ", error);
        res.status(500).json(error)
    }
}


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await userModel.findOne({ email });

        if (!user) return res.status(400).json("Invalid user or password!1");

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) return res.status(400).json("Invalid user or password!2");

        const token = createJWTToken(user._id);

        res.status(200).json({ _id: user._id, name: user.name, email, token });
    } catch (error) {
        console.log("Error during Login User : ", error);
        res.status(500).json(error)
    }

}


const findUser = async (req, res) => {

    try {
        const userId = req.params.userId;

        const user = await userModel.findById(userId);
        if (!user) return res.status(200).json("cannot find user")
        return res.status(200).json(user);

    } catch (error) {
        console.log("Error during Finding User : ", error);
        res.status(500).json(error)
    }
}


const getUsers = async (req, res) => {

    try {
        const users = await userModel.find();
        if (!users) return res.status(200).json("cannot get all users")
        return res.status(200).json(users);

    } catch (error) {
        console.log("Error during getting all Users : ", error);
        res.status(500).json(error)
    }
}

module.exports = { registerUser, loginUser, findUser, getUsers }

```

<hr>


## Client Side coding

`npm create vite@latest . `


`npm i react-router-dom`

react-router-dom
react-router-dom is a library for implementing routing in React applications. Routing allows you to navigate between different components in your application based on the URL. This library is particularly useful for creating single-page applications (SPAs) where you want to update the content of the page without a full page reload.


```js
//App.jsx

import { Routes, Route, Navigate } from 'react-router-dom';
import { Chat } from './pages/Chat';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Chat />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes >
    </>
  )
}

export default App


```
Explanation:
Routes and Route Components:

The Routes component is a container for multiple Route components.
Route components define the mapping between a URL path and a React component to render.
In your code, you have three routes:
'/' path maps to the Chat component.
'/login' path maps to the Login component.
'/register' path maps to the Register component.
Navigate Component:

The Navigate component is used to perform client-side navigation. In this case, if the user visits any route that is not explicitly defined ('*'), they will be redirected to the '/' (Chat) route.

```js 
// main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom' //Import


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> //Imp change to wrap it 
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

```
Explanation:
React.StrictMode:

Wraps your entire app in strict mode. It helps catch common bugs and can help you write more reliable components.
BrowserRouter:

Provides the routing infrastructure for your app. It enables the use of the <Routes> and <Route> components in your application.
ReactDOM.createRoot:

It is used to create a root for the React application. It's part of the new concurrent rendering API introduced in React.
React Router-DOM:
React Router-DOM:

react-router-dom is a library for declarative routing in React applications.
It enables navigation among views of various components in a React Application, allows changing the browser URL, and keeps UI in sync with the URL.
Components:

<BrowserRouter>: Provides the context for routing in your application.
<Routes>: Acts as a switch statement for rendering different components based on the current URL.
<Route>: Defines a route mapping between a URL path and a component to render.
<Navigate>: Used for navigation and redirection.
This setup allows you to create a multi-page React application with different components rendered based on the URL. The react-router-dom library helps manage client-side navigation and keeps your UI in sync with the URL.


Bootstrap config -pending to write

Added container 

```js 
import { Routes, Route, Navigate } from 'react-router-dom';
import { Chat } from './pages/Chat';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css'; //Import
import { Container } from 'react-bootstrap' //Import

function App() {
  return (
    <>
      <Container> //Changes made
        <Routes>
          <Route path='/' element={<Chat />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes >
      </Container>
    </>
  )
}

export default App

```
NavBar

```js 
import React from 'react'
import { Container, Nav, Navbar, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (
        <>
            <Navbar className="mb-4 myCustomNavbar">
                <Container>
                    <Link to='/' className='text-decoration-none'>
                        <h2 className='pulseChatHeading'>
                            PulseChat
                        </h2>
                    </Link>
                    <span>Welcome, Manish Singh! 😎</span>
                    <Nav>
                        <Stack direction='horizontal' gap={3}>
                            <Link to='/login' className='text-decoration-none'>
                                <h6 className='pulseChatHeading '>
                                    Login
                                </h6>
                            </Link>
                            <Link to='/register' className='text-decoration-none'>
                                <h6 className='pulseChatHeading'>
                                    Register
                                </h6>
                            </Link>
                        </Stack>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

```

Import Statements:

react-bootstrap: Importing components from the React Bootstrap library for styling and layout.
Link: From react-router-dom for navigation within your React app.

Navbar Structure:
Navbar: The main navigation container.
Container: Wraps the content inside the Navbar to control the width and provide spacing.

Logo (PulseChat):
Link to='/': Creates a link to the home page. The text-decoration-none class removes the default underline.
h2 className='pulseChatHeading': Heading with a class for styling. You can define styles for pulseChatHeading in your CSS.


Navigation Links:
Nav: The container for navigation links.
Stack direction='horizontal' gap={3}: A horizontal stack to arrange login and register links with a gap of 3.

Login and Register Links:
Link to='/login': Creates a link to the login page with a styled heading.
Link to='/register': Creates a link to the register page with a styled heading.


Lets start working on crfeating registration Page,login Page

```js 
//Register.jsx
import React, { useEffect } from "react";
import { Form, Button, Stack, Row, Col } from "react-bootstrap";
import backgroundImage from '../assets/messageBG.jpg';

export const Register = () => {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'contain';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'right';
    document.body.style.backgroundColor = '#ffff';
    return () => {
         document.body.style = '';
    //   document.body.style.backgroundImage = '';
    //   document.body.style.backgroundSize = '';
    //   document.body.style.backgroundRepeat = '';
    //   document.body.style.backgroundPosition = '';
    //   document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <Form className="mt-md-5">
      <Row className="justify-content-md-left">
        <Col className="form" xs={12} md={6}>
          <Stack gap={2} className="mx-auto">
            <h2 className="p-md-4 text-center">Register</h2>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" />
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" />
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
            <Button className="mt-3 mb-3" variant="primary" type="submit">
              Register
            </Button>
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

//Without Responsive

// import React, { useEffect } from "react"
// import { Container, Card, Form, Button, Alert, Stack, Row, Col } from "react-bootstrap"
// import backgroundImage from '../assets/messageBG.jpg'

// export const Register = () => {

//   useEffect(() => {
//     document.body.style.backgroundImage = `url(${backgroundImage})`;
//     document.body.style.backgroundSize = 'contain';
//     document.body.style.backgroundRepeat = 'no-repeat';
//     document.body.style.backgroundPosition = 'right';
//     document.body.style.backgroundColor = '#ffff';
//     return () => {
//       document.body.style.backgroundImage = '';
//       document.body.style.backgroundSize = '';
//       document.body.style.backgroundRepeat = '';
//       document.body.style.backgroundPosition = '';
//       document.body.style.backgroundColor = '#ffff';
//     };
//   }, [])


//   return (
//     <>
//       <Form className="mt-5">
//         <Row style={{ justifyContent: "left" }}>
//           <Col className="form" xs={6}>
//             <Stack gap={2}>
//               <h2 style={{ padding: '20px', textAlign: "center" }}>Register</h2>
//               <Form.Label >Name</Form.Label>
//               <Form.Control type="text" placeholder="Name"></Form.Control>
//               <Form.Label>Email</Form.Label>
//               <Form.Control type="email" placeholder="Email"></Form.Control>
//               <Form.Label>Password</Form.Label>
//               <Form.Control type="password" placeholder="Password"></Form.Control>
//               <Button className="mt-3 mb-3" variant="primary" type="submit">Register</Button>
//               {/* <Alert variant="danger"><p>An error occured!</p></Alert> */}
//             </Stack>
//           </Col>
//         </Row>
//       </Form>
//     </>
//   )
// }

```


```js 
//Login

import React, { useEffect } from "react"
import { Container, Card, Form, Button, Alert, Stack, Row, Col } from "react-bootstrap"
import backgroundImage from '../assets/messageBG2.jpg'

export const Login = () => {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'contain';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'left';
    document.body.style.backgroundColor = '#ffff';
    return () => {
      document.body.style = '';
    };
  }, [])


  return (
    <>
      <Form className="mt-5">
        <Row style={{ justifyContent: "right" }}>
          <Col className="form" xs={6} >
            <Stack gap={2}>
              <h2 style={{ padding: '20px', textAlign: "center" }}>Login</h2>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email"></Form.Control>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password"></Form.Control>
              <Button className="mt-3 mb-3" variant="primary" type="submit">Login</Button>
              {/* <Alert variant="danger"><p>An error occured!</p></Alert> */}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  )
}

```


Now lets create userAuthContext to pass the data, required by the components

Create Folder in src as context and file name as AuthContext.jsx

```js 
//AuthContext.jsx

import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({
        name : "Charles",
    });


    return (
        <AuthContext.Provider value = {{user,}}>
            {children}
        </AuthContext.Provider>
    );
};


```

```js 
//main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

```

The Context API in React is a way to manage the state of your application and provide that state to all components without having to pass it down manually through props at every level. Here's a breakdown of the steps involved in using the Context API:

Create a Context:
Use createContext from react to create a new context. This AuthContext will be used to provide and consume the authentication state.

Create a Context Provider:
Create a component that will serve as the provider for the context. This component will hold the state you want to share.In this example, AuthContextProvider is a wrapper component that provides the authentication state (user) to its children.

Wrap Your App with the Context Provider:
In your main index.js or App.js file, wrap your entire application or the relevant part of it with the context provider.
This makes the authentication context available to all components within the AuthContextProvider.

Consume the Context:
In any component that needs access to the authentication state, use the useContext hook.

```js 
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const SomeComponent = () => {
    const { user } = useContext(AuthContext);

    // Now, 'user' contains the authentication state.
    // Use it as needed.
};

```
By using the useContext hook, you can access the state provided by the AuthContextProvider in any component within its subtree.

The Context API is useful for managing global state, like authentication, theming, or any data that needs to be shared across many components. It helps avoid prop drilling and makes the state accessible in a more elegant and efficient way.


Now in Authcontext we need to have data, and we would be getting data only if user have registered and save it to mongoDb and extract it


firstly I need to send the skeleton of data that will be passed to the Register.jsx,
We will define this skeleton in AuthContext.jsx as UseSatate,
Also we will be having set to set the data.
Hence we need to pass the set to Register.jsx, we can pass it as callbackFn and get the info.

```js 
//AuthContext.jsx
import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    //Skeleton to be passed to Register.jsx and get the info and setIt.
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, [])


    return (
        <AuthContext.Provider value={{ user, registerInfo, updateRegisterInfo }}>
            {children}
        </AuthContext.Provider>
    );
};


```


```js 
import React, { useContext, useEffect } from "react";
import { Form, Button, Stack, Row, Col } from "react-bootstrap";
import backgroundImage from '../assets/messageBG.jpg';
import { AuthContext } from "../context/AuthContext";

export const Register = () => {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'contain';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'right';
    document.body.style.backgroundColor = '#ffff';
    return () => {
      document.body.style = '';
    };
  }, []);

  const { registerInfo, updateRegisterInfo } = useContext(AuthContext);
  console.log(registerInfo)

  return (
    <Form className="mt-md-5">
      <Row className="justify-content-md-left">
        <Col className="form" xs={12} md={6}>
          <Stack gap={2} className="mx-auto">
            <h2 className="p-md-4 text-center">Register</h2>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })} />
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })} />
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })} />
            <Button className="mt-3 mb-3" variant="primary" type="submit">
              Register
            </Button>
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

```


Functionality changes

when click on submit we need a function to registerUser.
fn is defined in AuthContext, should make an fn call defined in service.js in Util Folder.

Register Button Clicked -> AuthContext fn(Triggered) -> service.js fn(Triggered) -> Makes an api call to Backend and get the response(Ok and Not Ok) and sends back the data to the called components.


Start with service.js -> AuthContext -> registerUser.
Remember there are other mis things to be done like declaring some variables,making use of useState.

```js 
//services.js
export const baseUrl = "http://localhost:5002/api";

export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body,
    });

    if (!response.ok) {
        let message;

        if (data?.message) {
            message = data.message //our custom message thats defined in server folder(Backend)
        } else {
            message = data;
        }

        return { error: true, message };
    }

    const data = await response.json();

    return data;
}
```

Now lets make change in AuthContext

```js 
//AuthContext.jsx
import { createContext, useCallback, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);

    //Skeleton to be passed to Register.jsx and get the info and setIt.
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, [])

    const registerUser = useCallback(async (e) => {
        e.preventDefault();

        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(`${baseUrl}/user/register`, JSON.stringify(registerInfo));

        setIsRegisterLoading(false);

        if (response.error) {
            return setRegisterError(response)
        }

        localStorage.setItem('User', JSON.stringify(response))
        setUser(response);
    }, [registerInfo])

    return (
        <AuthContext.Provider value={{ user, registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

```


```js 
//Register.jsx

import React, { useContext, useEffect } from "react";
import { Form, Button, Stack, Row, Col, Alert } from "react-bootstrap";
import backgroundImage from '../assets/messageBG.jpg';
import { AuthContext } from "../context/AuthContext";

export const Register = () => {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'contain';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'right';
    document.body.style.backgroundColor = '#ffff';
    return () => {
      document.body.style = '';
    };
  }, []);

  const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading } = useContext(AuthContext);
  console.log(registerInfo)

  return (
    <Form className="mt-md-5" onSubmit={registerUser}>
      <Row className="justify-content-md-left">
        <Col className="form" xs={12} md={6}>
          <Stack gap={2} className="mx-auto">
            <h2 className="p-md-4 text-center">Register</h2>
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={(e) => updateRegisterInfo({ ...registerInfo, name: e.target.value })} />
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })} />
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })} />
            <Button className="mt-3 mb-3" variant="primary" type="submit">
              {isRegisterLoading ? 'creating your account...' : "Register"}
            </Button>
            {registerError?.error && <Alert variant="danger"><p>{registerError?.message}</p></Alert>}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

```

Now once registered we need to keep it as logged in even if page refreshes.
we can achieve this by useEffect in AuthContext.jsx

```js 
//AuthContext.jsx
import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);

    //Skeleton to be passed to Register.jsx and get the info and setIt.
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    console.log("Userr", user); //Output : {_id: '655f48ad48be6b7c927ea038', name: 'Ram', email: 'ram@gmail.com', token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N…U0MX0.OsoGTKvZo6cUT-lTAHQJtj1wlBYrk5UTj1KnISdxQQc'}

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    useEffect(() => {
        const user = localStorage.getItem("User");

        setUser(JSON.parse(user));
    }, []);

    const registerUser = useCallback(async (e) => {
        e.preventDefault();

        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(`${baseUrl}/user/register`, JSON.stringify(registerInfo));

        setIsRegisterLoading(false);

        if (response.error) {
            return setRegisterError(response)
        }

        localStorage.setItem('User', JSON.stringify(response))
        setUser(response);
    }, [registerInfo])

    return (
        <AuthContext.Provider value={{ user, registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading }}>
            {children}
        </AuthContext.Provider>
    );
};


```


Now if user Data exist,we need to Route it to chat Page.Its simple can be done by conditional rendering in app.jsx

```js 
import { Routes, Route, Navigate } from 'react-router-dom';
import { Chat } from './pages/Chat';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import { NavBar } from './components/NavBar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext)

  return (
    <>
      <NavBar></NavBar>
      <Container>
        <Routes>
          <Route path='/' element={user ? <Chat /> : <Login />} />
          <Route path='/login' element={user ? <Chat /> : <Login />} />
          <Route path='/register' element={user ? <Chat /> : <Register />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes >
      </Container>
    </>
  )
}

export default App

```

Also made code change in NavBar.jsx
When user logged in, we need to see 'Logout' instead of 'Login' and 'Register'
Also we dont need to render Span


```js 
import React, { useContext } from 'react'
import { Container, Nav, Navbar, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import pulseLogo from '../assets/pulseLogo.png'
import { AuthContext } from '../context/AuthContext';

export const NavBar = () => {
    const { user, logoutUser } = useContext(AuthContext);

    return (
        <>
            <Navbar border="success" className="mb-4 myCustomNavbar">
                <Container>
                    <Link to='/' className='text-decoration-none'>
                        <h2 className='navBarHeading'>
                            PulseChat
                            <img src={pulseLogo} style={{ width: '30px' }}></img>
                        </h2>
                    </Link>
                    {user && <span>Welcome, {user?.name}! 😎</span>}
                    <Nav>
                        <Stack direction='horizontal' gap={3}>
                            {user && (<>
                                <Link onClick={() => logoutUser()} to='/login' className='text-decoration-none'>
                                    <h6 className='navBarHeading '>
                                        Logout
                                    </h6>
                                </Link>
                            </>)}
                            {!user && (
                                <>
                                    <Link to='/login' className='text-decoration-none'>
                                        <h6 className='navBarHeading '>
                                            Login
                                        </h6>
                                    </Link>
                                    <Link to='/register' className='text-decoration-none'>
                                        <h6 className='navBarHeading'>
                                            Register
                                        </h6>
                                    </Link>
                                </>
                            )}
                        </Stack>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

```


Similar changes done for LoginUser

```js 
//AuthContext.jsx
import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // ***************************************************************
    //Register
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);

    //Skeleton to be passed to Register.jsx and get the info and setIt.
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    console.log("Userr", user);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const registerUser = useCallback(async (e) => {
        e.preventDefault();

        setIsRegisterLoading(true);
        setRegisterError(null);

        const response = await postRequest(`${baseUrl}/user/register`, JSON.stringify(registerInfo));

        setIsRegisterLoading(false);

        if (response.error) {
            return setRegisterError(response)
        }

        localStorage.setItem('User', JSON.stringify(response))
        setUser(response);
    }, [registerInfo]);


    // ***************************************************************
    //Login
    //Skeleton to be passed to Login.jsx and get the info and setIt.
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);


    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    });


    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const loginUser = useCallback((async (e) => {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);

        const response = await postRequest(`${baseUrl}/user/login`, JSON.stringify(loginInfo));

        setIsLoginLoading(false);

        if (response.error) {
            return setLoginError(response)
        }

        localStorage.setItem('User', JSON.stringify(response))
        setUser(response)

    }), [loginInfo])



    //*****************************************************
    // LocalStorage 

    useEffect(() => {
        const user = localStorage.getItem("User");
        setUser(JSON.parse(user));
    }, []);



    //*****************************************************
    // Logout
    const logoutUser = () => {
        localStorage.removeItem("User");
        setUser(null);
        setRegisterInfo(register);
        setLoginInfo(login);
    }
    // *********************************************************************************


    console.log("registerInfo", registerInfo);
    console.log("loginInfo", loginInfo);

    return (
        <AuthContext.Provider value={{ user, registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading, logoutUser, loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading }}>
            {children}
        </AuthContext.Provider>
    );
};


```

```js
//Login

import React, { useContext, useEffect } from "react"
import { Form, Button, Alert, Stack, Row, Col } from "react-bootstrap"
import backgroundImage from '../assets/messageBG2.jpg'
import { AuthContext } from "../context/AuthContext";

export const Login = () => {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${backgroundImage})`;
    document.body.style.backgroundSize = 'contain';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'left';
    document.body.style.backgroundColor = '#ffff';
    return () => {
      document.body.style = '';
    };
  }, []);

  const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } = useContext(AuthContext)


  return (
    <>
      <Form className="mt-5" onSubmit={loginUser}>
        <Row style={{ justifyContent: "right" }}>
          <Col className="form" xs={6} >
            <Stack gap={2}>
              <h2 style={{ padding: '20px', textAlign: "center" }}>Login</h2>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })}></Form.Control>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}></Form.Control>
              <Button className="mt-3 mb-3" variant="primary" type="submit">{isLoginLoading ? "Logging in.." : "Login"}</Button>
              {loginError && <Alert variant="danger"><p>{loginError?.message}</p></Alert>}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  )
}

```


Now we need to work on Main part that is Chat.

3 things in client side:
create Chat(new Chat)
getlistofChat in UI (stack)
findChat

![Alt text](image.png);



ServerSide changes:
need to create new Model for chat.

```js 
//chatModel.js

const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    members: Array,
}, {
    timeStamps: true
});


const chatModel = mongoose.model("chat", chatSchema);

module.exports = chatModel;

```

and in controller we need to have chatController that createschat.
//createChat
//getUserChats
//getChat

```js 
//chatController.js 
const chatModel = require('../Models/chatModel')

//createChat
//getUserChats
//getChat


const createChat = async (req, res) => {
    const { firstId, secondId } = req.body;
    try {

        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }
        });

        if (chat) return res.status(200).json(chat);

        const newChat = new chatModel({
            members: [firstId, secondId],
        });

        const response = await newChat.save();

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json(error);
    }
};



const getUserChats = async (req, res) => {
    const userId = req.params.userId;

    try {
        const chats = await chatModel.find({
            members: { $in: [userId] },
        })

        if (chats) return res.status(200).json(chats);


    } catch (error) {
        res.status(500).json(error);
    }
};



const getChat = async (req, res) => {
    const { firstId, secondId } = req.params;

    try {
        const chat = await chatModel.findOne({
            members: { $all: [firstId, secondId] }
        });

        res.status(200).json(chat);

    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports = { createChat, getUserChats, getChat }
```


```js 
//chatRoutes.js

const express = require("express");
const router = express.Router();
const { createChat, getUserChats, getChat } = require("../Controllers/chatController");


router.post("/", createChat);
router.get("/:userId", getUserChats);
router.get("/get/:firstId/:secondId", getChat);

module.exports = router;
```

```js 
//server.js
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
const userRouter = require("./Routes/userRoute.js");
const chatRouter = require("./Routes/chatRoute.js");
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 5001;
const uri = process.env.ATLAS_URI;

app.use(cors());
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/chats", chatRouter); //This Change


app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
});


mongoose.connect(uri).then(() => {
    console.log("MongoDB connection established")
}).catch((error) => {
    console.log("MongoDb Connection Failed:" + error.message)
})

```


Now we need to work on messages
//createMesage
//getMessages

```js
// messageModel.js 
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    chatId: String,
    senderId: String,
    text: String
}, {
    timestamps: true
});

const messageModel = mongoose.model("message", messageSchema);

module.exports = messageModel;
```

```js
// messageController.js 
const messageModel = require("../Models/messageModel");

//createMesage
//getMessages

const createMessage = async (req, res) => {
    const { chatId, senderId, text } = req.body;

    try {
        const message = new messageModel({
            chatId, senderId, text
        });

        const response = await message.save();

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
};

const getMessages = async (req, res) => {
    const { chatId } = req.params;

    try {
        const message = await messageModel.find({ chatId });
        res.status(200).json(message);
    } catch (error) {
        res.status(500).json(error);
    }
};


module.exports = { createMessage, getMessages };
```


```js
// message.Route.js 

const express = require('express');
const router = express.Router();
const { createMessage, getMessages } = require('../Controllers/messageController');

router.post("/", createMessage);
router.get("/:chatId", getMessages);

module.exports = router;

```


```js
//index.js
app.use("/api/message", messageRouter); 
```



Now we can work on creating fetch api in client Folder services.js


```js 
//services.js
export const baseUrl = "http://localhost:5002/api";

export const postRequest = async (url, body) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body,
    });

    const data = await response.json();

    if (!response.ok) {
        let message;

        if (data?.message) {
            message = data.message //our custom message thats defined in server folder(Backend)
        } else {
            message = data;
        }

        return { error: true, message };
    }


    return data;
};


export const getRequest = async (url) => {

    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
        let message;

        if (data?.message) {
            message = data.message //our custom message thats defined in server folder(Backend)
        } else {
            message = data;
        }

        return { error: true, message };
    }


    return data;

}
```


```js 
//ChatContext.jsx
import { createContext, useEffect, useState } from 'react';
import { baseUrl, getRequest, postRequest } from '../utils/services';

export const ChatContext = createContext();


export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [userChatsError, setUserChatsError] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                isUserChatsLoading(true);
                setUserChatsError(null);

                const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

                isUserChatsLoading(false);

                if (response.error) {
                    return setUserChatsError(response);
                }

                localStorage.setItem('UserChats', JSON.stringify(response))
                setUserChats(response);
            }
        }

        getUserChats();
    }, [user])

    return (<>
        <ChatContext.Provider value={{ userChats, userChatsError, isUserChatsLoading }}>
            {children}
        </ChatContext.Provider>
    </>)

}


```

```JS 
//App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Chat } from './pages/Chat';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap'
import { NavBar } from './components/NavBar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';

function App() {
  const { user } = useContext(AuthContext)

  return (
    <>
      <ChatContextProvider user={user}> //Added this
        <NavBar></NavBar>
        <Container>
          <Routes>
            <Route path='/' element={user ? <Chat /> : <Login />} />
            <Route path='/login' element={user ? <Chat /> : <Login />} />
            <Route path='/register' element={user ? <Chat /> : <Register />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes >
        </Container>
      </ChatContextProvider>
    </>
  )
}

export default App

```


Now lets make list of chatUsers
```js 
//Chat.jsx

import React, { useContext } from "react"
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from "react-bootstrap"
import { UserChats } from "../components/Chats/UserChats";
import { AuthContext } from "../context/AuthContext";

export const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, userChatsError, isUserChatsLoading } = useContext(ChatContext);

  console.log(userChats, userChatsError, isUserChatsLoading);
  return (
    <>
      <Container>
        {userChats?.length < 1 ? null :
          <Stack direction="horizontal" gap={3} className="align-item-start">
            <Stack className="flex-grow-0 message-box pe-3" gap={3}>
              {isUserChatsLoading && <p>Loading Chats..</p>}
              {userChats?.map((chat, index) => {
                return (
                  <div key={index}>
                    <UserChats chat={chat} user={user}></UserChats>
                  </div>
                )
              })}
            </Stack>
            <p>chatBox</p>
          </Stack>
        }
      </Container>
    </>
  )
}

```

```js 
//UserChats.jsx

import React from 'react'

export const UserChats = ({chat, user}) => {
  return (
    <div>UserChats</div>
  )
}

```


So if youasaperson is logged-in,you would like to see other ids in list of userChats