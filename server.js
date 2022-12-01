const express = require("express");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");

if (process.env.NODE_ENV === "production") {
  require("dotenv").config();
}

console.log("process.env.NODE_ENV = ", process.env.NODE_ENV);

const productModel = require("./api/product.model");
const productControllers = require("./api/product.controllers");

const app = express();

const dataBaseURL = process.env.DATABASE || "mongodb://localhost:27017";

console.log("dataBaseURL::", dataBaseURL);

mongoose
  .connect(dataBaseURL, { useNewUrlParser: true })
  .then(() => console.log("MongoDb connected"))
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use("/favicon.ico", express.static("public/img/estore.svg"));
app.use(express.json({ extended: false })); // for parsing application/json
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded
app.use(fileUpload());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/api/products", productControllers.findAll);
app.get("/api/products/:id", productControllers.findById);
app.post("/api/products", productControllers.add);
app.put("/api/products/:id", productControllers.update);
app.delete("/api/products/:id", productControllers.delete);
app.get("/api/import", productControllers.import);
app.get("/api/deleteall", productControllers.deleteall);
app.post("/api/upload", productControllers.upload);

const PORT = process.env.PORT || 3456;

app.listen(PORT, () =>
  // console.log(`Server running at port ${PORT}. Process Env db: ${process.env.DATABASE});
  console.log(`Server running at port ${PORT}. Database backend: ${dataBaseURL});
`)
);
