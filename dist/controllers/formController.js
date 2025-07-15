"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Form_1 = __importDefault(require("../models/Form"));
class FormController {
    // Yeni form oluştur
    async createForm(req, res) {
        try {
            const { name, email, message } = req.body;
            // Basit validasyon
            if (!name || !email || !message) {
                res.status(400).json({
                    success: false,
                    error: "Tüm alanlar zorunludur",
                });
                return;
            }
            // Yeni form oluştur
            const newForm = new Form_1.default({
                name,
                email,
                message,
            });
            // Veritabanına kaydet
            const savedForm = await newForm.save();
            res.status(201).json({
                success: true,
                message: "Form başarıyla kaydedildi",
                data: savedForm,
            });
        }
        catch (error) {
            console.error("Form kaydetme hatası:", error);
            // Mongoose validation error
            if (error.name === "ValidationError") {
                const errors = Object.values(error.errors).map((err) => err.message);
                res.status(400).json({
                    success: false,
                    error: "Validasyon hatası",
                    details: errors,
                });
                return;
            }
            res.status(500).json({
                success: false,
                error: "Sunucu hatası oluştu",
            });
        }
    }
    // Tüm formları getir
    async getAllForms(req, res) {
        try {
            const forms = await Form_1.default.find().sort({ createdAt: -1 });
            res.json({
                success: true,
                count: forms.length,
                data: forms,
            });
        }
        catch (error) {
            console.error("Formları getirme hatası:", error);
            res.status(500).json({
                success: false,
                error: "Sunucu hatası oluştu",
            });
        }
    }
    // Belirli bir formu getir
    async getFormById(req, res) {
        try {
            const { id } = req.params;
            const form = await Form_1.default.findById(id);
            if (!form) {
                res.status(404).json({
                    success: false,
                    error: "Form bulunamadı",
                });
                return;
            }
            res.json({
                success: true,
                data: form,
            });
        }
        catch (error) {
            console.error("Form getirme hatası:", error);
            res.status(500).json({
                success: false,
                error: "Sunucu hatası oluştu",
            });
        }
    }
    // Form sil
    async deleteForm(req, res) {
        try {
            const { id } = req.params;
            const form = await Form_1.default.findByIdAndDelete(id);
            if (!form) {
                res.status(404).json({
                    success: false,
                    error: "Form bulunamadı",
                });
                return;
            }
            res.json({
                success: true,
                message: "Form başarıyla silindi",
            });
        }
        catch (error) {
            console.error("Form silme hatası:", error);
            res.status(500).json({
                success: false,
                error: "Sunucu hatası oluştu",
            });
        }
    }
}
exports.default = new FormController();
