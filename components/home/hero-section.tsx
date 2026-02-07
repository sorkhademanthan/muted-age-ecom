import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-reveal">
        {/* Subtitle */}
        <p className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-300 mb-6 font-medium">
          Premium Fashion Collection 2024
        </p>
        
        {/* Main Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-white leading-tight tracking-tight">
          Elegance
          <br />
          <span className="italic font-light">Redefined</span>
        </h1>
        
        {/* Description */}
        <p className="text-lg md:text-xl lg:text-2xl mb-12 text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Discover timeless pieces crafted for the modern individual.
          <br className="hidden md:block" />
          Where luxury meets everyday sophistication.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/collections/all-products">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-100 px-8 py-6 text-base font-semibold rounded-full min-w-[200px] shadow-lg hover:shadow-xl transition-all"
            >
              Explore Collections
            </Button>
          </Link>
          <Link href="/collections/featured">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-6 text-base font-semibold rounded-full min-w-[200px] transition-all"
            >
              Featured Items
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
