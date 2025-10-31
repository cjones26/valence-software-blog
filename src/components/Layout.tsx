import React from 'react';
import Link from 'next/link';
import { FaEnvelope, FaGithub, FaLinkedin, FaRegArrowAltCircleLeft } from 'react-icons/fa';
import LightDarkToggle from './LightDarkToggle';

type LayoutSource = 'index' | 'post' | 'about';

export interface LayoutProps {
  children: React.ReactNode;
  layoutSource: LayoutSource;
  postTitle?: string;
  postDate?: string;
}

export default function Layout({ children, layoutSource, postTitle, postDate }: LayoutProps) {
  const title = 'Valence Software';
  const description = 'Technical blog covering software development, system administration, and troubleshooting.';

  const generateAbout = (className?: string) => (
    <Link href="/about">
      <img src="/profile-image-small.jpg" alt="About Charles Jones" className={className} width="48" />
    </Link>
  );

  const generateHeader = () => {
    const defaultLayout = (
      <div>
        <div className="hidden lg:flex lg:fixed lg:top-1 lg:left-8 lg:my-0">{generateAbout('rounded-full')}</div>
        <div className="flex justify-between">
          <h1>{title}</h1>
          <div className="flex flex-shrink-0">
            <LightDarkToggle />
            {generateAbout('rounded-full my-0 self-start lg:hidden')}
          </div>
        </div>
        <h3 className="m-0">{description}</h3>
      </div>
    );

    switch (layoutSource) {
      case 'index':
        return defaultLayout;
      case 'post':
        return (
          <>
            <div className="flex justify-between mb-3">
              <Link className="all-articles" type="button" href="/">
                All Articles
              </Link>
              <Link className="text-4xl lg:hidden flex" type="button" href="/">
                <FaRegArrowAltCircleLeft />
              </Link>
              <div className="flex flex-shrink-0 lg:pr-0 lg:fixed lg:top-8 lg:right-8 lg:my-0;">
                <LightDarkToggle isPostOrAbout />
              </div>
            </div>
            <h1 className="text-center">{postTitle}</h1>
            <div className="flex justify-center">{generateAbout('rounded-full my-0')}</div>
            <p className="mb-0 text-center">{postDate}</p>
          </>
        );
      case 'about':
        return (
          <div>
            <div className="flex justify-between mb-3">
              <Link className="all-articles" type="button" href="/">
                All Articles
              </Link>
              <Link className="text-4xl lg:hidden flex" type="button" href="/">
                <FaRegArrowAltCircleLeft />
              </Link>
              <div className="flex flex-shrink-0">
                <LightDarkToggle isPostOrAbout />
              </div>
            </div>
            <h1 className="text-center">{title}</h1>
          </div>
        );
      default:
        return defaultLayout;
    }
  };

  return (
    <div className="layout">
      <header role="banner">{generateHeader()}</header>
      <main className="main-content">{children}</main>
      <footer className="footer-content">
        <ul className="flex items-center my-0">
          <li className="p-4">
            <a className="sm-email" href="mailto:charlie.l.jones@gmail.com" aria-label="Email Me">
              <FaEnvelope />
            </a>
          </li>
          <li className="p-4">
            <a
              className="sm-github"
              href="https://www.github.com/cjones26"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </li>
          <li className="p-4">
            <a
              className="sm-linkedin"
              href="https://www.linkedin.com/in/charlesljones"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </li>
        </ul>
        <p className="p-4">
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
            ©{new Date().getFullYear()} Charles Jones - CC BY 4.0.
          </a>
        </p>
      </footer>
    </div>
  );
}
