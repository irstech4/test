const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const connectToDB = require("./config/dbConfig");
const authRouter = require("./routes/userRoute");
const Razorpay = require("razorpay");

app = express();
app.use(cors());
app.use(helmet());

app.use(express.json());

const PORT = process.env.PORT || 3000;

connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting server:", error);
    process.exit(1);
  });

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Hello, this is Server!");
});
