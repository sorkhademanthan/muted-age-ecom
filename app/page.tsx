import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/category-grid";
import { TrendingSection } from "@/components/home/trending-section";

export default function Home() {
  return (
    // Main container: Full width, clean white background, black text
    // selection:bg-black adds a nice premium touch when highlighting text
    <main className="min-h-screen w-full bg-white text-black selection:bg-black selection:text-white">
      
      {/* 1. Hero Section 
          - Sits at the very top, edge-to-edge.
          - No padding restricting it. 
      */}
      <HeroSection />

      {/* 2. Category Grid 
          - Spans full width for that "editorial" magazine look.
      */}
      <CategoryGrid />

      {/* 3. Trending Products
          - Adds vertical rhythm and spacing automatically.
      */}
      <TrendingSection />
      
    </main>
  );
}