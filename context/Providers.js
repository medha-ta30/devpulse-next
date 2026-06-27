'use client';

import { AuthProvider } from './AuthContext';
import { ThemeProvider } from './ThemeContext';

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
