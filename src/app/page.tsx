// src/app/page.tsx
"use client"
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/path-to-hero-image.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center">
          <motion.h1
            className="text-6xl font-bold text-white italic"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Welcome to the Alumni Portal
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-gray-300 italic"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Connect, Share, and Grow Together
          </motion.p>
          <motion.button
            className="mt-8 px-6 py-3 bg-lilac-400 text-black font-semibold rounded-lg hover:bg-lilac-500 transition-colors duration-300"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            Join Us
          </motion.button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 lg:px-32">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-lilac-400 italic">About Our Community</h2>
          <p className="mt-4 text-gray-400 italic">
            We are a global network of alumni, committed to staying connected and fostering professional growth through opportunities, mentorship, and collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <motion.div
            className="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/path-to-image-1.jpg"
              alt="Networking"
              className="w-full h-40 object-cover rounded-lg mb-4"
              width={500}
              height={250}
            />
            <h3 className="text-2xl font-bold text-lilac-400 italic">Networking</h3>
            <p className="mt-2 text-gray-400 italic">
              Expand your network with alumni who are leaders across various industries.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/path-to-image-2.jpg"
              alt="Events"
              className="w-full h-40 object-cover rounded-lg mb-4"
              width={500}
              height={250}
            />
            <h3 className="text-2xl font-bold text-lilac-400 italic">Exclusive Events</h3>
            <p className="mt-2 text-gray-400 italic">
              Attend exclusive events, workshops, and conferences to grow professionally and personally.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            className="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/path-to-image-3.jpg"
              alt="Mentorship"
              className="w-full h-40 object-cover rounded-lg mb-4"
              width={500}
              height={250}
            />
            <h3 className="text-2xl font-bold text-lilac-400 italic">Mentorship</h3>
            <p className="mt-2 text-gray-400 italic">
              Get guidance and mentorship from experienced professionals within the community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Alumni Section */}
      <section className="bg-gray-800 py-20">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-lilac-400 italic">Meet Our Alumni</h2>
          <p className="mt-4 text-gray-400 italic">
            Discover some of our outstanding alumni who have made an impact in their respective fields.
          </p>
        </div>

        <div className="flex justify-center items-center space-x-6 overflow-hidden">
          <motion.div
            className="w-80 p-4 bg-gray-700 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/path-to-alumni-1.jpg"
              alt="Alumni 1"
              className="w-32 h-32 rounded-full mx-auto mb-4"
              width={128}
              height={128}
            />
            <h3 className="text-xl font-bold text-lilac-400 text-center italic">John Doe</h3>
            <p className="text-gray-400 text-center italic">CEO, Tech Company</p>
          </motion.div>

          <motion.div
            className="w-80 p-4 bg-gray-700 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/path-to-alumni-2.jpg"
              alt="Alumni 2"
              className="w-32 h-32 rounded-full mx-auto mb-4"
              width={128}
              height={128}
            />
            <h3 className="text-xl font-bold text-lilac-400 text-center italic">Jane Smith</h3>
            <p className="text-gray-400 text-center italic">Senior Engineer, SpaceX</p>
          </motion.div>

          <motion.div
            className="w-80 p-4 bg-gray-700 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/path-to-alumni-3.jpg"
              alt="Alumni 3"
              className="w-32 h-32 rounded-full mx-auto mb-4"
              width={128}
              height={128}
            />
            <h3 className="text-xl font-bold text-lilac-400 text-center italic">Mark Johnson</h3>
            <p className="text-gray-400 text-center italic">Product Manager, Google</p>
          </motion.div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 px-4 lg:px-32 bg-gray-900 text-white">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-lilac-400 italic">What Alumni Say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Testimonial 1 */}
          <motion.div
            className="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-400 italic">
              "The Alumni Portal has helped me stay connected with my college network and has opened up many professional opportunities."
            </p>
            <h3 className="mt-4 text-xl font-bold text-lilac-400 italic">Emily Davis</h3>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div
            className="p-6 bg-gray-800 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-400 italic">
              "This platform has made it so easy to network with alumni in my field, and the mentorship I’ve received has been invaluable."
            </p>
            <h3 className="mt-4 text-xl font-bold text-lilac-400 italic">Michael Brown</h3>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
