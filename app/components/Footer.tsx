'use client';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-slate-800 bg-[#050814]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <p className="text-gray-500 mb-4">© 2025 Shraddheytech. All rights reserved.</p>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
