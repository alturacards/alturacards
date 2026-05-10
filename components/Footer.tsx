export default function Footer() {
  return (
    <footer className="bg-black text-gray-400 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">AlturaCards</h2>

          <p className="text-base leading-8 max-w-sm">
            Your trusted destination for trading cards in Australia. Buy, sell,
            and collect with confidence.
          </p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-white mb-6">Follow Us</h3>

          <div className="space-y-5">
            <a
              href="https://instagram.com/alturacards"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 hover:text-yellow-400 transition"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white font-bold text-lg">
                ◎
              </span>
              <span className="text-2xl">Instagram @alturacards</span>
            </a>

            <a
              href="https://tiktok.com/@alturacards"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 hover:text-yellow-400 transition"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black font-bold text-lg">
                ♪
              </span>
              <span className="text-2xl">TikTok @alturacards</span>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-white mb-6">Legal</h3>

          <ul className="space-y-5 text-2xl">
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
              <a href="/refund-policy" className="hover:text-white transition">
                Refund Policy
              </a>
            </li>
          </ul>

          <div className="mt-8 pt-6 border-t border-gray-800 text-lg space-y-3">
            <p>Email: alturacards@alturacards.com</p>
            <p>ABN: 59 819 080 066</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 text-center text-sm py-6 text-gray-500 px-6">
        <p>© {new Date().getFullYear()} AlturaCards. All rights reserved.</p>

        <p className="mt-2">
          AlturaCards operates in Australia in accordance with Australian
          Consumer Law.
        </p>
      </div>
    </footer>
  );
}