import React from 'react';
import Header from './Header';
import Footer from './Footer';

export interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-6 md:px-6 md:py-8 w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
}
