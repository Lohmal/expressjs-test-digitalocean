import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database";
import routes from "./routes";

// Çevre değişkenlerini yükle
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB bağlantısı
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Test route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Express.js TypeScript Backend Server Çalışıyor!",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api", routes);

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// 404 handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: "Endpoint bulunamadı",
    path: req.originalUrl,
  });
});

// Global error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Genel hata:", error);
  res.status(500).json({
    success: false,
    error: "Sunucu hatası oluştu",
    ...(process.env.NODE_ENV === "development" && { details: error.message }),
  });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor`);
  console.log(`📍 API endpoint: http://localhost:${PORT}/api/forms`);
  console.log(`🏥 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
});

export default app;
