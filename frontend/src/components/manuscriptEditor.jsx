// src/components/ManuscriptEditor.jsx
import React, { useState } from 'react';
import { verifyManuscript } from '../api/manuscripts'; // adjust import path as needed

export function ManuscriptEditor({ manuscript }) {
  const [formData, setFormData] = useState(manuscript || {});
  const [status, setStatus] = useState(manuscript?.status || 'PENDING');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derived state to check if manuscript is verified
  const isVerified = status === 'VERIFIED';

  const handleVerify = async () => {
    setIsSubmitting(true);
    try {
      const updatedData = await verifyManuscript(formData.id, formData);
      setStatus(updatedData.status || 'VERIFIED');
    } catch (error) {
      console.error('Verification failed:', error);
      alert('Verification failed. Please check the backend connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="manuscript-container">
      {/* Task 6: Display badge if status is VERIFIED */}
      {isVerified ? (
        <div className="status-badge verified">
          ✓ Digitally Archived
        </div>
      ) : (
        <button 
          onClick={handleVerify} 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Verifying...' : 'Verify Manuscript'}
        </button>
      )}

      {/* Form Fields: Read-only / Disabled if verified */}
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Title</label>
        <input
          type="text"
          value={formData.title || ''}
          disabled={isVerified}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />

        <label>Content</label>
        <textarea
          value={formData.content || ''}
          disabled={isVerified}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        />
      </form>
    </div>
  );
}