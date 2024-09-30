import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900  py-10 text-gray-400">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-8">
        <div>
          <h4 className="text-white text-xl mb-4">House Rental</h4>
          <p className="text-gray-400">
            Discover your perfect home away from home with our extensive
            selection of vacation rentals.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link href="#" className="text-white hover:text-teal-400">
              Facebook
            </Link>
            <Link href="#" className="text-white hover:text-teal-400">
              Twitter
            </Link>
            <Link href="#" className="text-white hover:text-teal-400">
              Instagram
            </Link>
          </div>
        </div>
        <div>
          <h4 className="text-white text-xl mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-teal-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/listings" className="hover:text-teal-400">
                Listings
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-teal-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-teal-400">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-teal-400">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-teal-400">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white text-xl mb-4">Contact Us</h4>
          <p>123 Vacation Lane</p>
          <p>Sunny Beach, CA 12345</p>
          <p>
            Email:{" "}
            <Link
              href="mailto:info@houserental.com"
              className="hover:text-teal-400"
            >
              info@houserental.com
            </Link>
          </p>
          <p>
            Phone:{" "}
            <Link href="tel:+1234567890" className="hover:text-teal-400">
              +1 234 567 890
            </Link>
          </p>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-6 text-center">
        <p>&copy; 2024 House Rental. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <Link href="/privacy" className="hover:text-teal-400">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-teal-400">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
