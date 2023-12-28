//* Create an endpoint which will send genre as response with CRUD operations [COMPLETED ✅]
//* genre list we gonna use by default
// import Genres from "./Genres";
// const genres = require("./Genres");
const express = require("express");
// const log = require("../Custom Middleware/logger");
// replacement for console.log() which trigger in specific situation specified by DEBUG env variable
//* $env:DEBUG="app:startup"
const startupDebugger = require("debug")("app:startup");
//* $env:DEBUG="app:db"
const dbDebugger = require("debug")("app:db");
//*
//*To trigger both $env:DEBUG="app:startup,app:db"
//*To trigger all in particular namespace,here "app" $env:DEBUG="app:*"

const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
//* routes
const genres = require("./routes/genres");
const home = require("./routes/home");
const app = express();
//* THis tells that for any route that starts with '/api/genres', use genres router
// now we can get rid of all '/api/genres' endopint in genres router file
app.use("/api/genres", genres);
app.use("/", home);
//* Loading Middlewares
app.use(express.json());
//*custom middleware  
// app.use(log);

//*Built-in Middleware
//* 1]
//it converts the string queries of url(key=value&key=value....) into JSON and populates it in re.body 😀
//now we can pass our key values (name) in body x-www-form-urlencoded
//{extended:true} is passed as parameter bcoz this body parser in depricated neef to be extended
//extended denotes that url can have large number of keys & values and with wide number of characters (lengthy URL)
app.use(express.urlencoded({ extended: true })); //for our app..its optional

//* 2]
//it treats the provided directory as source of static content (media files html codes etc)
//and can be served from the root(url) of our app
//eg : if my image is in some very nested folder, using this MW, I can access it like localhost:3000/file_name
app.use(express.static("../public"));

//* 3]
//Improved security in http request by adding header files
app.use(helmet());

//* 4]
//logs the informetion about request and responses
//* setting it only in development mode
//*NOTE: We have set NODE_ENV=development for now
// const mode = process.env.NODE_ENV; //this technique returns undefined in Dev mode and true in prod mode
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("only in startup mode ");
}

//*Setting view engine of express to pug
app.set("view engine", "pug");

dbDebugger("db logging...");

//* using config package
console.log("Application name:" + config.get("name"));
console.log("Server mail:" + config.get("mail.host"));

//* Project part

//*listen to a port
app.listen(3000);
