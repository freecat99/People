import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import {fileURLToPath} from 'url'
import { register } from './controllers/authController.js'
import authRouter from './routes/authRouter.js'
import userRouter from './routes/userRouter.js'
import postRouter from './routes/postRouter.js'
import { verifyToken } from './middleware/authMiddleware.js'
import { createPost } from './controllers/postController.js'

//Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit:'30mb', extended:true }));
app.use(bodyParser.urlencoded({ limit:'30mb', extended:true }));
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

//File Storage
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(numm, 'public/assets');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

const upload = multer({storage})


//Routes
app.post('/auth/register', upload.single('picture'), register);
app.post('/posts', verifyToken, upload.single('picture'), createPost);

//Routes w/o file
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/posts', postRouter);


//Mongoose Setup
const PORT = process.env.PORT || 1600;

mongoose.connect(process.env.MONGO_CONN)
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`server started at ${PORT}`)
        })
    }).catch((error)=>{
        console.log(`connection refused, ${error}`)
    })