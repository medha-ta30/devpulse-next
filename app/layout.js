import Providers from '@/context/Providers';
import './globals.css';

export const metadata = {
  title: "DevPulse - Developer Analytics Dashboard",
  description: "Developer Analytics Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
