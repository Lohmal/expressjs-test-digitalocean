"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const formController_1 = __importDefault(require("../controllers/formController"));
const router = (0, express_1.Router)();
// POST /api/forms - Yeni form oluştur
router.post("/", formController_1.default.createForm);
// GET /api/forms - Tüm formları getir
router.get("/", formController_1.default.getAllForms);
// GET /api/forms/:id - Belirli bir formu getir
router.get("/:id", formController_1.default.getFormById);
// DELETE /api/forms/:id - Form sil
router.delete("/:id", formController_1.default.deleteForm);
exports.default = router;
