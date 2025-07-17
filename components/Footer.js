import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Logo and Description */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">ArcArea</h2>
          <p className="text-sm text-gray-400">
            Connecting you with the best interior designers, architects, and furniture creators near you.
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-white font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/categories/Interior" className="hover:text-white">Interior Design</Link></li>
            <li><Link href="/categories/Architecture" className="hover:text-white">Architecture</Link></li>
            <li><Link href="/categories/Furniture" className="hover:text-white">Furniture Design</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQs</Link></li>
            <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
          </ul>
        </div>

        {/* Legal and Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Legal</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
          </ul>

          <div className="flex space-x-4 mt-4">
            <a href="#" className="hover:text-white">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-white">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-700">
        © {new Date().getFullYear()} ArcArea. All rights reserved.
      </div>
    </footer>
  );
}
