const mongoose = require("mongoose");
const Product = mongoose.model("Product");

exports.findAll = function (req, res) {
  Product.find({}, function (err, results) {
    return res.send(results);
  });
};

exports.findById = (req, res) => {
  const id = req.params.id;
  Product.findOne({ _id: id }, (err, json) => {
    if (err) return console.log(err);
    return res.send(json);
  });
};

exports.add = function (req, res) {
  Product.create(req.body, function (err, product) {
    if (err) return console.log(err);
    return res.send(product);
  });
};

exports.update = function (req, res) {
  console.log(req.body);
  const id = req.params.id;
  Product.findByIdAndUpdate(id, req.body, { new: true }, (err, response) => {
    if (err) return console.log(err);
    res.send(response);
  });
};

exports.delete = function (req, res) {
  let id = req.params.id;
  Product.deleteOne({ _id: id }, () => {
    // return res.sendStatus(202);
    return {};
  });
};

exports.upload = function (req, res) {
  console.log(req.files);
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let file = req.files.file;
  file.mv(`./public/img/${req.body.filename}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ file: `public/img/${req.body.filename}` });
    console.log(" res.json", res.json);
  });
};

exports.import = function (req, res) {
  Product.create(
    {
      title: "Guitar",
      description: "Fender instrument",
      image: "guitar.jpg",
      price: "1000",
    },
    {
      title: "Playstation",
      description: "Sony console",
      image: "playstation.jpg",
      price: "200",
    },

    {
      title: "Xbox",
      description: "Microsoft console",
      image: "xbox.jpg",
      price: "700",
    },
    function (err) {
      if (err) return console.log(err);
      return res.sendStatus(201);
    }
  );
};

exports.killall = function (req, res) {
  Product.deleteMany({}, (err) => {
    if (err) return console.log(err);
    return res.sendStatus(202);
  });
};
