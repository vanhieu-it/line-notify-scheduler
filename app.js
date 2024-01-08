const axios = require('axios');
const schedule = require('node-schedule');
require('dotenv').config(); // Đọc biến môi trường từ file .env

const accessToken = process.env.ACCESS_TOKEN; // Sử dụng biến môi trường
const notifyEndpoint = 'https://notify-api.line.me/api/notify';
const message = 'Lịch nhắc: Bây giờ là 10h30p';

const job = schedule.scheduleJob('30 10 * * *', () => {
    axios.post(
        notifyEndpoint,
        `message=${message}`,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${accessToken}`
            }
        }
    )
        .then(response => {
            console.log('Thành công:', response.data);
        })
        .catch(error => {
            console.error('Lỗi:', error.response.data);
        });
});

console.log('Đã đặt lịch gửi thông báo hàng ngày.');
