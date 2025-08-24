import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./connectDb/db.js";
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import otRoutes from "./routes/operationRoutes.js";
import surgeryRoutes from "./routes/surgeryRoutes.js";
import admin from "./utils/admin.js";


dotenv.config();


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser()); 

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true                
}));

app.get('/', (req, res) => {
  res.send('Operation Scheduler API');
});


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/ots", otRoutes);
app.use("/api/surgeries", surgeryRoutes);

const startServer = async () => {
  try {
    await connectDB();  
    await admin();      
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err.message);
    process.exit(1);
  }
};

startServer();