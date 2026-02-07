import Image from "next/image";
// Test path alias - this should work now!
import { testMessage, greet } from "@/lib/utils/test";
import { cn } from "@/lib/utils/cn";
import { siteConfig } from "@/config/site";
import { CURRENCY } from "@/config/constants";

export default function Home() {
  // This will only show in browser console (public variables)
  console.log("Store Domain:", process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
  console.log(
    "Public Token:",
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  );

  // Test TypeScript functions
  console.log(testMessage);
  console.log(greet("Muted Age Developer"));

  console.log("Site Config:", siteConfig.name);
  console.log("Currency:", CURRENCY.symbol);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold mb-4 text-brand-primary">
            {siteConfig.name}
          </h1>
          <p className="text-lg text-brand-muted mb-8">
            {siteConfig.description}
          </p>

          {/* Test custom Tailwind colors */}
          <div
            className={cn(
              "border border-brand-accent rounded-lg p-4 max-w-md mx-auto",
              "bg-gradient-to-br from-white to-brand-accent/10"
            )}
          >
            <p className="text-sm font-semibold text-brand-primary mb-2">
              ✅ Tailwind Custom Theme
            </p>
            <p className="text-xs text-brand-muted">Brand colors configured</p>
            <p className="text-xs text-brand-muted mt-1">
              Currency: {CURRENCY.symbol} {CURRENCY.code}
            </p>
          </div>

          {/* Previous test boxes */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm font-semibold text-green-800 mb-2">
              ✅ Environment Variables Loaded
            </p>
            <p className="text-xs text-green-600">
              Store: {process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}
            </p>
            <p className="text-xs text-green-600 mt-1">
              Token:{" "}
              {process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.substring(
                0,
                10
              )}
              ...
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm font-semibold text-blue-800 mb-2">
              ✅ Next.js Config Updated
            </p>
            <p className="text-xs text-blue-600">
              Shopify CDN images are now supported
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Image optimization enabled
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm font-semibold text-purple-800 mb-2">
              ✅ TypeScript Config Updated
            </p>
            <p className="text-xs text-purple-600">
              Path aliases: @/lib, @/components, etc.
            </p>
            <p className="text-xs text-purple-600 mt-1">
              Test: {testMessage}
            </p>
            <p className="text-xs text-purple-600 mt-1">
              Greeting: {greet("TypeScript")}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
