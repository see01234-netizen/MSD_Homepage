import React, { useEffect, ErrorInfo, ReactNode, Component } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Business from './pages/Business.tsx';
import Performance from './pages/Performance.tsx';
import Contact from './pages/Contact.tsx';
import Login from './pages/Login.tsx';
import Admin from './pages/Admin.tsx';

// ScrollToTop component to reset scroll on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// Simple Error Boundary to catch render errors
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("React Error Boundary caught:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6 text-center">
          <div className="max-w-md w-full bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl">
            <h2 className="text-2xl font-black mb-4 text-primary tracking-tight uppercase">Rendering Error</h2>
            <p className="mb-6 text-gray-400 text-sm leading-relaxed">
              화면을 그리는 도중 문제가 발생했습니다.<br/>
              문제가 지속되면 관리자에게 문의해주세요.
            </p>
            <div className="bg-black/30 p-4 rounded text-left mb-6 overflow-auto max-h-40">
                <code className="text-xs text-red-400 font-mono">{this.state.error?.message}</code>
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="w-full px-6 py-3 bg-primary hover:bg-yellow-400 text-black font-bold rounded transition-colors"
            >
              새로고침
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/business" element={<Business />} />
              <Route path="/performance" element={<Performance />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;