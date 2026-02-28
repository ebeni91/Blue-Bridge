import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Blue Bridge Platform',
  description: 'Cluster demand-driven agricultural platform in Ethiopia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">{children}</body>
    </html>
  );
}