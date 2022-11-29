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
      title: "AMERICAN VINTAGE II 1951 TELECASTER",
      description:
        "The Fender® American Vintage II series presents a remarkably accurate take on the revolutionary designs that altered the course of musical history. Built with period-accurate bodies, necks and hardware, premium finishes and meticulously voiced, year-specific pickups, each instrument captures the essence of authentic Fender craftsmanship and tone.",
      image: "guitar.jpg",
      price: "2,249.99",
    },
    {
      title: "Sony PlayStation Console",
      description:
        "Step up your gaming experience with the PlayStation 5. Enjoy lightning-fast loading with an ultra-high speed SSD, deep immersion with haptic feedback, adaptive triggers, and 3D audio. With Game Boost revisit your favorite content enhanced. Appreciate faster and smoother game rates. Play has no limits with the all-new generation of incredible PlayStation games.",
      image: "playstation.jpg",
      price: "499.99",
    },

    {
      title: "Microsoft Xbox Series S - Game console - QHD - HDR - 512 GB SSD",
      description:
        "With more dynamic worlds and faster load times, the all-digital Xbox Series S is the perfect value in gaming.",
      image: "xbox.jpg",
      price: "309.99",
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
