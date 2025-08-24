import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import authRoutes from "./routes/auth.js";
import blogRoutes from './routes/blog.js';
import cors from "cors";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
// import blogRoutes from "./routes/blogRoutes.js";


dotenv.config();
const app = express();

// ✅ File upload middleware
app.use(fileUpload({
  useTempFiles: true,   // needed for tempFilePath
  tempFileDir: "/tmp/"  // temp folder
}));

// ✅ CORS setup
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  credentials: true
}));

// ✅ Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Body parser
app.use(express.json());

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);


// ✅ Upload route
app.post("/upload", async (req, res) => {
  if (!req.files || !req.files.file) return res.status(400).send("No file uploaded");

  const file = req.files.file;
  try {
    const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "blog_images",
    });
    res.json({ url: result.secure_url });
  } catch (err) {
    console.error("Cloudinary error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ Connect database
connectDB();

// ✅ Test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
