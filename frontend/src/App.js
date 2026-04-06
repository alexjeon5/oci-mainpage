import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [serverInfo, setServerInfo] = useState({
    status: 'Checking...',
    message: '서버 상태를 확인하는 중입니다...',
  });

  useEffect(() => {
    // Docker 환경에서는 백엔드 컨테이너 혹은 리버스 프록시 주소에 맞게 조정이 필요할 수 있습니다.
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => setServerInfo(data))
      .catch((err) => {
        setServerInfo({
          status: 'Offline',
          message: '서버에 연결할 수 없습니다. 유지보수 중이거나 꺼져있습니다.',
        });
      });
  }, []);

  const isOnline = serverInfo.status === 'Online';

  return (
    <div className="container">
      <header className="header">
        <h1>Hanggok Server</h1>
        <p>개인 프로젝트, 컨테이너 및 서비스를 호스팅하는 허브입니다.</p>
      </header>

      <main>
        <div className={`status-card ${isOnline ? 'online' : 'offline'}`}>
          <h2>System Status</h2>
          <div className="info-row">
            <strong>상태:</strong>
            <span className="status-indicator"></span>
            {serverInfo.status}
          </div>
          <div className="info-row">
            <strong>메시지:</strong> {serverInfo.message}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;