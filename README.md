# Express.js Backend

Bu proje Next.js frontend ile çalışmak üzere tasarlanmış bir Express.js backend sunucusudur.

## Özellikler

- Form verilerini MongoDB'ye kaydetme
- CORS desteği
- RESTful API endpoints
- Form validasyonu
- Error handling

## Kurulum

1. Bağımlılıkları yükleyin:

```bash
npm install
```

2. MongoDB'yi başlatın (yerel kurulum için):

```bash
mongod
```

3. Environment variables'ı ayarlayın (.env dosyası):

```
MONGODB_URI=mongodb://localhost:27017/formdb
PORT=3001
NODE_ENV=development
```

4. Sunucuyu başlatın:

```bash
# Development modunda
npm run dev

# Production modunda
npm start
```

## API Endpoints

### GET /

- Sunucu durumu kontrolü

### POST /api/forms

- Yeni form kaydı oluşturur
- Body: `{ "name": "string", "email": "string", "message": "string" }`

### GET /api/forms

- Tüm formları getirir (en yeniden eskiye)

### GET /api/forms/:id

- Belirli bir formu getirir

### DELETE /api/forms/:id

- Belirli bir formu siler

## MongoDB Schema

```javascript
{
  name: String (required),
  email: String (required),
  message: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

## CORS Ayarları

Frontend (Next.js) ile backend arasındaki bağlantı için CORS etkinleştirilmiştir.

## Error Handling

Tüm API endpoints uygun error handling ve validation içerir.
