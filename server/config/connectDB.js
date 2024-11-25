const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_DB_URL).then(() => {
  console.log("Connected to MongoDB Atlas");
}).catch((err) => {
  console.error("Error connecting to MongoDB Atlas", err);
});