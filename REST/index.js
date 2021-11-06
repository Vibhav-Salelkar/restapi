import express from "express";

const app = express();
const PORT = 5000;

app.use(express.json())

app.get('/', (req,res)=> {
    res.send('Hello From Home Page');
})

app.listen(PORT, ()=> {
    console.log(`server started on http://localhost:${PORT}`)
})