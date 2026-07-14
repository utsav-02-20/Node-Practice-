const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // a middleware
app.set("view engine", "ejs");
// using file system
const fs = require("node:fs");

// fetching the data
app.post("/create", (req, res) => {
  const fileName = req.body.title.trim().split(" ").join("_");
  // const fileName = req.body.title.trim();
  if (!fileName || fileName.trim() === "") {
    return res.status(400).send("File name is required");
  }
  fs.writeFile(`./files/${fileName}.txt`, req.body.details, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error creating file");
    }
    res.redirect("/");
  });
});

// sending data of files from files folder
app.get("/", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) {
      return res.status(500).send("Error reading files");
    }
    const file = files.map((fileName) => ({
      fileName: fileName ,
      displayname: fileName.replace(/\.txt$/, "").replace(/_/g, " ") , 
      content: fs.readFileSync(`./files/${fileName}`, "utf8"), // utf8 = english
    }));
    // console.log(file);
    res.render("index", { files: file });
  });
});

// added a link to open the file in new window 
app.get("/files/:filename", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) {
      return res.status(500).send("Error reading files");
    }
    // defining filename 
    const filename = req.params.filename;
    fs.readFile(path.join(__dirname , "files" , filename), "utf8", (err, filedata) => {
      if (err) { 
        console.log(err);
        return res.status(404).send("File not found");
      }
      // prints output on console 
      // console.log(filedata);
      // prints notes on browser 
      // res.send(filedata);

      // passing value also 

      res.render("read.ejs" , {
        displayname: filename.replace(/\.txt$/, "").replace(/_/g, " ") ,
        //content: filedata
      }); 
    });
  });
});

// deleting the post by a button given 
// app.get("/delete/:filename" , (req , res) => {

// }) ; 

// editing the file info 


// for local development
app.listen(3000, () => {
  console.log("Chalne lagi");
}); 

// This is required because Render/Railway assigns the port through the PORT environment variable.
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server running on ${PORT}`);
// });