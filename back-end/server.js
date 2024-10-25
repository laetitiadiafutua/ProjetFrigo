const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json({ extended: false }));
// CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (process.env.WHITELIST.indexOf(origin) === -1) {
        let message =
          "The CORS policy for this origin doesn't " +
          "allow access from the particular origin.";
        return callback(new Error(message), false);
      }
      return callback(null, true);
    },
  })
);
