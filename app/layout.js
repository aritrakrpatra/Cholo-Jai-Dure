import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import DOBModal from "./components/DOBModal";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: "Cholo Jai Dure",
  description: "Your Journey, Our Priority",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var preference = localStorage.getItem('cholo-jai-dure-theme');
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var theme = preference === 'light' || preference === 'dark' ? preference : (systemDark ? 'dark' : 'light');
                  var root = document.documentElement;
                  root.dataset.theme = theme;
                  root.dataset.themePreference = preference || 'system';
                  root.style.colorScheme = theme;
                } catch (error) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <ThemeProvider>
            <AuthProvider>
              <DOBModal />
              {children}
            </AuthProvider>
          </ThemeProvider>
        </ClerkProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
