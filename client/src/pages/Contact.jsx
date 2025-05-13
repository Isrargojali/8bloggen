import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center mb-10 sm:mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4">
          Contact Us
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          We’d love to hear from you! Whether you have a question, suggestion, or just want to say hello, reach out to us and we'll get back to you as soon as possible.
        </p>
      </motion.div>

      {/* Contact Form and Info Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-white p-6 sm:p-8 rounded-lg shadow-xl"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
            Send Us a Message
          </h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-base sm:text-lg text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full p-3 sm:p-4 mt-2 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-base sm:text-lg text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className="w-full p-3 sm:p-4 mt-2 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-base sm:text-lg text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Your Message"
                className="w-full p-3 sm:p-4 mt-2 bg-gray-100 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="bg-white p-6 sm:p-8 rounded-lg shadow-xl"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
            Get in Touch
          </h2>
          <div className="space-y-6">
            <div className="flex items-start sm:items-center space-x-4">
              <FaPhone className="text-blue-500 text-2xl sm:text-3xl mt-1 sm:mt-0" />
              <p className="text-base sm:text-lg text-gray-700">+1 234 567 890</p>
            </div>
            <div className="flex items-start sm:items-center space-x-4">
              <FaEnvelope className="text-blue-500 text-2xl sm:text-3xl mt-1 sm:mt-0" />
              <p className="text-base sm:text-lg text-gray-700">contact@attgen.com</p>
            </div>
            <div className="flex items-start sm:items-center space-x-4">
              <FaMapMarkerAlt className="text-blue-500 text-2xl sm:text-3xl mt-1 sm:mt-0" />
              <p className="text-base sm:text-lg text-gray-700">1234 ATTGen, Gilgit, Pakistan</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 sm:mt-16">
        <p className="text-gray-600 text-sm sm:text-base">
          &copy; 2025 ATT BlogGEN. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Contact;
