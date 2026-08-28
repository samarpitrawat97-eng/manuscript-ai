import { verifyManuscript } from '../api'; // or adjust import path to api.js

export function VerificationPanel({ manuscript, onVerified }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerify = async () => {
    setIsSubmitting(true);
    try {
      const result = await verifyManuscript(manuscript.id, manuscript);
      if (onVerified) onVerified(result);
    } catch (err) {
      alert('Verification failed!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <button 
      onClick={handleVerify} 
      disabled={isSubmitting}
      className="verify-btn"
    >
      {isSubmitting ? 'Saving...' : 'Verify & Save Results'}
    </button>
  );
}