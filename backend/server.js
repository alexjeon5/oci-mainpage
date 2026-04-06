const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 서버 상태를 반환하는 간단한 API 엔드포인트
app.get('/api/status', (req, res) => {
  res.json({
    status: 'Online',
    message: '환영합니다! Hanggok 홈 서버가 정상적으로 작동 중입니다.',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});