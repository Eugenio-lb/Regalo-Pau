// Cookie-based auth storage for iOS PWA compatibility
export function setAuthCookie(token: string, user: any) {
  // Set token cookie (expires in 30 days)
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 30);
  
  document.cookie = `auth_token=${encodeURIComponent(token)}; path=/; expires=${expiryDate.toUTCString()}; SameSite=Lax`;
  document.cookie = `auth_user=${encodeURIComponent(JSON.stringify(user))}; path=/; expires=${expiryDate.toUTCString()}; SameSite=Lax`;
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
