const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors());
require('dotenv').config();
const currentTime = new Date();


const allowedOrigins = [
    'http://localhost:3000',

];
const corsOptions = {
    // origin: (origin, callback) => {
    //     // Kiểm tra xem origin có trong danh sách được phép hay không
    //     if (!origin || allowedOrigins.indexOf(origin) !== -1) {
    //         callback(null, true);
    //     } else {
    //         callback(new Error('Not allowed by CORS'));
    //     }
    // },
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// API endpoint
app.get('/send-notification', (req, res) => {
    const content = req.query.content;
    const accessToken = process.env.ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN';
    const notifyEndpoint = 'https://notify-api.line.me/api/notify';
    const currentTimeVN = new Date().toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });
    axios.post(
        notifyEndpoint,
        `message=${content}`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )
        .then(response => {
            res.status(200).json({ success: true, message: 'Thông báo đã được gửi!' });
            console.log(`Thông báo đã được gửi!: ${currentTimeVN}`);
        })
        .catch(error => {
            console.error('Lỗi:', error.response.data);
            res.status(500).json({ success: false, message: 'Lỗi gửi thông báo!' });
            console.log(`Lỗi gửi thông báo!: ${currentTimeVN}`);
        });
});

// Lắng nghe các yêu cầu
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = app;