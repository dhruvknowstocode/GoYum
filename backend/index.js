const express=require('express');
const app=express();
const dotenv=require('dotenv');
dotenv.config();
const port=process.env.PORT||5000;
const mongoDb=require('./db');
mongoDb();
const cors=require('cors');
app.use(cors());

app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:3000', 'https://go-yum-wr5h.vercel.app'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});


app.get("/",(req,res)=>{
    res.send("helloworld");
})

app.use(express.json());
app.use('/api',require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));

app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})
