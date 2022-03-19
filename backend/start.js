const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;
// routes
require('./routes/auth.routes')(app);

const db = require("./models");
db.mongoose
  .connect(`mongodb://localhost:27017/myuser_db`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
  
app.listen(PORT, () => {
  console.log(`backend running on port ${PORT}.`);
});