
import React from 'react';
import Layout from '../components/Layout/Layout';
import ContactForm from '../components/Common/ContactForm';

const ContactPage = () => {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-8">
          Have questions or feedback? Fill out the form below to get in touch with us.
        </p>
        
        <ContactForm />
      </div>
    </Layout>
  );
};

export default ContactPage;
