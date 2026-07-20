const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("<h1>Assignment 3 - Jenkins CI/CD Pipeline Successful!</h1>");
});

app.get("/health", (req, res) => {
    res.json({
        status: "UP",
        application: "Assignment-3",
        version: "1.0"
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
