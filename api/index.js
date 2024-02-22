const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User.js');
const Place = require('./models/Place.js')
const cookieParser = require('cookie-parser');
require('dotenv').config();
const multer = require('multer');
const fs = require('fs');
const dir = __dirname;
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "secretstring";

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173',
  exposedHeaders: ['Cookie'],
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req,res) => {
  res.json("test");
});

app.post('/register', async (req,res) => {
  const {name,email:emailPut,password} = req.body;
  if(name == "") {
    res.json("name empty");
  }
  if(emailPut == "") {
    res.json("email empty");
  }
  if(password == "") {
    res.json("password empty"); 
  }
  const userToCheck = await User.find({email: emailPut});
  if(userToCheck.length == 0) {
    try {
      const user = await User.create({
        name,
        emailPut,
        password: bcrypt.hashSync(password, bcryptSalt),
      });  
      res.json(user);
    } catch (e) {
      res.status(422).json(e);
    }
  } else {
    res.json("ko");
  }
});

app.post('/login', async (req,res) => {
  const {email,password} = req.body;
  try {
    const user = await User.findOne({email});
    if (user) {
      const pass = bcrypt.compareSync(password, user.password);
      if (pass) {
        res.cookie('id', user._id).json(user);
      } else {
        res.json("ko");
      }
    } else {
      res.json("ko");
    }
  } catch (e) {
    res.status(422).json(e);
  }
});

app.get('/profile', async (req,res) => {
  const {id} = req.cookies;
  if({id} && id != null && id != "") {
    try {
      const user = await User.findById(id);
      res.json(user);
    } catch (e) {
      res.json(e);
    }
  } else {
    res.json(null);
  }
});

app.get('/logout', (req,res) => {
  res.cookie('id', '').json();
});

const photosMiddleware = multer({dest:'uploads'});
app.post('/upload', photosMiddleware.array('photos', 100), (req,res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
      const {path, originalname} = req.files[i];
      const parts = originalname.split('.');
      const ext = parts[parts.length -1];
      const newPath = path + '.' + ext;
      fs.renameSync(path, newPath); 
      uploadedFiles.push(newPath.replace('/uploads',''));
  }   
  res.json(uploadedFiles);
});

app.get('/set-photos', (req,res) => {
  const dirPhotos = dir + "/uploads";
  let arr = [];
  fs.readdir(dirPhotos, function(err, files) {
    if (err) throw (err);
    files.forEach(file => {
        arr.push(file);
    })
    res.json(arr);
  })
});

app.post('/places', async (req,res) => {
  const {id} = req.cookies;
  const{ title,address,addedPhotos,description,
         perks, extraInfo, checkIn, checkOut, maxGuests,
         price} = req.body;
  try {
    const user = await User.findById(id);
    const place = await Place.create({
      owner: user._id,
      title,
      address,
      addedPhotos,
      description,
      perks, 
      extraInfo, 
      checkIn, 
      checkOut, 
      maxGuests,
      price,
    });
    res.json(place);
  } catch (e) {
    console.error(e);
  }
});

app.get('/user-places', async (req,res) => {
  const {id} = req.cookies;
  try {
    const user = await User.findById(id);
    if(user.length != 0) {
      res.json( await Place.find({owner:id}) );
    } else {
      res.json("no user");
    }
  } catch(e) {
    console.error(e);
  }
});

app.get('/places/:param', async (req,res) => {
  const {param} = req.params;
  try {
    if (param.match(/^[a-zA-Z-]+$/)) {
      let result = param.replace('-', ' ');
      result = result.split(' ');
      for(let i=0; i < result.length; i++) {
        result[i] = result[i].charAt(0).toLocaleUpperCase()+result[i].slice(1);
      }
      result = result.join(' ');
      const place = await Place.find({ title: result });
      res.json(place);
    } else {
      const place = await Place.findById(param);
      res.json(place);
    }
  } catch (e) {
    console.error(e);
  }
});

app.put('/places/:id', async (req,res) => {
  const {id:user_id} = req.cookies;
  const {id} = req.params;
  const{ title,address,addedPhotos,description,
    perks, extraInfo, checkIn, checkOut, maxGuests,
    price} = req.body;
  try {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      const place = await Place.findById(id);
      place.set({
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      })
      await place.save();
      res.json(place);
    }
  } catch (e) {
    console.error(e);
  }
});

app.post('/remove-photos', async(req,res) => {
  const dirPhotos = dir + "/uploads";
  const body = req.body;
  fs.readdir(dirPhotos, function(err, files) {
    if (err) throw (err);
    files.forEach(file => {
      body.forEach((photo) => {
        if(file == photo) {
          const filePath = dirPhotos + "/" + file;
          fs.unlinkSync(filePath);
        }
      })
    })
    res.json("ok");
  })
});

app.get('/places', async (req,res) => {
  const places = await Place.find();
  res.json(places);
})

app.listen(4000);  