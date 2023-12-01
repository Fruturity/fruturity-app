const { Storage } = require("@google-cloud/storage");

const storage = new Storage({
  projectId: "composed-card-399614",
  keyFilename: "composed-card-399614-a52cf6699d3a.json",
});

const bucketName = "example-upload-fruit-image";
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

const uploadToBucket = (req,res) => {
    console.log("Made it /upload");
    try {
        if(req.file){
            console.log("File found");
            const bucketFile = bucket.file(`img/${req.file.originalname}`);
            const bucketFileStream = bucketFile.createWriteStream();

            bucketFileStream.on("finish", () => {
                res.status(200).send("Success!");
                console.log("success");
            });
            bucketFileStream.end(req.file.buffer);
        } else {
            throw "error with image";
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
  getFruitsHistory,
  getFruit,
  addFruit,
  deleteFruit,
  uploadToBucket,
};
