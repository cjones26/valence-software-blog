import Image from 'next/image';
import PageLayout from '@/components/layout/PageLayout';

export const metadata = {
  title: 'About',
  description: 'About Charles Jones',
};

export default function AboutPage() {
  return (
    <PageLayout>
      <article className="prose dark:prose-invert">
        <div className="flex justify-center mb-6">
          <Image
            src="/profile-image-large.jpg"
            alt="Charles Jones"
            width={400}
            height={400}
            className="rounded-3xl"
            style={{ width: 'auto', height: 'auto' }}
            preload
            quality={100}
          />
        </div>

        <h1 className="text-center">About</h1>

        <p>
          I&apos;m Charles Jones, a software engineer based in Charlotte, North
          Carolina. I&apos;ve spent my career building systems that solve actual
          problems—from infrastructure automation to full-stack applications.
        </p>

        <p>
          My path into software started in 1994 with a 486DX and MS-DOS 6.0. By
          the late &apos;90s, I was hand-coding HTML in Notepad and publishing to
          GeoCities. Those early experiments taught me that the best way to
          learn is to build something and put it online.
        </p>

        <p>
          I moved from desktop applications in VB6 to C# and .NET (shoutout to
          the <a href="https://www.runuo.com">RunUO</a> community for the
          introduction). After five years managing IT infrastructure at a
          managed services provider, I shifted focus entirely to software
          development in 2013, specializing in JavaScript and Node.js.
        </p>

        <p>
          Today, I work as a Staff Software Engineer at an online bank. This
          blog exists to document solutions to problems I&apos;ve encountered, share
          what I&apos;ve learned, and hopefully save someone else a few hours of
          debugging.
        </p>

        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
          All opinions and technical takes here are my own and don&apos;t represent
          my employer.
        </p>
      </article>
    </PageLayout>
  );
}
