import { isNonProduction, redactSensitiveInfo } from '@src/utils';

interface Cookie {
  key: string;
  value: string;
}

// Get all cookies
export const interceptCookies = () => {
  const timestamp = Date.now();
  const cookies: Cookie[] = document.cookie.split(';').reduce<Cookie[]>((ac, str) => {
    const [key, value] = str.split('=').map(s => s.trim());

    if (!key) return ac;

    // Add cookie as an object with key and value
    ac.push({
      key,
      value: isNonProduction() ? value : redactSensitiveInfo(key, value),
    });

    return ac;
  }, []);

  window.postMessage(
    {
      type: 'ADD_RECORD',
      payload: { timestamp, recordType: 'cookies', source: 'client', items: cookies },
    },
    '*',
  );
};
