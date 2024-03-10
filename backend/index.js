const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://127.0.0.1:27017/crudapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Database started");
});

const dataSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const dataModel = mongoose.model("details", dataSchema);

app.get("/cruds", async (req, res) => {
  try {
    const item = await dataModel.find();
    res.json(item)
    res.status(201);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
});

app.post("/cruds", async (req, res) => {
  try {
    const { name, description } = req.body;
    const item = new dataModel({ name, description });
    await item.save();
    res.json(item);
    res.status(201)
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
});

app.put("/cruds/:id", async (req, res) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;
    const item = await dataModel.findById(id);

    if (!item) {
      res.status(404);
      res.json({ message: "Data not found" });
    }

    item.name = name;
    item.description = description;

    await item.save();

    res.json(item);
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
});

app.delete("/cruds/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await dataModel.findById(id);
    if (!item) {
      res.status(404);
      res.json({ message: "Data not found" });
    }

    await item.deleteOne();
    res.status(201)
    res.json({ message: "Data deleted" });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
});

app.listen(8082, () => {
  console.log("Server started");
});
