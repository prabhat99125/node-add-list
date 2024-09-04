const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {

    fs.readdir("./files", (err, files) => {
       res.render("index", {files:files});
    });
});

app.post("/formData", (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.json`, JSON.stringify(req.body), (err, data) => {
        res.redirect("/");
    });
});
app.get("/task/:fileName", (req, res) => {
    fs.readFile(`./files/${req.params.fileName}`, "utf-8", (err, data) => {

        res.render("tasks", {title: JSON.parse(data).title, text : JSON.parse(data).textarea})
    })
})
app.get("/delete/:fileName", (req, res) => {
    console.log()
})
app.listen(5000);