'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  const handleNavigation = (path: string, section: string | null = null) => {
    if (path === '/faqs' || path === '/terms') {
      // Navigate to home with section parameter (you can implement scroll logic as needed)
      router.push(`/#${path === '/faqs' ? 'faq' : 'terms'}`);
    } else {
      router.push(path);
    }
  };

  return (
    <footer className="bg-[#003b4c] text-white px-4 sm:px-6 lg:px-10 py-8 sm:py-12 lg:py-16 rounded-t-[20px] sm:rounded-t-[40px]">
      {/* Newsletter Section - Responsive */}
      <div className="flex justify-center pb-6 sm:pb-8 lg:pb-10 items-center w-full">
        <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl flex items-center justify-center">
          <input
            type="email"
            placeholder="Your email address"
            className="p-3 sm:p-4 lg:p-5 border-0 rounded-full w-full h-12 sm:h-14 lg:h-16 bg-white/13 text-white text-sm sm:text-base flex-1 placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#189ab4] pr-24 sm:pr-28 lg:pr-32"
          />
          <button className="absolute right-2 w-20 sm:w-24 lg:w-28 h-8 sm:h-10 lg:h-12 bg-[#189ab4] border-0 text-white font-semibold rounded-full cursor-pointer hover:bg-[#147a8a] transition-colors text-xs sm:text-sm lg:text-base">
            Sign Up
          </button>
        </div>
      </div>

      {/* Footer Columns - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 py-6 sm:py-8 lg:py-10">
        {/* Company Links */}
        <div>
          <h5 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Company</h5>
          <div className="space-y-2 sm:space-y-3">
            <Link href="/about" className="block text-white text-sm sm:text-base no-underline hover:text-[#189ab4] transition-colors">
              About Us
            </Link>
            <Link href="/services" className="block text-white text-sm sm:text-base no-underline hover:text-[#189ab4] transition-colors">
              Services
            </Link>
            <button
              onClick={() => handleNavigation('/faqs')}
              className="block text-white text-sm sm:text-base bg-transparent border-0 cursor-pointer p-0 font-inherit text-left hover:text-[#189ab4] transition-colors"
            >
              FAQs
            </button>
            <button
              onClick={() => handleNavigation('/terms')}
              className="block text-white text-sm sm:text-base bg-transparent border-0 cursor-pointer p-0 font-inherit text-left hover:text-[#189ab4] transition-colors"
            >
              Terms
            </button>
            <Link href="/contact" className="block text-white text-sm sm:text-base no-underline hover:text-[#189ab4] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Quick Links</h5>
          <div className="space-y-2 sm:space-y-3">
            <p className="text-white/80 text-sm sm:text-base hover:text-white transition-colors cursor-pointer">Get In Touch</p>
            <p className="text-white/80 text-sm sm:text-base hover:text-white transition-colors cursor-pointer">How it works</p>
            <Link href="/races" className="block text-white/80 text-sm sm:text-base hover:text-white transition-colors">
              Browse Races
            </Link>
            <Link href="/profile" className="block text-white/80 text-sm sm:text-base hover:text-white transition-colors">
              My Account
            </Link>
          </div>
        </div>

        {/* Popular Races */}
        <div>
          <h5 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Popular Races</h5>
          <div className="space-y-2 sm:space-y-3">
            <p className="text-white/80 text-sm sm:text-base hover:text-white transition-colors cursor-pointer">
              Amsterdam Classic
            </p>
            <p className="text-white/80 text-sm sm:text-base hover:text-white transition-colors cursor-pointer">
              London Derby
            </p>
            <p className="text-white/80 text-sm sm:text-base hover:text-white transition-colors cursor-pointer">
              Paris International
            </p>
            <p className="text-white/80 text-sm sm:text-base hover:text-white transition-colors cursor-pointer">
              Berlin Championship
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h5 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Connect With Us</h5>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex flex-wrap gap-2 text-white/80 text-sm sm:text-base">
              <span className="hover:text-white transition-colors cursor-pointer">Facebook</span>
              <span className="hidden sm:inline">|</span>
              <span className="hover:text-white transition-colors cursor-pointer">Twitter</span>
              <span className="hidden sm:inline">|</span>
              <span className="hover:text-white transition-colors cursor-pointer">Instagram</span>
              <span className="hidden sm:inline">|</span>
              <span className="hover:text-white transition-colors cursor-pointer">LinkedIn</span>
            </div>
            <div className="text-white/80 text-sm sm:text-base">
              <p>Email: info@pigeonracing.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Responsive */}
      <div className="text-center text-xs sm:text-sm border-t border-white/20 pt-4 sm:pt-6 mt-6 sm:mt-8">
        <p className="mb-2">© 2024 Pigeon Racing Platform. All rights reserved.</p>
        <p className="text-white/80 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
          <span className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</span>
          <span className="hidden sm:inline">|</span>
          <span className="hover:text-white transition-colors cursor-pointer">Privacy Notice</span>
          <span className="hidden sm:inline">|</span>
          <span className="hover:text-white transition-colors cursor-pointer">Cookie Policy</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;