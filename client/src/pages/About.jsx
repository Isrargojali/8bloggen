import React from "react";
import { FaRocket, FaSearch, FaPen, FaStar } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
            About ATT BlogGen
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            ATT BlogGen is revolutionizing content creation by offering high-quality, SEO-optimized blog content, powered by the latest AI technology. Simplify your writing process and reach your audience faster.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-16"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-6">
                At ATT BlogGen, we are committed to democratizing content creation. We aim to empower writers, marketers, and businesses by providing an AI-driven platform that helps them create engaging and SEO-friendly blogs in minutes.
              </p>
            </div>

            {/* Image */}
            <div className="flex-1">
              <img
                src="https://st3.depositphotos.com/14431644/34729/i/450/depositphotos_347298024-stock-photo-conceptual-hand-writing-showing-our.jpg"
                alt="Mission"
                className="w-full max-w-md rounded-lg shadow-xl mx-auto"
              />
            </div>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-8">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-white px-6 py-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <FaRocket className="text-blue-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 1: Enter Topic</h3>
              <p className="text-gray-600">
                Provide a topic or keyword, and our AI will analyze it to generate a blog outline tailored to your needs.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-white px-6 py-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <FaSearch className="text-blue-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 2: AI-Powered Content</h3>
              <p className="text-gray-600">
                Our AI generates detailed, SEO-optimized content in minutes. Edit and refine the blog to your liking.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-white px-6 py-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <FaPen className="text-blue-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Step 3: Publish & Share</h3>
              <p className="text-gray-600">
                Once you're satisfied, publish your blog directly to your site, or save it for later sharing.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Why Choose Us Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 mb-8">Why Choose ATT BlogGen?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-white px-6 py-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <FaStar className="text-blue-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Speed</h3>
              <p className="text-gray-600">
                Create high-quality content in minutes, saving hours of manual writing and research.
              </p>
            </motion.div>

            {/* Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-white px-6 py-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <FaSearch className="text-blue-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">SEO Optimization</h3>
              <p className="text-gray-600">
                Our AI automatically optimizes your content for SEO, helping you rank higher in search results.
              </p>
            </motion.div>

            {/* Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="bg-white px-6 py-8 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <FaPen className="text-blue-600 text-4xl mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Ease of Use</h3>
              <p className="text-gray-600">
                User-friendly and intuitive, no technical knowledge required to start generating content.
              </p>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
