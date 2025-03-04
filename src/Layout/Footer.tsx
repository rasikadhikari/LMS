// Footer.jsx
function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} LMS. All rights reserved.
        </p>
        <div className="mt-2 space-x-4">
          <a href="#" className="text-gray-400 hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Terms of Service
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
