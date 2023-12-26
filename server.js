import express from 'express'
import { fileURLToPath} from 'url'
import {dirname} from 'path'
import mongoose, { mongo } from 'mongoose'
import envConfig from 'dotenv/config'
export const DB_URL = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PW}@mongo-cluster.iwz8lmq.mongodb.net/`   
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);
import bodyParser from 'body-parser'

const app = express();
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const Message = mongoose.model('message',{name: String, description: String});
//#region Messages
app.get('/messages',async (req, res) => {
    try{
        const result = await Message.find({}).exec();
        console.log("GET", result)
        res.send(result)
    }
    catch(error){
        res.sendStatus(500).send(error.message)
    }
})

app.post('/messages',async (req, res) => {
    const message = new Message(req.body)
    console.log("POST",req.body)
    try{
        const result = await message.save()
        res.sendStatus(201)
    }catch(error){r
        res.sendStatus(500,{error: error.message})
    }
})


//#endregion Messages
mongoose.connect(DB_URL)

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', () => {
    console.log("MONGODB Succesfully connection")
})

const server = app.listen(3000, () => {
    console.log("Server is running on:", server.address())
    })