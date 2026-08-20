import { FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center px-6 py-8 border-t border-blue-200 dark:border-slate-700 bg-slate-50 dark:bg-vs-bg-deep mt-auto">
      <ul className="flex items-center gap-6 list-none p-0 m-0 mb-6">
        <li>
          <a
            href="https://www.github.com/cjones26"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <FaGithub />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/charlesljones"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
          >
            <FaLinkedin />
          </a>
        </li>
        <li>
          <a
            href="https://stackoverflow.com/users/596505/cjones26"
            aria-label="Stack Overflow"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
          >
            <FaStackOverflow />
          </a>
        </li>
      </ul>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center m-0">
        ©<span suppressHydrationWarning>{new Date().getFullYear()}</span> Charles Jones. All rights reserved.
      </p>
    </footer>
  );
}
