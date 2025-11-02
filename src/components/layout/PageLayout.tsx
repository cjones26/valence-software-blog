import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToBlog from '../blog/BackToBlog';

export interface PageLayoutProps {
  children: React.ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-6 md:px-6 md:py-8 w-full">
        <BackToBlog />
        {children}
      </main>
      <Footer />
    </div>
  );
}
