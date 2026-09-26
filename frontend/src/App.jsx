import React, { useState } from 'react';

import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AnalysisPage from './pages/AnalysisPage';
import AboutPage from './pages/AboutPage';
import ProcessingOverlay from './components/ProcessingOverlay';

import { analyzeManuscript } from './api';

export default function App() {
  const [page, setPage] = useState('landing');

  const [analysis, setAnalysis] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(
      'Enhancing Image'
  );
  const [error, setError] = useState('');

  function handleStart() {
    setPage('dashboard');
  }

  async function handleStartAnalysis(file) {
    if (!file) {
      return;
    }

    setSelectedFile(file);
    setAnalysis(null);
    setError('');
    setCurrentStep('Enhancing Image');
    setLoading(true);

    try {
      const result = await analyzeManuscript(
          file,
          (event) => {
            if (event.type === 'progress') {
              setCurrentStep(event.step);
            }
          }
      );

      setAnalysis(result);
      setLoading(false);
      setPage('analysis');
    } catch (err) {
      setError(
          err.message || 'Manuscript analysis failed.'
      );
      setLoading(false);
    }
  }

  function handleVerified(savedManuscript) {
    setAnalysis((current) => ({
      ...current,
      ...savedManuscript,
      status: savedManuscript.status,
    }));
  }

  const imageUrl = selectedFile
      ? URL.createObjectURL(selectedFile)
      : null;

  return (
      <div className="min-h-screen bg-background font-sans text-textMain selection:bg-gold selection:text-background">
        <Navbar onNavigate={setPage} />

        {loading && (
            <ProcessingOverlay
                currentStep={currentStep}
                error={error}
                onCancel={() => {
                  setLoading(false);
                  setError('');
                }}
            />
        )}

        {!loading && page === 'landing' && (
            <LandingPage onStart={handleStart} />
        )}

        {!loading && page === 'dashboard' && (
            <Dashboard
                onAnalyze={handleStartAnalysis}
            />
        )}

        {!loading && page === 'analysis' && analysis && (
            <AnalysisPage
                analysis={analysis}
                imageUrl={imageUrl}
                onVerified={handleVerified}
            />
        )}

        {!loading && page === 'about' && (
            <AboutPage
                onNavigate={setPage}
            />
        )}
      </div>
  );
}