import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToBlog from './BackToBlog';

export interface LayoutProps {
  children: React.ReactNode;
  showBackToBlog?: boolean;
}

export default function Layout({ children, showBackToBlog = true }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-6 md:px-6 md:py-8 w-full">
        {showBackToBlog && <BackToBlog />}
        {children}
      </main>
      <Footer />
    </div>
  );
}
