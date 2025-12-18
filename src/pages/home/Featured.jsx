import { Link } from "react-router";
import { FaArrowRight, FaHeart, FaUsers, FaLightbulb } from "react-icons/fa";

const FeaturesSection = () => {
  return (
      <div className="max-w-7xl mx-auto mt-20 px-4">

        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4">
            Our <span className="text-red-600">Features</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto">
            Discover how we're making blood donation easier, faster, and more impactful than ever.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-red-100">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-red-700"></div>

            <div className="p-8">
              <img
                src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?q=80&w=1616&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Support Our Campaigns"
                className="w-full h-64 object-cover rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-500"
              />

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <FaUsers className="text-2xl text-red-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Support Our Campaigns</h3>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Highlight any ongoing fundraising campaigns or special initiatives.
                Provide details on how visitors can contribute, participate, or spread the word.
                Use engaging visuals and call-to-action buttons to drive participation.
              </p>

              <Link
                className="inline-flex items-center gap-3 text-red-600 font-bold text-lg hover:gap-5 transition-all"
              >
                Explore Campaigns <FaArrowRight />
              </Link>
            </div>
          </div>

          <div className="group relative bg-gradient-to-br from-red-600 to-red-800 rounded-3xl shadow-2xl hover:shadow-red-600/50 transition-all duration-500 overflow-hidden border border-red-500">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute top-6 right-6 text-9xl opacity-10">Drop</div>

            <div className="relative z-10 p-8 text-white">
              <img
                src="https://images.unsplash.com/photo-1668168550143-86c1136b2443?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Did You Know?"
                className="w-full h-64 object-cover rounded-2xl mb-6 border-4 border-white/30 group-hover:scale-105 transition-transform duration-500"
              />

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-full">
                  <FaLightbulb className="text-2xl" />
                </div>
                <h3 className="text-3xl font-bold">Did You Know?</h3>
              </div>

              <p className="text-red-50 text-lg leading-relaxed mb-6">
                Share interesting and important facts about blood donation.
                This could include statistics about blood needs, the impact of donations,
                and dispelling common myths about donating blood.
              </p>

              <Link
                className="inline-flex items-center gap-3 text-white font-bold text-lg hover:gap-5 transition-all border-b-2 border-white/50 pb-1"
              >
                Learn More Facts <FaArrowRight />
              </Link>
            </div>
          </div>
          <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-red-100">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-red-700"></div>

            <div className="p-8">
              <img
                src="https://i.pinimg.com/736x/12/ad/4b/12ad4b65d54aa54981a93d60f39c1017.jpg"
                alt="Success Stories"
                className="w-full h-64 object-cover rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-500"
              />

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-100 rounded-full">
                  <FaHeart className="text-2xl text-red-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Success Stories</h3>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Share inspiring stories of people whose lives were saved through blood donations.
                Include pictures and testimonials from recipients and donors to make the stories more relatable and impactful.
              </p>

              <Link
                className="inline-flex items-center gap-3 text-red-600 font-bold text-lg hover:gap-5 transition-all"
              >
                Read Real Stories <FaArrowRight />
              </Link>
            </div>
          </div>

        </div>
      </div>
  );
};

export default FeaturesSection;