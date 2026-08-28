import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AnalysisPage from './pages/AnalysisPage';
import ArchivePage from './pages/ArchivePage';
import ProcessingOverlay from './components/ProcessingOverlay';

export default function App() {
  const [page, setPage] = useState('landing');
  const [loading, setLoading] = useState(false);

  // Start with empty archive or retrieve saved items from LocalStorage
  const [archivedManuscripts, setArchivedManuscripts] = useState(() => {
    const saved = localStorage.getItem('manuscript_archive');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist items to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('manuscript_archive', JSON.stringify(archivedManuscripts));
  }, [archivedManuscripts]);

  // Save new manuscript dynamically and navigate to Archive
  const handleVerifyAndSave = (newManuscript) => {
    const manuscriptToAdd = {
      id: `MS-${Math.floor(100 + Math.random() * 900)}`,
      title: newManuscript?.title || 'The Tale of the Mutiny',
      author: newManuscript?.author || 'Nawab Wazir Ali Khan Bahadur Nasrat Jang',
      language: newManuscript?.language || 'Persian / Urdu',
      script: newManuscript?.script || 'Perso-Arabic',
      content: newManuscript?.content || newManuscript?.extractedText || 'Verified manuscript text.',
      isVerified: true,
      status: 'VERIFIED',
      updatedAt: new Date().toISOString()
    };

    setArchivedManuscripts((prev) => [manuscriptToAdd, ...prev]);
    setPage('archive');
  };

  const handleStartAnalysis = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPage('analysis');
    }, 3500);
  };

  const handleNavigate = (targetPage) => {
    if (targetPage === 'digitize') {
      handleStartAnalysis();
    } else {
      setPage(targetPage);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-textMain selection:bg-gold selection:text-background pt-24">
      <Navbar onNavigate={handleNavigate} />

      {loading && <ProcessingOverlay />}

      {page === 'landing' && <LandingPage onStart={handleStartAnalysis} />}
      {page === 'dashboard' && <Dashboard />}
      {page === 'analysis' && (
        <AnalysisPage onVerifyAndSave={handleVerifyAndSave} />
      )}
      {page === 'archive' && (
        <ArchivePage manuscripts={archivedManuscripts} />
      )}
    </div>
  );
}