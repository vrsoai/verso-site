import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { isExtensionAuthFlow } from '@/lib/extension-bridge';

const Auth = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startOAuth = async () => {
      try {
        // Preserve extension query params through the OAuth redirect
        const callbackUrl = new URL('/auth/callback', window.location.origin);
        if (isExtensionAuthFlow()) {
          callbackUrl.searchParams.set('extension', 'true');
          const params = new URLSearchParams(window.location.search);
          const instanceId = params.get('instance_id');
          if (instanceId) {
            callbackUrl.searchParams.set('instance_id', instanceId);
          }
          const extId = params.get('ext_id');
          if (extId) {
            callbackUrl.searchParams.set('ext_id', extId);
          }
        }

        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: callbackUrl.toString(),
          },
        });

        if (error) {
          console.error('Verso: OAuth error:', error);
          setError(error.message);
          setLoading(false);
        }
      } catch (e) {
        console.error('Verso: Auth init error:', e);
        setError('Something went wrong. Please try again.');
        setLoading(false);
      }
    };

    startOAuth();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ background: 'var(--card)', borderRadius: 'var(--r)', boxShadow: 'var(--sh)', padding: '40px 32px', maxWidth: 380, width: '100%', margin: '0 16px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 500, marginBottom: 8 }}>Sign in to Verso</h1>

        {loading && !error && (
          <>
            <p style={{ fontSize: 14, color: 'var(--soft)', marginBottom: 24 }}>Redirecting to Google...</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 24, height: 24, border: '2px solid var(--line)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
            </div>
          </>
        )}

        {error && (
          <>
            <p style={{ fontSize: 14, color: '#cc3a21', marginBottom: 16 }}>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-blue btn-sm"
            >
              Try again
            </button>
          </>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default Auth;
