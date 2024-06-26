const mongoose = require('mongoose');
const dotenv=require('dotenv');
dotenv.config();
const MONGO_URL = process.env.MONGO_URI;

const mongoDb = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`Connected to MongoDB ${mongoose.connection.host}`);
    const collection1 = mongoose.connection.db.collection("food_items");
    const data1 = await collection1.find({}).toArray();
    global.food_items = data1;
    const collection2 = mongoose.connection.db.collection("foodCategory");
    const data2 =await collection2.find({}).toArray();
    global.foodCategory = data2;
    // console.log(data1);
    // console.log(data2);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = mongoDb;

