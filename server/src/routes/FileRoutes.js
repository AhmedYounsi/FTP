const express = require("express");
const app = express();

const _File = require("../models/File");

const router = express.Router();
const path = require("path");
const fs = require("fs");

options = {
  cors: true,
};

router.post("/uploads", async (req, res) => {
  const { nom } = JSON.parse(req.body.user);
  const { prenom } = JSON.parse(req.body.user);
  const { user_id } = JSON.parse(req.body.user);
  
  if (req.files) {
    var file = req.files.file;
    var filename = file.name;
    var folder = `./uploads/${req.body.dir}/`
    const path = folder + filename;
 
 
    if (fs.existsSync(path)) {
      res.status(500).send("file exist");
    } else {
      file.mv(folder + filename, async (err) => {
        if (err){
          console.log(err);
          res.status(500).send("Error");
        }

        const { size } = fs.statSync(path);
        try { 
          // const user = await User.findById(req.user.id).select('-password');
          const db_file = new _File({
            name: filename,   
            path: path,
            folder: req.body.dir ,
            size: size,
            ext: filename.split(".").pop(),
            user: [nom, prenom],
            user_id,
            date: Date.now()
          });
     
          await db_file.save();
           res.send("success");
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      });
    }
  }
});

router.get("/delete_file", async (req, res) => {
  const path = req.query.path;
  try {
    await _File.findOneAndDelete({ name: req.query.name });
    fs.unlinkSync(path);
    res.status(200).send("file deleted");
  
  } catch (error) {
    console.log(error);
  }
});
 
module.exports = router;
