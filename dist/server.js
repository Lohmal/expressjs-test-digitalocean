"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const routes_1 = __importDefault(require("./routes"));
// Çevre değişkenlerini yükle
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// MongoDB bağlantısı
(0, database_1.default)();
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb" }));
// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Express.js TypeScript Backend Server Çalışıyor!",
        version: "1.0.0",
        timestamp: new Date().toISOString(),
    });
});
// API routes
app.use("/api", routes_1.default);
// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});
// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        error: "Endpoint bulunamadı",
        path: req.originalUrl,
    });
});
// Global error handler
app.use((error, req, res, next) => {
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
exports.default = app;
