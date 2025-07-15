import { Request, Response } from "express";
import Form from "../models/Form";
import { IFormInput } from "../interfaces/IForm";

class FormController {
  // Yeni form oluştur
  async createForm(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, message }: IFormInput = req.body;

      // Basit validasyon
      if (!name || !email || !message) {
        res.status(400).json({
          success: false,
          error: "Tüm alanlar zorunludur",
        });
        return;
      }

      // Yeni form oluştur
      const newForm = new Form({
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
    } catch (error: any) {
      console.error("Form kaydetme hatası:", error);

      // Mongoose validation error
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err: any) => err.message);
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
  async getAllForms(req: Request, res: Response): Promise<void> {
    try {
      const forms = await Form.find().sort({ createdAt: -1 });

      res.json({
        success: true,
        count: forms.length,
        data: forms,
      });
    } catch (error) {
      console.error("Formları getirme hatası:", error);
      res.status(500).json({
        success: false,
        error: "Sunucu hatası oluştu",
      });
    }
  }

  // Belirli bir formu getir
  async getFormById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const form = await Form.findById(id);

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
    } catch (error) {
      console.error("Form getirme hatası:", error);
      res.status(500).json({
        success: false,
        error: "Sunucu hatası oluştu",
      });
    }
  }

  // Form sil
  async deleteForm(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const form = await Form.findByIdAndDelete(id);

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
    } catch (error) {
      console.error("Form silme hatası:", error);
      res.status(500).json({
        success: false,
        error: "Sunucu hatası oluştu",
      });
    }
  }
}

export default new FormController();
