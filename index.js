const express = require("express");
const path = require("path");
const connectToMongo = require("./connect");
const { handleURLRedirect } = require("./controllers/url")
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");


const app = express();
const PORT = 8000;

connectToMongo("mongodb://127.0.0.1:27017/urlShortener").then(console.log("mongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/url", urlRoute); 
app.use("/", staticRoute);

app.get("/url/:shortId", handleURLRedirect);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}/`));
