import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t border-neutral-900">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-20 lg:py-24">
        
        {/* Top Grid: Navigation & Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-24">
          
          {/* Brand / Newsletter Section (Dominant on Desktop) */}
          <div className="md:col-span-5 lg:col-span-4 space-y-8">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2 text-white">
                Muted Age
              </h3>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
              Redefining modern luxury through minimal aesthetics and timeless design.
              Join our newsletter for early access.
            </p>
            
            {/* Minimalist Underlined Form */}
            <form className="flex flex-col gap-4 max-w-sm pt-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="w-full bg-transparent border-b border-neutral-800 py-3 text-xs uppercase tracking-wider text-white placeholder:text-neutral-600 focus:outline-none focus:border-white transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-0 bottom-3 text-xs font-bold uppercase tracking-widest text-white hover:text-neutral-400 transition-colors"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Spacer for large screens */}
          <div className="hidden lg:block lg:col-span-2"></div>

          {/* Navigation Links (Right Aligned) */}
          <div className="md:col-span-7 lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8">
            
            {/* Shop Column */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                Collections
              </h4>
              <ul className="space-y-4">
                {['Men', 'Women', 'Accessories', 'New Arrivals'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/collections/${item.toLowerCase().replace(' ', '-')}`} 
                      className="text-sm text-neutral-300 hover:text-white hover:underline underline-offset-4 decoration-1 transition-all"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                Support
              </h4>
              <ul className="space-y-4">
                {['Contact', 'Shipping', 'Returns', 'Size Guide'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${item.toLowerCase().replace(' ', '-')}`} 
                      className="text-sm text-neutral-300 hover:text-white hover:underline underline-offset-4 decoration-1 transition-all"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
            <div className="space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                Legal
              </h4>
              <ul className="space-y-4">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                  <li key={item}>
                    <Link 
                      href={`/${item.toLowerCase().replace(' ', '-')}`} 
                      className="text-sm text-neutral-300 hover:text-white hover:underline underline-offset-4 decoration-1 transition-all"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-neutral-900 gap-6">
          <p className="text-[10px] uppercase tracking-widest text-neutral-600">
            © {currentYear} Muted Age Inc. All rights reserved.
          </p>
          
          <div className="flex gap-6">
             {/* Social Text Links */}
             {['Instagram', 'Twitter', 'TikTok'].map((social) => (
               <Link 
                 key={social} 
                 href="#" 
                 className="text-[10px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
               >
                 {social}
               </Link>
             ))}
          </div>
        </div>
      </div>
    </footer>
  );
}