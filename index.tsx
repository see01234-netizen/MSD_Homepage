import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// 시스템 오류 발생 시 화면에 표시하는 함수
const showError = (msg: string) => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="display: flex; height: 100vh; align-items: center; justify-content: center; background: #111827; color: #C5A059; font-family: sans-serif; text-align: center; padding: 20px;">
        <div style="max-width: 500px;">
          <h1 style="font-size: 28px; font-weight: 900; margin-bottom: 15px; border-bottom: 2px solid #C5A059; padding-bottom: 10px;">SYSTEM ERROR</h1>
          <p style="color: #d1d5db; margin-bottom: 25px; line-height: 1.6;">라이브러리 로드 중 충돌이 발생했습니다.<br>브라우저를 새로고침하거나 캐시를 삭제해 주세요.</p>
          <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; padding: 15px; border-radius: 8px; font-size: 13px; color: #ef4444; text-align: left; overflow: auto; max-height: 200px;">
            <code>${msg}</code>
          </div>
          <button onclick="window.location.reload()" style="margin-top: 30px; background: #C5A059; color: #000; border: none; padding: 15px 35px; border-radius: 4px; font-weight: 900; cursor: pointer; text-transform: uppercase; letter-spacing: 2px;">Refresh Page</button>
        </div>
      </div>
    `;
  }
};

// 전역 에러 캐치
window.onerror = (message) => {
  console.error("Critical Runtime Error:", message);
  showError(String(message));
};

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("Mirea Gonggan Development app started.");
  } catch (err) {
    console.error("Mounting error:", err);
    showError(String(err));
  }
} else {
  console.error("Root element (#root) not found in the HTML.");
}