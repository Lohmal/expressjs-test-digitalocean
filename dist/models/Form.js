"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const formSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "İsim alanı zorunludur"],
        trim: true,
        minlength: [2, "İsim en az 2 karakter olmalıdır"],
        maxlength: [50, "İsim en fazla 50 karakter olabilir"],
    },
    email: {
        type: String,
        required: [true, "Email alanı zorunludur"],
        trim: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Geçerli bir email adresi girin"],
    },
    message: {
        type: String,
        required: [true, "Mesaj alanı zorunludur"],
        trim: true,
        minlength: [10, "Mesaj en az 10 karakter olmalıdır"],
        maxlength: [500, "Mesaj en fazla 500 karakter olabilir"],
    },
}, {
    timestamps: true,
});
const Form = mongoose_1.default.model("Form", formSchema);
exports.default = Form;
