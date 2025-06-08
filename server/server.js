import express from "express";
import 'dotenv/config';
import cors from 'cors';
import connectDb from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

const app = express();
await connectDb();
const PORT = process.env.PORT || 3000;
//middlewares
app.use(cors());
app.use(express.json());

//Routes
app.get('/', (req, res) => res.send("API working"));
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}`)
})



export default app;