const express = require('express');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// إعداد Multer لتخزين الملفات
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

// معالجة طلب رفع الفيديو
app.post('/upload', upload.single('video'), async (req, res) => {
    try {
        const videoPath = path.join(__dirname, req.file.path);
        const form = new FormData();
        form.append('chat_id', '6431271423'); // استبدل بـ chat_id الخاص بك
        form.append('video', fs.createReadStream(videoPath));

        const response = await axios.post(`https://api.telegram.org/bot6618648466:AAFGGTIx055y0eCRvq_z3ABqchHfLsqD0M4/sendVideo`, form, {
            headers: {
                ...form.getHeaders()
            }
        });

        // حذف الملف من الخادم بعد الإرسال
        fs.unlinkSync(videoPath);

        // استرجاع رابط الفيديو
        const file_id = response.data.result.video_file_id;
        const fileResponse = await axios.get(`https://api.telegram.org/bot6618648466:AAFGGTIx055y0eCRvq_z3ABqchHfLsqD0M4/getFile?file_id=${file_id}`);
        const filePath = fileResponse.data.result.file_path;
        const videoUrl = `https://api.telegram.org/file/bot6618648466:AAFGGTIx055y0eCRvq_z3ABqchHfLsqD0M4/${filePath}`;

        res.json({ videoUrl });
    } catch (error) {
        console.error(error);
        res.status(500).send('حدث خطأ أثناء رفع الفيديو.');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});