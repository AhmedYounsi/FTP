const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);
const connectDB = require("./config/mongoConnection");
var userRouter = require("./src/routes/users");
var eventRouter = require("./src/routes/EventRoute");
var fileRouter = require("./src/routes/FileRoutes");
const upload = require("express-fileupload");
const path = require("path");
const fs = require("fs");
const serveIndex = require("serve-index");
const ModelFiles = require("./src/models/File");
const ModelFolder = require("./src/models/Folder");

app.use(upload());

options = {
  cors: true,
};

app.use(express.static("uploads/"));

// Middlewear
app.use(cors());
app.use(express.json());
 

const io = require("socket.io")(server, options);

io.on("connection", async (socket) => {
  socket.on("Delete_Folder", async ({ CurrentFolder, AllFiles }) => {
    let Ids = [];
    AllFiles.map((el) => Ids.push(el._id));
    if (fs.existsSync("./uploads/" + CurrentFolder)) {
      try {
        const DeletedMany = await ModelFiles.deleteMany({
          _id: {
            $in: Ids,
          },
        });
        const foldersDeleted = await ModelFolder.findOneAndDelete({
          name: CurrentFolder,
        });

        if (DeletedMany && foldersDeleted) {
          fs.rmdirSync("./uploads/" + CurrentFolder, { recursive: true });
          io.emit(`Delete_Folder`);
        }
      } catch (error) {
        socket.emit("Error", "Error");
      }
    }
  });

  socket.on("Get_Folders", async () => {
    try {
      const folders = await ModelFolder.find();
      io.emit(`Get_Folders`, folders);
    } catch (error) {}
  });

  socket.on("Get_Files_One", async (folder) => {
    try {
      const All_files = await ModelFiles.find({ folder: folder }).sort("-date");
      socket.emit(`Get_Files_One`, JSON.stringify(All_files));
      io.emit(`TO_${folder}`, JSON.stringify(All_files));
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("Add_folder", async (data) => {
    const { NewFolder, Ids, userId, is_private } = data;
    try {
      fs.mkdirSync("./uploads/" + NewFolder);

      const folder = new ModelFolder({
        name: NewFolder,
        access: Ids,
        creator: userId,
        private: is_private,
      });
      await folder.save();
      io.emit("Add_folder");
    } catch (error) {
      console.log(error.code);
      socket.emit("Error", "Invalid Name or maybe folder already exist");
    }
  });
});

// INIT PORT
const PORT = process.env.PORT || 5000;
const ip_adresse = "192.168.1.15";

// Connect Database
connectDB();
// Init Middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());

// Define Routes
app.use("/users", userRouter);
app.use("/events", eventRouter);
app.use("/", fileRouter);
// app.use("/file", fileRouter);

// RUNNIG THE SERVER
server.listen(PORT, ip_adresse, () => {
  console.log(`Server running on port ${PORT}`);
});
