import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AnalysisPage from './pages/AnalysisPage';
import ProcessingOverlay from './components/ProcessingOverlay';

export default function App() {
  const [page, setPage] = useState('landing');
  const [loading, setLoading] = useState(false);

  const handleStartAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPage('analysis');
    }, 4500);
  };

  return (
    <div className="min-h-screen bg-background font-sans text-textMain selection:bg-gold selection:text-background">
      <Navbar onNavigate={setPage} />
      {loading && <ProcessingOverlay />}
      
      {page === 'landing' && <LandingPage onStart={() => setPage('dashboard')} />}
      {page === 'dashboard' && <Dashboard onAnalyze={handleStartAnalysis} />}
      {page === 'analysis' && <AnalysisPage />}
    </div>
  );
}