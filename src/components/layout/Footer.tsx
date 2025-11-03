import { FaGithub, FaLinkedin, FaStackOverflow } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="flex flex-col items-center py-8 border-t border-blue-200 dark:border-slate-700 mt-auto">
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
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
        >
          ©<span suppressHydrationWarning>{new Date().getFullYear()}</span> Charles Jones - CC BY 4.0
        </a>
      </p>
    </footer>
  );
}
