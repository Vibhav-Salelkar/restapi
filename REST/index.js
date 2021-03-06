import express from "express";
import userRoutes from "./Routes/users.js"
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(express.json())
app.use(cors());

app.use('/users', userRoutes);

app.get('/', (req,res)=> {
    res.send('Hello From Home Page');
})

app.listen(PORT, ()=> {
    console.log(`server started on http://localhost:${PORT}`)
})