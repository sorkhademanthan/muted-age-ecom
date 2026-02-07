import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image - Full Bleed */}
      <div className="absolute inset-0 z-0">
         {/* Replace with your actual high-res hero image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-60" />
        <div className="absolute inset-0 bg-black/20" /> {/* Subtle overlay for text readability */}
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto animate-reveal">
        {/* Subtitle */}
        <p className="text-xs md:text-sm uppercase tracking-[0.4em] text-gray-200 mb-8 font-medium">
          Spring / Summer 2026
        </p>
        
        {/* Main Headline */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 text-white leading-none tracking-tighter uppercase">
          Muted Age
        </h1>
        
        {/* CTA Buttons - Sharp & Minimal */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
          <Link href="/collections/all-products">
            <Button 
              className="bg-white text-black hover:bg-neutral-200 rounded-none px-12 py-7 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500"
            >
              Shop Collection
            </Button>
          </Link>
          <Link href="/collections/featured">
            <Button 
              variant="outline" 
              className="border border-white/30 text-white hover:bg-white hover:text-black rounded-none px-12 py-7 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur-sm transition-all duration-500"
            >
              The Campaign
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}