import type { Metadata } from "next";
import { Instrument_Serif, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Blog",
    template: "%s — Blog",
  },
  description: "Thoughts, guides, and deep dives.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-[var(--color-bg)] text-[var(--color-text)] antialiased">
        <header className="mx-auto flex w-full max-w-[960px] items-center justify-between px-6 py-8">
          <a
            href="/"
            className="font-[family-name:var(--font-heading)] text-2xl tracking-tight text-[var(--color-text)] no-underline transition-opacity hover:opacity-70"
          >
            Blog
          </a>
          <nav className="flex gap-6 text-sm text-[var(--color-muted)]">
            <a
              href="/"
              className="transition-colors hover:text-[var(--color-text)]"
            >
              Posts
            </a>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-[960px] flex-1 px-6 pb-20">{children}</main>

        <footer className="border-t border-[var(--color-border)] py-10 text-center text-sm text-[var(--color-muted)]">
          <p>&copy; {new Date().getFullYear()}</p>
        </footer>
      </body>
    </html>
  );
}
