export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">
            AlturaCards
          </h2>

          <p className="text-sm">
            Your trusted destination for trading cards in Australia. Buy, sell,
            and collect with confidence.
          </p>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-white font-medium mb-3">Follow Us</h3>

          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://instagram.com/alturacards"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition"
              >
                Instagram @alturacards
              </a>
            </li>

            <li>
              <a
                href="https://tiktok.com/@alturacards"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition"
              >
                TikTok @alturacards
              </a>
            </li>

            <li>
              <a
                href="https://facebook.com/alturacards"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition"
              >
                Facebook
              </a>
            </li>

            <li>
              <a
                href="https://youtube.com/@alturacards"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>

        {/* Legal / Contact */}
        <div>
          <h3 className="text-white font-medium mb-3">Legal</h3>

          <ul className="space-y-2 text-sm">
            <li>
              <a href="/terms" className="hover:text-white transition">
                Terms & Conditions
              </a>
            </li>

            <li>
              <a href="/privacy" className="hover:text-white transition">
                Privacy Policy
              </a>
            </li>

            <li>
              <a
                href="/refund-policy"
                className="hover:text-white transition"
              >
                Refund Policy
              </a>
            </li>
          </ul>

          <div className="mt-4 text-sm">
            <p>Email: alturacards@alturacards.com</p>
            <p>ABN: 59 819 080 066</p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center text-xs py-4 text-gray-500">
        <p>
          © {new Date().getFullYear()} AlturaCards. All rights reserved.
        </p>

        <p className="mt-1">
          AlturaCards operates in Australia in accordance with Australian
          Consumer Law.
        </p>
      </div>
    </footer>
  );
}