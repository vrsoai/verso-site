// Extension Bridge — communicates with the Verso Chrome extension
// Uses chrome.runtime.sendMessage via externally_connectable

declare global {
  interface Window {
    chrome?: typeof chrome;
  }
}

declare const chrome: {
  runtime?: {
    sendMessage: (
      extensionId: string,
      message: unknown,
      callback: (response: { success?: boolean } | undefined) => void
    ) => void;
    lastError?: {
      message: string;
    };
  };
};

const DEFAULT_EXTENSION_ID = 'celmibcnighdegjjcipimmdkjikhkdjm';

interface VersoAuthPayload {
  type: 'verso-auth-tokens';
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email?: string;
    user_metadata?: Record<string, unknown>;
  };
}

/**
 * Send auth tokens to the Verso extension after successful Google OAuth.
 * Uses the ext_id from URL params (passed by the extension) to support
 * both local dev and published extension IDs.
 * Returns true if the extension received the message, false if not installed or unavailable.
 */
export async function sendTokensToExtension(
  accessToken: string,
  refreshToken: string,
  user: VersoAuthPayload['user'],
  extensionId?: string
): Promise<boolean> {
  try {
    if (typeof chrome === 'undefined' || !chrome.runtime?.sendMessage) {
      console.log('Verso: Chrome runtime not available — not in Chrome or extension not installed');
      return false;
    }

    const targetId = extensionId || DEFAULT_EXTENSION_ID;

    const payload: VersoAuthPayload = {
      type: 'verso-auth-tokens',
      access_token: accessToken,
      refresh_token: refreshToken,
      user,
    };

    return new Promise((resolve) => {
      chrome.runtime.sendMessage(targetId, payload, (response) => {
        if (chrome.runtime.lastError) {
          console.log('Verso: Extension not reachable —', chrome.runtime.lastError.message);
          resolve(false);
          return;
        }
        resolve(response?.success === true);
      });
    });
  } catch (e) {
    console.error('Verso: sendTokensToExtension error:', e);
    return false;
  }
}

/**
 * Check if query params indicate this is an extension-initiated auth flow.
 */
export function isExtensionAuthFlow(): boolean {
  const params = new URLSearchParams(window.location.search);
  return params.get('extension') === 'true';
}

/**
 * Get the ext_id from query params (the extension's chrome.runtime.id).
 */
export function getExtensionId(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('ext_id');
}

/**
 * Get the instance_id from query params (passed by the extension).
 */
export function getExtensionInstanceId(): string | null {
  const params = new URLSearchParams(window.location.search);
  return params.get('instance_id');
}
