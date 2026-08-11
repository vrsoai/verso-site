import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { sendTokensToExtension, getExtensionId } from '@/lib/extension-bridge';

type Status = 'loading' | 'success' | 'error';

const AuthCallback = () => {
  const [status, setStatus] = useState<Status>('loading');
  const [message, setMessage] = useState('Processing sign-in...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error || !data.session) {
          console.error('Verso: Auth callback error:', error);
          setStatus('error');
          setMessage(error?.message || 'Failed to complete sign-in. Please try again.');
          return;
        }

        const session = data.session;
        const params = new URLSearchParams(window.location.search);
        const isExtension = params.get('extension') === 'true';

        if (isExtension) {
          setMessage('Sending credentials to Verso extension...');

          const extId = getExtensionId() || undefined;
          const sent = await sendTokensToExtension(
            session.access_token,
            session.refresh_token,
            session.user,
            extId
          );

          if (sent) {
            setStatus('success');
            setMessage('Sign-in successful! Closing...');
            setTimeout(() => window.close(), 500);
            setTimeout(() => {
              setMessage('Sign-in successful! You can close this tab.');
            }, 1500);
          } else {
            setStatus('success');
            setMessage('Signed in successfully. If the extension didn\'t update, please reopen it.');
          }
        } else {
          setStatus('success');
          setMessage('Sign-in successful!');
        }
      } catch (e) {
        console.error('Verso: Auth callback error:', e);
        setStatus('error');
        setMessage('Something went wrong. Please try again.');
      }
    };

    handleCallback();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ background: 'var(--card)', borderRadius: 'var(--r)', boxShadow: 'var(--sh)', padding: '40px 32px', maxWidth: 380, width: '100%', margin: '0 16px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, marginBottom: 8 }}>
          {status === 'loading' && 'Signing in...'}
          {status === 'success' && 'Welcome to Verso'}
          {status === 'error' && 'Sign-in failed'}
        </h1>

        <p style={{ fontSize: 14, marginBottom: 24, color: status === 'error' ? '#cc3a21' : 'var(--soft)' }}>
          {message}
        </p>

        {status === 'loading' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: 24, height: 24, border: '2px solid var(--line)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          </div>
        )}

        {status === 'success' && (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
        )}

        {status === 'error' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button
              onClick={() => window.location.href = '/auth' + window.location.search}
              className="btn btn-blue btn-sm"
            >
              Try again
            </button>
            <button
              onClick={() => window.close()}
              style={{ padding: '8px 16px', fontSize: 14, color: 'var(--soft)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Close
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default AuthCallback;
