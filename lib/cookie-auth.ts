// Cookie-based auth storage for iOS PWA compatibility
export function setAuthCookie(token: string, user: any) {
  // For iOS PWA, we need max-age instead of expires
  const maxAge = 30 * 24 * 60 * 60; // 30 days in seconds
  
  // Use Secure only in production (HTTPS)
  const isProduction = typeof window !== 'undefined' && window.location.protocol === 'https:';
  const secureFlag = isProduction ? '; Secure' : '';
  
  document.cookie = `auth_token=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; SameSite=Lax${secureFlag}`;
  document.cookie = `auth_user=${encodeURIComponent(JSON.stringify(user))}; path=/; max-age=${maxAge}; SameSite=Lax${secureFlag}`;
}

export function getAuthCookie() {
  const cookies = document.cookie.split('; ');
  let token = null;
  let user = null;

  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === 'auth_token') {
      token = decodeURIComponent(value);
    }
    if (name === 'auth_user') {
      try {
        user = JSON.parse(decodeURIComponent(value));
      } catch (e) {
        // Invalid JSON
      }
    }
  }

  return token ? { token, user } : null;
}

export function clearAuthCookie() {
  document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
  document.cookie = 'auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
}
