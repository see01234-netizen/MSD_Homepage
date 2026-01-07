
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 관리자 계정 정보 업데이트: msd2023 / 00000000
    if (id === 'msd2023' && password === '00000000') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
    } else {
      setError('아이디 또는 비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 px-4">
      <div className="max-w-md w-full bg-gray-700 rounded-xl shadow-2xl border border-gray-600 p-10 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-primary"></div>
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-gray-100 tracking-tighter mb-2">ADMIN LOGIN</h2>
          <p className="text-gray-300 text-sm">관리자 계정으로 접속해 실적을 관리하세요.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-300 text-xs font-bold uppercase tracking-widest mb-2">Admin ID</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full bg-gray-600 border border-gray-500 rounded-lg py-3 pl-10 pr-4 text-gray-200 focus:outline-none focus:border-primary transition-colors"
                placeholder="아이디를 입력하세요"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 text-xs font-bold uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-600 border border-gray-500 rounded-lg py-3 pl-10 pr-4 text-gray-200 focus:outline-none focus:border-primary transition-colors"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-yellow-300 text-black font-black py-4 rounded-lg flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02]"
          >
            <LogIn size={20} />
            로그인하기
          </button>
        </form>

        <div className="mt-10 text-center">
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-gray-100 text-sm transition-colors">
            홈으로 돌아가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;