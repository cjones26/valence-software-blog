import Image from 'next/image';
import PageLayout from '@/components/layout/PageLayout';

export const metadata = {
  title: 'About',
  description: 'About Charles Jones',
};

export default function AboutPage() {
  return (
    <PageLayout>
      <article className="max-w-3xl mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col items-center mb-12">
          <div className="mb-8">
            <Image
              src="/profile-image-large.jpg"
              alt="Charles Jones"
              width={200}
              height={200}
              className="rounded-full"
              style={{ width: 'auto', height: 'auto' }}
              preload
              quality={100}
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
            👋 Hi, I&apos;m Charles Jones
          </h1>

          <p className="text-xl text-center text-gray-600 dark:text-gray-400">
            Staff Software Engineer based in Virginia
          </p>
        </div>

        {/* Content Section */}
        <div className="space-y-16">
          {/* What I Do */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              What I Do
            </h2>
            <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                As a seasoned engineer, my focus is on end-to-end system delivery
                across desktop and mobile environments, specializing in React and
                React Native development. My ability to deliver robust,
                high-performing apps is underpinned by career-long experience in
                large-scale infrastructure automation, where I developed and
                deployed custom applications and scripts to manage provisioning
                and maintenance for thousands of endpoints and servers.
              </p>
            </div>
          </section>

          {/* The Journey */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              The Journey
            </h2>
            <div className="relative">
              {/* Timeline vertical line */}
              <div className="absolute left-[7px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-blue-500 dark:from-blue-400 dark:via-blue-500 dark:to-blue-400"></div>

              <div className="space-y-8">
                <div className="relative pl-12">
                  <div className="absolute left-0 top-2 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full ring-4 ring-white dark:ring-gray-950 shadow-lg"></div>
                  <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2 tracking-wide">
                      1994
                    </div>
                    <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                      My path into software started with a 486DX and MS-DOS 6.0. By
                      the late &apos;90s, I was hand-coding HTML in Notepad and
                      publishing to GeoCities. Those early experiments taught me
                      that the best way to learn is to build something and put it
                      online.
                    </p>
                  </div>
                </div>

                <div className="relative pl-12">
                  <div className="absolute left-0 top-2 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full ring-4 ring-white dark:ring-gray-950 shadow-lg"></div>
                  <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2 tracking-wide">
                      EARLY 2000s
                    </div>
                    <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                      I moved from desktop applications in VB6 to C# and .NET
                      (shoutout to the{' '}
                      <a
                        href="https://www.runuo.com"
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline decoration-2 underline-offset-2 transition-colors"
                      >
                        RunUO
                      </a>{' '}
                      community for the introduction). After five years managing IT
                      infrastructure at a managed services provider, I was ready for
                      a change.
                    </p>
                  </div>
                </div>

                <div className="relative pl-12">
                  <div className="absolute left-0 top-2 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full ring-4 ring-white dark:ring-gray-950 shadow-lg"></div>
                  <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2 tracking-wide">
                      2013
                    </div>
                    <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                      Shifted focus entirely to full-time software development,
                      specializing in Node.js, Angular.js/Angular2, JavaScript, and
                      React.
                    </p>
                  </div>
                </div>

                <div className="relative pl-12">
                  <div className="absolute left-0 top-2 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full ring-4 ring-white dark:ring-gray-950 shadow-lg"></div>
                  <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2 tracking-wide">
                      2024
                    </div>
                    <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300">
                      Began working with React Native and Expo, expanding into
                      mobile development.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Today */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Today
            </h2>
            <div className="bg-white/50 dark:bg-gray-900/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
                I work as a Staff Software Engineer at{' '}
                <a
                  href="https://www.varomoney.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold underline decoration-2 underline-offset-2 transition-colors"
                >
                  Varo Bank
                </a>
                . In this role, I specialize in the architecture and governance of
                our front-end applications. My primary focus is on defining the
                project structure, selecting the optimal tech stack, and
                establishing engineering best practices so our systems are
                consistently scalable and maintainable.
              </p>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                I also really enjoy mentoring and guiding other developers, which
                helps us build technical skill and consistency across the whole
                team. This blog exists to document solutions to problems I&apos;ve
                encountered, share what I&apos;ve learned and hopefully save
                others a few hours of headaches.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="text-center pt-8">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              All opinions and technical takes here are my own and don&apos;t represent my employer.
            </p>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
