const { Storage } = require("@google-cloud/storage");
const { getFirestore, doc } = require("firebase-admin/firestore");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

const admin = require("firebase-admin");
const serviceAccount = require("../firestore-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();

dotenv.config();

const storage = new Storage({
  projectId: process.env.PROJECT_ID,
  keyFilename: process.env.BUCKET_SERVICE_ACCOUNT,
});

const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName);

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
  } catch (error) {
    res.send(error);
  }
};

const deleteDataById = async (req, res) => {
  try {
    const snapShot = await db.collection("fruits").doc(req.params.id).get();
    const image = bucket.file(`img/${snapShot.data().image}`);
    // console.log(image)
    const exists = await image.exists();

    if (!exists[0]) {
      return res.status(404).send("File not found");
    }
    await snapShot.ref.delete();
    await image.delete();
    res.status(200).send("Data deleted successfully");
  } catch (error) {
    res.status(500).send("Error deleting data");
  }
};

const addData = async (req, res) => {
  try {
    const { id, ripeness, category, date, bookmark } = req.body;
    console.log(req.body);
    const uniqueId = uuidv4();
    const uniqueImage = uuidv4();
    const getFileExtension = (fileName) => {
      const parts = fileName.split(".");
      if (parts.length > 1) {
        return parts[parts.length - 1];
      } else {
        return null;
      }
    };

    if (req.file) {
      const imageExists = await bucket
        .file(
          `img/${uniqueImage}` + "." + getFileExtension(req.file.originalname)
        )
        .exists();
      if (imageExists[0]) {
        res.send("Image already exists");
      } else {
        const bucketFile = bucket.file(
          `img/${uniqueImage}` + "." + getFileExtension(req.file.originalname)
        );
        const bucketFileStream = bucketFile.createWriteStream();
        const publicUrl =
          "https://storage.googleapis.com/" +
          process.env.BUCKET_NAME +
          "/img/" +
          uniqueImage +
          "." +
          getFileExtension(req.file.originalname);

        const newData = {
          id: uniqueId,
          ripeness: ripeness,
          category: category,
          date: new Date(date),
          image: uniqueImage + "." + getFileExtension(req.file.originalname),
          imageUrl: publicUrl,
          bookmark: Boolean(bookmark),
        };

        const response = await db
          .collection("fruits")
          .doc(uniqueId)
          .set(newData);

        bucketFileStream.on("finish", () => {
          res.status(200).send("Success!");
        });
        bucketFileStream.end(req.file.buffer);
      }
    } else {
      res.send("Image not found");
    }
  } catch (error) {
    res.send(error);
  }
};

const getBookmarkedFruits = async (req, res) => {
  try {
    const fruits = await db
      .collection("fruits")
      .where("bookmark", "==", true)
      .get();

    if (fruits.size > 0) {
      let data = [];
      fruits.forEach((doc) => {
        data.push(doc.data());
      });
      res.send(data);
    } else {
      res.send("There is no data");
    }
  } catch (error) {
    res.send(error);
  }
};

const getBananas = async (req, res) => {
  try {
    const bananas = await db
      .collection("fruits")
      .where("category", "==", "banana")
      .get();

    if (bananas.size > 0) {
      let data = [];
      bananas.forEach((doc) => {
        data.push(doc.data());
      });
      res.send(data);
    } else {
      res.send("There is no banana");
    }
  } catch (error) {
    res.send(error);
  }
};

const getMangos = async (req, res) => {
  try {
    const mangos = await db
      .collection("fruits")
      .where("category", "==", "mango")
      .get();

    if (mangos.size > 0) {
      let data = [];
      mangos.forEach((doc) => {
        data.push(doc.data());
      });
      res.send(data);
    } else {
      res.send("There is no mango");
    }
  } catch (error) {
    res.send(error);
  }
};

const addNote = async (req, res) => {
  try {
    const { note } = req.body;
    if (note === null) {
      const snapShot = await db.collection("fruits").doc(req.params.id);
      const updatedData = await snapShot.update({ note: note });
      res.send("note saved");
    } else {
      res.send("please add some note");
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  getData,
  getDataById,
  deleteDataById,
  addData,
  getBookmarkedFruits,
  getBananas,
  getMangos,
  addNote,
};
