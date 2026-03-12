import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'F-SHOP | Streetwear Mali',
  description: 'Trendy teen streetwear in Mali'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 border-b border-white/10 bg-black/90 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <Link href="/" className="text-2xl font-black tracking-wider text-neon">F-SHOP</Link>
            <div className="flex gap-4 text-sm">
              <Link href="/products">Shop</Link>
              <Link href="/cart">Cart</Link>
              <Link href="/admin/login">Admin</Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl p-4">{children}</main>
      </body>
    </html>
  );
}
