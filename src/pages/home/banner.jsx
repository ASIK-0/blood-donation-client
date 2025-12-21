import { Link } from "react-router";
import slide1 from '../../assets/images/slide1.png';

const Banner = () => {
  return (
    <div className="relative py-16 mt-30 md:py-24 lg:py-32 w-11/12 mx-auto rounded-3xl shadow-xl overflow-hidden bg-gradient-to-br from-red-100 to-red-500">

      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 text-red-600 text-9xl">🩸</div>
        <div className="absolute bottom-20 right-20 text-red-500 text-8xl rotate-12">🩸</div>
        <div className="absolute top-1/3 right-1/4 text-red-400 text-7xl -rotate-6">🩸</div>
        <div className="absolute bottom-1/3 left-1/3 text-red-600 text-9xl rotate-45">🩸</div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-6 md:px-12">

        <div className="text-center lg:text-left">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900  mb-6 leading-tight">
            DONATE <span className="text-red-600">BLOOD</span>
            <br />
            SHARE <span className="text-red-600">LIFE</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-2xl mx-auto lg:mx-0">
            Your generosity today becomes the strength someone depends on tomorrow.
            A reminder that every drop truly matters.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <Link
              to="/register"
              className="btn btn-lg rounded-full bg-red-600 hover:bg-red-700 text-white border-none shadow-2xl hover:shadow-red-600/50 px-10 py-5 text-xl font-semibold transition-all hover:scale-105"
            >
              Join as a donor
            </Link>

            <Link
              to="/search"
              className="btn btn-lg rounded-full bg-white/90 hover:bg-gray-100 dark:bg-gray-800/90 dark:hover:bg-gray-700 text-red-600 dark:text-red-400 border-2 border-red-600 dark:border-red-500 shadow-xl px-10 py-5 text-xl font-semibold transition-all hover:scale-105 backdrop-blur-sm"
            >
              Search donors
            </Link>
          </div>
        </div>


        <div className="flex justify-center lg:justify-end">
          <img src={slide1} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;