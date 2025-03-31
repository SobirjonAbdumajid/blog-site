
import React from 'react';
import Layout from '../components/Layout/Layout';

const AboutPage = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <div className="prose">
          <p className="mb-4">
            Welcome to our minimalist blog! We believe in the power of clean, focused content that delivers value without distractions.
          </p>
          
          <p className="mb-4">
            Our platform was built with simplicity in mind, providing a streamlined reading experience that puts the focus on what matters most: the content.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
          <p className="mb-4">
            To create a space for thoughtful content that respects readers' time and attention, free from unnecessary clutter and distractions.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
          <p className="mb-4">
            We're a small team of writers, designers, and developers passionate about creating quality content and delivering it in the most efficient way possible.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
