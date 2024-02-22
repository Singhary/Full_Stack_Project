const express = require('express');
const cors = require('cors') ;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const  mongoose  = require('mongoose');
const User = require('./models/User');
const place = require('./models/Place') ;
const CookieParser = require('cookie-parser') ;
const cookieParser = require('cookie-parser');
const imageDownloader=require('image-downloader');
const multer = require('multer');
const fs = require('fs') ;
const app = express() ;
require('dotenv').config();

//pass-Aryan12345

const bcryptSalt =bcrypt.genSaltSync(10) ;
const jwtSecret= 'w9u3e90ejdifhdshrfohwfjleheno+++cdsokpj'

// express.json() is a built-in middleware in Express that parses incoming requests with JSON payloads.
// When a client sends a POST or PUT request with a JSON payload in the request body, this middleware will parse that JSON data and make it available in the request.body property.
app.use(express.json()) ;
app.use(cookieParser()) ;

//This middleware is used because we want to show every photo which is inside the upload folder.
// This line sets up a route for serving static files. When a request is made to a URL path starting with '/uploads', Express will look for files in the 'uploads' directory and serve them. 
app.use('/uploads',express.static(__dirname+'/uploads')) ;


//This is important to share resources which are present at different ip/domain.
app.use(cors({
    credentials:true,
    origin:"http://localhost:5173" ,
}));

//IT bring all the things that are stored in .env here we have saved the connecting string of moongoose in env so we are taking it from env.
//console.log(process.env.MONGO_URL) ;
mongoose.connect(process.env.MONGO_URL) ;

app.get('/test',(req,res)=>{
    res.json("test ok i") ;
    
})

//This is the end point of our /register page and it sending data here.
app.post('/register',async(req , res)=>{
    
    const {name,email,password} = req.body ;
    //.create() return the newly created user so we are storing it in 'userDoc' variable.
    try{
        const userDoc=await User.create({
            name,
            email,
            password:bcrypt.hashSync(password, bcryptSalt),
        })
        res.json(userDoc) ;
    }
    catch(error){
        res.sendStatus(422).json(error) ;
    }
});

app.post('/login',async(req,res)=>{
    const {email , password} = req.body ;

   const userDoc=await User.findOne({email}) ;
   
   if(userDoc){
      const passOk=bcrypt.compareSync(password,userDoc.password);
      if(passOk){
        jwt.sign({
            email:userDoc.email , 
            id:userDoc._id , 
            } , jwtSecret , {},(err ,token)=>{
            
                if(err){
                throw err ;
            }
            else{
                res.cookie('token',token).json(userDoc);
            }
        });
      }
      else{
        res.json("Password not ok")
      }
   }
   else{
    res.json('Not Found') ;
   }
});


app.get('/profile' , (req, res)=>{

    const{token} = req.cookies ;
    
    if(token){
      jwt.verify(token , jwtSecret,{} , async(err , userData)=>{
         if(err){
            throw err ;
         }
         const {name ,email , _id}=await User.findById(userData.id) ;
         res.json({name ,email , _id}) ;
      }) ;
    }
    else{
        res.json(null) ;
    }
})

app.post('/logout',(req,res)=>{
    res.cookie('token' ,'').json(true);
})

console.log({__dirname}) ;

// A Node module for downloading image to disk(here in uploads folder) from a given URL
app.post('/upload-by-link',async(req,res)=>{
   
    const{link} = req.body ;
    const newName = 'photo'+Date.now()+'.jpg' ;

    await imageDownloader.image({
        url:link,
        dest:__dirname+'/uploads/'+ newName,
    });
    //console.log(__dirname+'/uploads'+ newName)
    res.json(newName);
});

const photosMiddleware = multer({dest:'uploads/'});
app.post('/upload' ,photosMiddleware.array('photos',100),(req,res)=>{
   const uploadedFiles=[] ;
    for(let i=0 ; i<req.files.length ;i++){
         const{path , originalname} = req.files[i];
        const parts = originalname.split('.') ;
        const ext = parts[parts.length-1] ;
        const newPath = path + '.' + ext ;
        
        fs.renameSync(path , newPath) ;
        console.log(newPath);
        const n=uploadedFiles.push(newPath.replace('uploads',''));
        console.log(n);
    }

   res.json(uploadedFiles);
});

app.post('/places',async(req,res)=>{
    const{token} = req.cookies ;
    const{title , address ,addedPhotos , description ,
          perks , extraInfo , checkIn , checkOut , maxGuests} = req.body;

    let placeDocs;

    jwt.verify(token , jwtSecret,{} , async(err , userData)=>{
        if(err){
           throw err ;
        }
         placeDocs= await place.create({
            owner:userData.id,
            title , address ,photos:addedPhotos , description ,
          perks , extraInfo , checkIn , checkOut , maxGuests,
           });
      
     }) ;
    res.json({placeDocs}) ;  
})

app.get('/places' , (req , res)=>{
    const{token} = req.cookies ;

    jwt.verify(token , jwtSecret,{} , async(err , userData)=>{
        const {id} = userData;
        res.json(await place.find({owner:id}))
    });
});

app.get('/places/:id' , async(req , res)=>{
    const {id} = req.params ;

    res.json(await place.findById(id));
})

//here id is of the "place" that we need to find
app.put('/places' , async(req,res)=>{
   
    const{token} = req.cookies ;
    const{
        id,title , address ,addedPhotos , description ,
          perks , extraInfo , checkIn , checkOut , maxGuests} = req.body;

        jwt.verify(token , jwtSecret,{} , async(err , userData)=>{
          if(err){
            throw err ;
          }
            const placeDoc = await place.findById(id); 
//tostring is required here as user.id is a string and placeDoc.id is in the form {json} we convert both of them in string first then we compared it.

        if(userData.id==placeDoc.owner.toString()){
          placeDoc.set({
            title , address ,photos:addedPhotos , description ,
            perks , extraInfo , checkIn , checkOut , maxGuests,
           });
        await placeDoc.save() ;
        res.json('ok') ;
        }
       });
});


app.listen(4000) ;
