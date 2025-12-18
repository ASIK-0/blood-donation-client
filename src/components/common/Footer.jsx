import { Link } from "react-router";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from '../../assets/icons/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-red-900 to-red-500 pt-20 mt-10 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-20 text-9xl">🩸</div>
        <div className="absolute bottom-32 right-32 text-8xl rotate-12">🩸</div>
        <div className="absolute top-1/3 right-1/4 text-7xl -rotate-12">🩸</div>
        <div className="absolute bottom-1/4 left-1/4 text-9xl rotate-45">🩸</div>
      </div>

      <div className="w-11/12 mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img className="w-16" src={logo} alt="Logo Icon" />
              <h1 className="text-5xl font-bold text-white">RedPulse</h1>
            </Link>
            <p className="text-lg text-red-100 leading-relaxed max-w-xs">
              Every drop counts. Join us in saving lives through voluntary blood donation across the nation.
            </p>
            <div className="flex gap-4">
              <a href="#" className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg">
                <FaFacebookF className="text-xl text-white" />
              </a>
              <a href="#" className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg">
                <FaTwitter className="text-xl text-white" />
              </a>
              <a href="#" className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg">
                <FaInstagram className="text-xl text-white" />
              </a>
              <a href="#" className="bg-red-500 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-110 shadow-lg">
                <FaYoutube className="text-xl text-white" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-200">Quick Links</h3>
            <ul className="space-y-4 text-lg text-white">
              <li><Link to="/" className="hover:text-red-300 transition flex items-center gap-2"><span className="text-red-400">→</span> Home</Link></li>
              <li><Link to="/donation-requests" className="hover:text-red-300 transition flex items-center gap-2"><span className="text-red-400">→</span> Donation Requests</Link></li>
              <li><Link to="/search" className="hover:text-red-300 transition flex items-center gap-2"><span className="text-red-400">→</span> Search Donors</Link></li>
              <li><Link to="/funding" className="hover:text-red-300 transition flex items-center gap-2"><span className="text-red-400">→</span> Funding</Link></li>
              <li><Link to="/dashboard" className="hover:text-red-300 transition flex items-center gap-2"><span className="text-red-400">→</span> Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-200">Contact Us</h3>
            <div className="space-y-5 text-white text-lg">
              <div className="flex items-center gap-4">
                <div className="bg-red-500 p-3 rounded-full">
                  <FaPhoneAlt className="text-white" />
                </div>
                <div>
                  <p className="font-semibold">Emergency Hotline</p>
                  <p className="text-red-200">+96 78 00 11 34</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-red-500 p-3 rounded-full">
                  <FaEnvelope  className="text-white"/>
                </div>
                <p>bloodcare@gmail.com</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-red-500 p-3 rounded-full">
                  <FaMapMarkerAlt  className="text-white"/>
                </div>
                <p>Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-3xl shadow-2xl p-8 text-center">
            <h3 className="text-3xl text-white font-extrabold mb-4">Need Blood Urgently?</h3>
            <p className="text-white mb-6"> Call our 24/7 emergency line now</p>
            <a href="#" className="btn btn-lg rounded-full bg-white text-red-600 hover:bg-red-50 border-none shadow-xl text- font-bold hover:scale-105 transition-all">
              Call Now +96 78 00 11 34
            </a>
          </div>
        </div>
        <div className="border-t border-red-400 pt-5 text-center">
          <p className="text-white text-lg">
            © 2025 <span className="text-amber-200 font-bold">RedPulse</span>. All rights reserved. Made by Ashik .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;