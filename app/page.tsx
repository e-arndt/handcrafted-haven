// app/page.tsx
import Link from "next/link";
import Image from "next/image";


export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--hh-accent)] text-[var(--hh-text)]">
      {/* Top Nav */}
      <header className="bg-[var(--hh-secondary)]">
        <nav
          className="mx-auto grid max-w-6xl items-center px-3 py-2"
          style={{ gridTemplateColumns: "220px 1fr 220px" }}
          aria-label="Main navigation"
        >

        {/* Left: brand */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-3 text-lg font-semibold tracking-tight text-[var(--hh-text)]"
          >
            <Image
              src="/logo.png"
              alt="Handcrafted Haven logo"
              width={75}
              height={75}
              priority
              className="shrink-0"
            />
            <span className="font-[var(--font-display)]">Handcrafted</span>{" "}
            Haven
          </Link>
        </div>

        {/* Center: nav links */}
        <div className="hidden items-center justify-center gap-8 md:flex">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/shop" className="hover:underline">Shop</Link>
          <Link href="/sellers" className="hover:underline">Sellers</Link>
        </div>

        {/* Right: spacer (empty) */}
        <div />

        </nav>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-5">
        {/* Hero */}
        <section className="grid items-center gap-5 md:grid-cols-1">
          {/* Hero Image */}
          <div className="relative w-full overflow-hidden rounded-2xl shadow-sm h-[260px] sm:h-[340px] md:h-[440px] lg:h-[480px]">
            <Image
              src="/havenhero.png"
              alt="Artisans showcasing handcrafted goods"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "50% 10%" }}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1152px"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
          <div>
            <h1 className="font-[var(--font-display)] text-4xl leading-tight md:text-4xl">
              Unique, handcrafted treasures — made by real artisans.
            </h1>
            <p className="mt-4 max-w-prose text-lg text-black/70">
              Handcrafted Haven is a community marketplace where sellers share
              their story, list their creations, and connect with customers who
              value quality and sustainability.
            </p>
          </div>
        </section>

        {/* Big Click Boxes */}
        <section className="mt-7 grid gap-6 md:grid-cols-2">
          <Link
            href="/shop"
            className="group rounded-2xl border border-black/5 bg-[#EFE4D2] p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="font-[var(--font-display)] text-2xl">
              Shop handcrafted items
            </h2>
            <p className="mt-2 text-black/70">
              Browse by category, price range, or featured collections.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--hh-accent)] px-4 py-2 font-semibold">
              Go to Shop <span className="transition group-hover:translate-x-0.5">→</span>
            </div>
          </Link>

          <Link
            href="/sellers"
            className="group rounded-2xl border border-black/5 bg-[#EFE4D2] p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="font-[var(--font-display)] text-2xl">
              Explore seller profiles
            </h2>
            <p className="mt-2 text-black/70">
              Learn each artisan’s story and see their curated collections.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--hh-accent)] px-4 py-2 font-semibold">
              Go to Sellers{" "}
              <span className="transition group-hover:translate-x-0.5">→</span>
            </div>
          </Link>
        </section>

        {/* Footer */}
        <footer
          className="
            mt-16
            bg-[var(--hh-secondary)]
            py-8
            text-sm
            text-[var(--hh-text)]
            border-2 border-black/70
          "
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p className="text-black/85">
                © {new Date().getFullYear()} Handcrafted Haven
              </p>
              <p>
                <span className="font-mono">WDD-430</span> /{" "}
                <span className="font-mono">BYU-I</span> /{" "}
                <span className="font-mono">Term 1</span> /{" "}
                <span className="font-mono">Team 08</span>
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
