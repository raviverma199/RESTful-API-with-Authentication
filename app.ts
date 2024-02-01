import express from 'express'
const app = express()
import {mainRoute} from './router/route'
import connection from './db/connection'
connection()

app.use(express.json())

app.use('/',mainRoute)



app.listen(1000,()=>{
    console.log("server is running on 1000 port");
})