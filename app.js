const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(res.token, "secretkey", (err, data) => {
    if (err) {
      res.json({
        statusCode: 403,
        message: "Failed Authentication"
      });
    } else {
      res.json({
        message: "posts created",
        data
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  // Mock User
  const user = {
    id: 1,
    username: "uma",
    email: "uma@gmail.com"
  };
  jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
    res.json({
      token
    });
  });
});

const PORT = 3000 || process.env.PORT;

function verifyToken(req, res, next) {
  const headerToken = req.headers["authorization"];
  if (typeof headerToken !== undefined) {
    res.token = headerToken.split(" ")[1];
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(PORT, () => {
  console.log(`Server listening at PORT ${PORT}`);
});
