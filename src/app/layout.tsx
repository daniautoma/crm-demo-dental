import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Clínica Dental Dra. Bianca | Odontología Especializada & Estética Dental',
  description: 'Sistema oficial de gestión clínica dental, citas odontológicas y WhatsApp multiagente con IA de la Dra. Bianca.',
  icons: {
    icon: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
