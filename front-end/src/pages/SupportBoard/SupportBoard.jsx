import  { useState } from 'react';
import './SupportBoard.css';

const SupportBoard = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/support', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      setSuccess(true);
      setMessage('');
    } catch (error) {
      console.error('Error fetch:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="support-board">
      <div className="support-form">
        <h2>Request for help</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={message}
            onChange={handleChange}
            placeholder="Your message"
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </form>
        {success && <p>Your request has been sent!</p>}
      </div>
    </div>
  );
};

export default SupportBoard;
