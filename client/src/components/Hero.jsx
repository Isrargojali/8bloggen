import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-blue-100 via-white to-purple-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="z-10 bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            Generate SEO-Optimized Blogs with AI
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Just enter a topic or keyword and get a complete, high-quality blog post in seconds. Powered by AI.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
          >
            Try It Now
          </Link>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="hidden lg:block"
        >
          <img
            src="https://img.freepik.com/free-vector/blogging-concept-illustration_114360-1038.jpg?t=st=1713369056~exp=1713372656~hmac=c2c0d76a26c44b2e5cf62eb174d099278b579c163a9346a88b4d56c52789ed8c&w=1380"
            alt="AI Blogging"
            className="w-full max-w-xl mx-auto"
          />
        </motion.div>
      </div>

      {/* Optional Decorative Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full opacity-20 blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3" />
    </section>
  );
};

export default Hero;
