const { Storage } = require("@google-cloud/storage");
const { getFirestore } = require("firebase-admin/firestore");
const dotenv = require("dotenv");

const admin = require("firebase-admin");

const serviceAccount = require("../firestore-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

dotenv.config();

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.SERVICE_ACCOUNT,
});

const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName);

const fruits = require("../models/Fruits.model");

const getFruitsHistory = (req, res) => {
  res.json(fruits);
};

const getFruit = (req, res) => {
  const id = parseInt(req.params.id);
  const fruit = fruits.filter((f) => f.id === id);
  res.status(200).send(fruit);
};

const addFruit = (req, res) => {
  const { ripeness, category, date, image, bookmark } = req.body;

  const newFruit = {
    id: fruits.length + 1,
    ripeness: ripeness,
    category: category,
    date: date,
    image: image,
    bookmark: bookmark,
  };

  fruits.push(newFruit);
  res.status(200).send("Fruit added!");
};

const deleteFruit = (req, res) => {
  const id = req.params.id;
  const index = fruits.findIndex((fruit) => fruit.id === id);
  fruits.splice(index, 1);
  res.status(200).send("Fruit deleted!");
};

const uploadToBucket = (req, res) => {
  try {
    if (req.file) {
      const bucketFile = bucket.file(`img/${req.file.originalname}`);
      const bucketFileStream = bucketFile.createWriteStream();

      bucketFileStream.on("finish", () => {
        res.status(200).send("Success!");
      });
      bucketFileStream.end(req.file.buffer);
    } else {
      throw "error with image";
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getData = async (req, res) => {
  try {
    const snapShot = await db.collection("fruits").get();
    let data = [];
    snapShot.forEach((doc) => {
      data.push(doc.data());
    });

    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

const getDataById = async (req, res) => {
  try {
    const snapShot = db.collection("fruits").doc(req.params.id);
    const response = await snapShot.get();
    res.send(response.data());
  } catch(error) {
    res.send(error);
  }
};

const deleteDataById = async (req,res) => {
  try {
    const snapShot = db.collection("fruits").doc(req.params.id).delete();
    res.send('Data deleted!')
  } catch(error){
    res.send(error);
  }
}

const addData = async (req,res) => {
  try {
    const { id, ripeness, category, date, bookmark } = req.body;

    if (req.file) {
      const bucketFile = bucket.file(`img/${req.file.originalname}`);
      const bucketFileStream = bucketFile.createWriteStream();

      const newData = {
        id: parseInt(id),
        ripeness: ripeness,
        category: category,
        date: new Date(date),
        image: req.file.originalname,
        bookmark: Boolean(bookmark),
      }

      const response = await db.collection("fruits").doc(id).set(newData);

      res.send(response);

      bucketFileStream.on("finish", () => {
        res.status(200).send("Success!");
      });
      bucketFileStream.end(req.file.buffer);
    } else {
      throw "error with image";
    }


  } catch(error){
    res.send(error);
  }
}

module.exports = {
  getFruitsHistory,
  getFruit,
  addFruit,
  deleteFruit,
  uploadToBucket,
  getData,
  getDataById,
  deleteDataById,
  addData
};
