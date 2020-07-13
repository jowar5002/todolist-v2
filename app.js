//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// Mongoose started -  connection
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useNewUrlParser: true
});

// Build Schema
const itemsSchema = {
  name: String,
};

// build model
const Item = mongoose.model("Item", itemsSchema);

// Add item1
const item1 = new Item({
  name: "Welcome to your todo list"
});

// Add item2
const item2 = new Item({
  name: "hit the + button to add new item"
});
// Add item3
const item3 = new Item({
  name: "<--- hit this to del;ete an item"
});

// Add all items into array
const defaultItems = [item1, item2, item3];

// Insert all items into database
// Item.insertMany(defaultItems, function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(" Success");
//   }
// });

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

app.get("/", function(req, res) {
  Item.find({}, function(err, foundItems) {

    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfulyl saved default items in DB");
        }
        res.redirect("/");
      })
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: foundItems
      })
    }
  });
});


app.post("/", function(req, res) {

  const item = req.body.newItem;

  // if (req.body.list === "Work") {
  //   workItems.push(item);
  //   res.redirect("/work");
  // } else {
  //   items.push(item);
  //   res.redirect("/");
  // }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
