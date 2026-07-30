import { useEffect, useState } from 'react';

// 백엔드 응답 타입 정의
interface TokenData {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
}

interface AuthResponse {
  status: string;
  data: TokenData | null;
}

function App() {
  const [status, setStatus] = useState<string>('로딩 중...');
  const [tokenData, setTokenData] = useState<TokenData | null>(null);

  // 백엔드 API 주소
  const API_URL = 'http://localhost:3000/api/v1/auth/token';

  // 1. 토큰 상태 조회 (GET)
  const fetchTokenStatus = async () => {
    try {
      const res = await fetch(API_URL);
      const json: AuthResponse = await res.json();
      setStatus(json.status);
      setTokenData(json.data);
    } catch (error) {
      setStatus('서버 연결 실패 (백엔드가 켜져 있는지 확인하세요)');
      console.error(error);
    }
  };

  // 컴포넌트가 처음 마운트될 때 상태 조회
  useEffect(() => {
    fetchTokenStatus();
  }, []);

  // 2. 토큰 발급 (POST)
  const handleIssue = async () => {
    await fetch(API_URL, { method: 'POST' });
    fetchTokenStatus(); // 실행 후 상태 새로고침
  };

  // 3. 토큰 재발급 (PUT)
  const handleReissue = async () => {
    await fetch(API_URL, { method: 'PUT' });
    fetchTokenStatus();
  };

  // 4. 토큰 삭제 (DELETE)
  const handleDelete = async () => {
    await fetch(API_URL, { method: 'DELETE' });
    fetchTokenStatus();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
      <h1>토스증권 오픈 API 연동</h1>
      
      <div style={{ padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '1rem' }}>
        <h2>현재 상태: {status}</h2>
        {tokenData && (
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '4px', wordBreak: 'break-all' }}>
            <p><strong>Access Token:</strong> {tokenData.accessToken}</p>
            <p><strong>만료까지:</strong> {tokenData.expiresIn}초</p>
          </div>
        )}
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={handleIssue} style={buttonStyle}>발급하기</button>
        <button onClick={handleReissue} style={buttonStyle}>재발급하기</button>
        <button onClick={handleDelete} style={{ ...buttonStyle, background: '#ff4d4f', color: 'white' }}>삭제하기</button>
      </div>
    </div>
  );
}

// 간단한 버튼 스타일
const buttonStyle = {
  padding: '10px 16px',
  cursor: 'pointer',
  borderRadius: '6px',
  border: '1px solid #ccc',
  background: '#fff',
  color: '#333'
};

export default App;