import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { StoreHydration } from '@/components/providers/StoreHydration';

export const metadata: Metadata = {
  title: 'مساعد المحاسبة - تعلّم كيف تفكر كمحاسب',
  description: 'تطبيق تعليمي تفاعلي يعلمك التفكير المحاسبي بطريقة احترافية',
  applicationName: 'مساعد المحاسبة',
  keywords: ['محاسبة', 'تعليم', 'قيود محاسبية', 'تحليل مالي', 'Arabic Accounting'],
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFBFE' },
    { media: '(prefers-color-scheme: dark)', color: '#141218' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className="font-cairo">
        <ThemeProvider>
          <StoreHydration />
          <div className="min-h-screen bg-surface dark:bg-[#141218] text-on-surface dark:text-white">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
