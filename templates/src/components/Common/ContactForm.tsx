
import React, { useState } from 'react';

const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit to backend
    console.log('Form submitted:', form);
    // Reset form
    setForm({ name: '', email: '', subject: '', message: '' });
  };
  
  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="subject" className="block text-gray-700 mb-2">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400 h-32"
          required
        />
      </div>
      
      <div className="flex justify-end">
        <button 
          type="submit" 
          className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
