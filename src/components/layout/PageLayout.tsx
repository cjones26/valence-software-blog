import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToBlog from '../blog/BackToBlog';

export interface PageLayoutProps {
  children: React.ReactNode;
  showBackToBlog?: boolean;
}

export default function PageLayout({ children, showBackToBlog = true }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-3xl mx-auto px-4 md:px-6 section-padding w-full">
        {showBackToBlog && <BackToBlog />}
        {children}
      </main>
      <Footer />
    </div>
  );
}
