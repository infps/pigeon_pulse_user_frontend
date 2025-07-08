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
    <footer className="bg-[#003b4c] text-white px-5 py-10 rounded-t-[40px]">
      {/* Newsletter Section */}
      <div className="flex justify-center pb-5 items-center w-full">
        <div className="relative w-[50vw] flex items-center justify-center">
          <input
            type="email"
            placeholder="Your email address"
            className="p-5 border-0 rounded-[60px] w-1/2 h-[71.75px] bg-white/13 text-white text-base flex-1 placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-[#189ab4]"
          />
          <button className="w-[115.31px] h-[51.75px] bg-[#189ab4] border-0 text-white font-semibold rounded-[60px] cursor-pointer absolute right-4 hover:bg-[#147a8a] transition-colors">
            Sign Up
          </button>
        </div>
      </div>

      {/* Footer Columns */}
      <div className="flex justify-around flex-wrap py-[30px]">
        {/* Company Links */}
        <div className="m-2.5">
          <h5 className="text-lg font-semibold mb-3">Company</h5>
          <div className="space-y-2">
            <Link href="/about" className="block text-white no-underline hover:text-[#189ab4] transition-colors">
              About Us
            </Link>
            <Link href="/services" className="block text-white no-underline hover:text-[#189ab4] transition-colors">
              Services
            </Link>
            <button
              onClick={() => handleNavigation('/faqs')}
              className="block text-white bg-transparent border-0 cursor-pointer p-0 font-inherit text-left hover:text-[#189ab4] transition-colors"
            >
              FAQs
            </button>
            <button
              onClick={() => handleNavigation('/terms')}
              className="block text-white bg-transparent border-0 cursor-pointer p-0 font-inherit text-left hover:text-[#189ab4] transition-colors"
            >
              Terms
            </button>
            <Link href="/contact" className="block text-white no-underline hover:text-[#189ab4] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="m-2.5">
          <h5 className="text-lg font-semibold mb-3">Quick Links</h5>
          <div className="space-y-2">
            <p className="text-white/80 hover:text-white transition-colors cursor-pointer">Get In Touch</p>
            <p className="text-white/80 hover:text-white transition-colors cursor-pointer">How it works</p>
          </div>
        </div>

        {/* Popular Races */}
        <div className="m-2.5">
          <h5 className="text-lg font-semibold mb-3">Popular Races</h5>
          <div className="space-y-2">
            {[...Array(7)].map((_, i) => (
              <p key={i} className="text-white/80 hover:text-white transition-colors cursor-pointer">
                Amsterdam VS USA
              </p>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="m-2.5">
          <h5 className="text-lg font-semibold mb-3">Connect With Us</h5>
          <div className="space-y-2">
            <div className="flex space-x-2 text-white/80">
              <span className="hover:text-white transition-colors cursor-pointer">Facebook</span>
              <span>|</span>
              <span className="hover:text-white transition-colors cursor-pointer">Twitter</span>
              <span>|</span>
              <span className="hover:text-white transition-colors cursor-pointer">Instagram</span>
              <span>|</span>
              <span className="hover:text-white transition-colors cursor-pointer">LinkedIn</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-[13px] border-t border-white/[0.267] pt-2.5 mt-5">
        <p className="mb-1">© 2024 example.com. All rights reserved.</p>
        <p className="text-white/80">
          <span className="hover:text-white transition-colors cursor-pointer">Terms & Conditions</span>
          {' | '}
          <span className="hover:text-white transition-colors cursor-pointer">Privacy Notice</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;