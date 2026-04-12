import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 상태 관리
  const [serverInfo, setServerInfo] = useState({
    status: 'Checking...',
    message: '서버 상태를 확인하는 중입니다...',
  });
  const [activeTab, setActiveTab] = useState('info');
  const [isLightMode, setIsLightMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 서버 상태 가져오기 (기존 oci-mainpage 로직)
  useEffect(() => {
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

  // 테마 변경 효과 적용
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
      setIsLightMode(true);
    }
  }, []);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  }, [isLightMode]);

  const isOnline = serverInfo.status === 'Online';

  // 준비 중인 서비스 클릭 핸들러
  const handleOfflineServiceClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-gradient"></div>

      <button id="theme-toggle" title="테마 전환" onClick={() => setIsLightMode(!isLightMode)}>
        <i className="fa-regular fa-sun" style={{ display: isLightMode ? 'none' : 'block' }}></i>
        <i className="fa-solid fa-moon" style={{ display: isLightMode ? 'block' : 'none' }}></i>
      </button>

      <div className="container">
        <header className="profile">
          {/* public 폴더에 assets/img/profile.png 경로로 이미지를 넣거나 링크를 수정하세요 */}
          <img src="/assets/img/profile.png" alt="프로필 사진" className="profile-img" />
          <h1 className="profile-name">행국</h1>
          <p className="profile-handle">HANGGOK</p>

          <div className="profile-links">
            <a href="https://www.instagram.com/hs1xh_k/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="https://github.com/alexjeon5" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="https://www.youtube.com/@HANGGOK" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </header>

        <nav className="tabs" role="tablist">
          <button className={`tab ${activeTab === 'info' ? 'active' : ''}`} onClick={() => setActiveTab('info')}>정보</button>
          <button className={`tab ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>서비스</button>
          <button className={`tab ${activeTab === 'plans' ? 'active' : ''}`} onClick={() => setActiveTab('plans')}>타임 라인</button>
        </nav>

        <div className="tab-content-wrapper">
          {/* 정보 탭 */}
          {activeTab === 'info' && (
            <section className="tab-panel active">
              <div className="info-grid">
                <div className="info-column">
                  <h3 className="info-title">Who is HANGGOK?</h3>
                  <div className="info-item">
                    <i className="fa-solid fa-user-circle fa-fw"></i>
                    <div>
                      <span className="info-item-title">닉네임</span>
                      <span className="info-item-value">행국</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fa-solid fa-briefcase fa-fw"></i>
                    <div>
                      <span className="info-item-title">직업</span>
                      <span className="info-item-value">대학생</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fa-solid fa-globe fa-fw"></i>
                    <div>
                      <span className="info-item-title">영문 닉네임</span>
                      <span className="info-item-value">HANGGOK</span>
                    </div>
                  </div>
                </div>
                
                <div className="info-column">
                  <h3 className="info-title">Server Specs</h3>
                  {/* API Fetch 결과를 상태 배지로 연동 */}
                  <div className="info-item">
                    <i className="fa-solid fa-heart-pulse fa-fw"></i>
                    <div>
                      <span className="info-item-title">Backend Status</span>
                      <span className="info-item-value" style={{ color: isOnline ? 'var(--success-color)' : 'var(--danger-color)' }}>
                        {serverInfo.status}
                      </span>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fa-solid fa-clock-rotate-left fa-fw"></i>
                    <div>
                      <span className="info-item-title">Uptime</span>
                      <span className="info-item-value">
                        {serverInfo.uptime 
                          ? `${Math.floor(serverInfo.uptime / 3600)}h ${Math.floor((serverInfo.uptime % 3600) / 60)}m` 
                          : 'Unknown'}
                      </span>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fa-brands fa-raspberry-pi fa-fw"></i>
                    <div>
                      <span className="info-item-title">Hardware</span>
                      <span className="info-item-value">Raspberry Pi 3B</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <i className="fa-brands fa-docker fa-fw"></i>
                    <div>
                      <span className="info-item-title">System</span>
                      <span className="info-item-value">Docker Containers</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 서비스 탭 */}
          {activeTab === 'projects' && (
            <section className="tab-panel active">
              <div className="card-container">
                <div className="card">
                  <div className="card-content">
                    <h3>Tistory Blog</h3>
                    <p>HANGGOK의 IT 블로그</p>
                  </div>
                  <a href="https://blog.hanggok.com/" className="card-link"><i className="fa-solid fa-link"></i></a>
                </div>
                
                <div className="card">
                  <div className="card-content">
                    <h3>Favorite KNU Place</h3>
                    <p>내가 뽑은 경북대 주변 맛집 지도</p>
                    <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>* 네이버 로그인이 필요할 수 있어요.</p>
                  </div>
                  <a href="/myKNUplace/" className="card-link"><i className="fa-solid fa-link"></i></a>
                </div>

                <div className="card inactive-card">
                  <span className="status-badge offline">Offline</span>
                  <div className="card-content">
                    <h3>HANGGOK Drive</h3>
                    <p>NAS 드라이브 (개인용)</p>
                  </div>
                  <a href="#" onClick={handleOfflineServiceClick} className="card-link srv-error"><i className="fa-solid fa-link"></i></a>
                </div>

                <div className="card card-wide-half">
                  <div className="card-content">
                    <h3>Admin Console</h3>
                    <p>서버 관리자 전용</p>
                  </div>
                  <a href="/admin/" className="card-link"><i className="fa-solid fa-link"></i></a>
                </div>
              </div>
            </section>
          )}

          {/* 타임라인 탭 (React에서는 Marked 라이브러리 대신 정적으로 구성하거나 react-markdown 사용 권장) */}
          {activeTab === 'plans' && (
            <section className="tab-panel active">
              <div className="info-grid">
                <div id="plans-content">
                  <p style={{ color: 'var(--text-color-secondary)' }}>타임라인 데이터를 불러오거나 여기에 작성하세요.</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* 모달 창 UI */}
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`} onClick={() => setIsModalOpen(false)}></div>
      <div className={`modal-window ${isModalOpen ? 'active' : ''}`}>
        <h2><i className="fa-solid fa-triangle-exclamation"></i> 알림</h2>
        <p>현재 준비 중인 서비스입니다.<br/>조금만 기다려주세요!</p>
        <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>확인</button>
      </div>

      <footer>
        <p>Last Update: 2026.03.24</p>
        <p>&copy; 2026 HANGGOK. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default App;