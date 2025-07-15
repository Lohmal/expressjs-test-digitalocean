import { Router } from "express";
import formController from "../controllers/formController";

const router = Router();

// POST /api/forms - Yeni form oluştur
router.post("/", formController.createForm);

// GET /api/forms - Tüm formları getir
router.get("/", formController.getAllForms);

// GET /api/forms/:id - Belirli bir formu getir
router.get("/:id", formController.getFormById);

// DELETE /api/forms/:id - Form sil
router.delete("/:id", formController.deleteForm);

export default router;
