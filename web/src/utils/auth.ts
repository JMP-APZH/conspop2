// token storage in a dedicated auth.ts utility

export const setToken = (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  };