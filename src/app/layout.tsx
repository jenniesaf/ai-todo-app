import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import { TaskProvider } from '@/context/TaskContext';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Todo App',
  description: 'A modern task management application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <AuthProvider>
          <TaskProvider>{children}</TaskProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
