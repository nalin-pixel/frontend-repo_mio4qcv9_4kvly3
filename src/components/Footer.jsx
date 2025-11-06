export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-gray-300">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
          <div>
            <h4 className="text-white font-semibold mb-3">About</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-white" href="#">What is AniFlix?</a></li>
              <li><a className="hover:text-white" href="#">Careers</a></li>
              <li><a className="hover:text-white" href="#">Press</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Help</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-white" href="#">Support</a></li>
              <li><a className="hover:text-white" href="#">Account</a></li>
              <li><a className="hover:text-white" href="#">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-white" href="#">Terms</a></li>
              <li><a className="hover:text-white" href="#">Privacy</a></li>
              <li><a className="hover:text-white" href="#">Cookies</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-white" href="#">Email</a></li>
              <li><a className="hover:text-white" href="#">Twitter</a></li>
              <li><a className="hover:text-white" href="#">Discord</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-xs text-gray-400">© {new Date().getFullYear()} AniFlix — For anime fans, inspired by Netflix.</p>
      </div>
    </footer>
  );
}
