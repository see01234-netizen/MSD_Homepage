
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// 시스템 오류 발생 시 화면에 표시하는 함수
const showError = (msg: string) => {
  const root = document.getElementById('root');
  if (root) {
    root.innerHTML = `
      <div style="display: flex; height: 100vh; align-items: center; justify-content: center; background: #111827; color: #C5A059; font-family: sans-serif; text-align: center; padding: 20px;">
        <div style="max-width: 600px;">
          <h1 style="font-size: 24px; font-weight: 900; margin-bottom: 15px; border-bottom: 2px solid #C5A059; padding-bottom: 10px; color: #ef4444;">APPLICATION ERROR</h1>
          <p style="color: #d1d5db; margin-bottom: 15px; line-height: 1.6;">애플리케이션 실행 중 문제가 발생했습니다.<br>아래 에러 메시지를 확인해주세요.</p>
          <div style="background: rgba(0, 0, 0, 0.3); border: 1px solid #374151; padding: 20px; border-radius: 8px; font-size: 13px; color: #f87171; text-align: left; overflow: auto; max-height: 300px; margin-bottom: 25px; white-space: pre-wrap; word-break: break-all;">
            <code>${msg}</code>
          </div>
          <button onclick="window.location.reload()" style="background: #C5A059; color: #000; border: none; padding: 12px 30px; border-radius: 4px; font-weight: 900; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; transition: all 0.2s;">페이지 새로고침</button>
        </div>
      </div>
    `;
  }
};

// 전역 에러 캐치 (동기 에러)
window.onerror = (message, source, lineno, colno, error) => {
  console.error("Critical Runtime Error:", message);
  showError(`Runtime Error: ${message}\nSource: ${source}:${lineno}:${colno}`);
};

// 전역 에러 캐치 (비동기/Promise 에러 - 모듈 로딩 실패 등)
window.addEventListener('unhandledrejection', (event) => {
  console.error("Unhandled Rejection:", event.reason);
  showError(`Async Error: ${event.reason?.message || event.reason}`);
});

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
