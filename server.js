import express from "express";
import cors from "cors";
import Datastore from "nedb";

const data = new Datastore({ filename: "./data.json" });
data.loadDatabase((err) => console.log(err));

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/get", (req, res) => {
  data.find({}, (err, all) => {
    if (err) {
      res.json({ Error: err });
    }
    res.json(all);
  });
});

app.post("/post", (req, res) => {
  const { title, desc, price } = req.body;

  const doc = {title, desc, price};

  data.insert(doc, (err, newDoc) => {
    if (err) {
      res.status(404).json({ "Error: ": err });
    } else {
      res.json({Message: "Successfully posted"});
    }
  });
});

app.listen("8080", () => {
  console.log(
    "Ishladi Mustaf axaxax. Ol yaxshi mnam yazib qoyaman localhost:8080"
  );
});
