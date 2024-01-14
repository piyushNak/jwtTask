
## Node.js Application with JWT
Step 1: [Download the Node.js](https://nodejs.org/en/download) Select the installer according to your operating system and environment

![App Screenshot](https://www.vrogue.co/top-featureds-phoenixnap.com/kb/wp-content/uploads/2021/04/donwload-nodejs-installer-windows-1.png)

Step 2:  [Run the Node.js installer](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) Accept the license agreement. You can leave other settings as default. The installer will install Node.js and prompt you to click on the finish button.

![App Screenshot](https://media.geeksforgeeks.org/wp-content/uploads/20190311160231/Capture42.png)


Step 3:  Verify that Node.js was properly installed by opening the command prompt and typing this command: node --version

![App Screenshot](https://dirask.com/static/bucket/1631111981572-ZBA8EXVQ5K--image.png)

Step 4: Install a text editor of your choice. We are using  [Visual Studio](https://code.visualstudio.com/) Code in this tutorial, but you can use other editors, such as Atom or Sublime Text, if you are more comfortable with those.

![App Screenshot](https://ashutoshtripathicom.files.wordpress.com/2021/04/image-15.png?w=960)


Step:5 [Download Postman](https://www.postman.com/downloads/) We are using the Postman application to check the output of the application. We send and receive API calls and check if the JWT is working correctly.
To download the Postman application, go to its [official website.](https://www.postman.com/downloads/)

![App Screenshot](https://www.c-sharpcorner.com/article/how-to-download-and-install-postman-on-your-pc/Images/Postman%20Image%20-%20Step%202new.png)


Step 6: Project Setup

6.1. Create an empty folder and name it mongodb_crud.

6.2. Open the newly created directory in VS Code and (inside the terminal) type npm init to initialize the project. Press the Enter key to leave the default settings as they are.
We are importing a couple of modules that we will be needing in the application: express, ejs, and jsonwebtoken (jwt).


To deploy this project run

```bash
  npm install express ejs jsonwebtoken
```


Create a file called app.js in the project directory. This is the only file that we create and work on in this project in order to keep things simple

so the project directory is super simple.

![App Screenshot](https://media.geeksforgeeks.org/wp-content/uploads/20220401181023/filestructure-300x228.png)


### Let’s Code in index.js file

```bash
const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

//This request for testing server is running
app.get("/api", (req, res) => {
  res.json({
    message: "Hey, there! Welcome to this API service"
  });
});

// This request generates the Token
app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "john",
    email: "john@gmail.com"
  };
  jwt.sign({ user: user }, "rnw", (err, token) => {
    res.json({
      token
    });
  });
});

//This request verify the Token
app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "POST created...",
        authData
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}
app.listen(3000, () => console.log("Server started"));

```

#### Steps to Run the Server:

```bash
node index.js
```

#### Output: Send Requests and Get Output

#### POST Request:

```bash
http://localhost:3000/ api/login
```

#### POST Response:

```bash
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJ0aW1lIjoiTW9uIEphbiAxOCAyMDIxIDE2OjM
2OjU3IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBU 
aW1lKSIsInVzZXJJZCI6MTIsImlhdCI6MTYxMDk2
ODAxN30.QmWFjXhP6YtbzDAHlcE7mDMyXIdnTv1c9xOB
CakNZ94aW1lKSIsInVzZXJJZCI6MTIsImlhdCI6MT
YxMDk2ODAxN30.QmWFjXhP6YtbzDAHlcE7mDMyXIdnTv1c
9xOBCakNZ94	
```

####	POST Request:

```bash
http://localhost:3000/api/posts 

```

#### POST Response:

```bash
Successfully Verified
```






