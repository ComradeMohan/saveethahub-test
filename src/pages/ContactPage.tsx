import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactPage = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      details: ['info@saveetha.edu', 'support@saveetha.edu']
    },
    {
      icon: Phone,
      title: 'Phone',
      details: ['+91 123 456 7890', '+91 098 765 4321']
    },
    {
      icon: MapPin,
      title: 'Address',
      details: ['Saveetha University', 'Chennai, Tamil Nadu, India']
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: ['Monday - Friday: 9 AM - 5 PM', 'Saturday: 9 AM - 1 PM']
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Get in touch with us for any queries or support
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {contactInfo.map((info, index) => (
          <div
            key={index}
            className="glass-card rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center mb-4">
              <info.icon className="h-6 w-6 text-teal-400 mr-3" />
              <h2 className="text-xl font-semibold text-white">{info.title}</h2>
            </div>
            <div className="space-y-2">
              {info.details.map((detail, detailIndex) => (
                <p key={detailIndex} className="text-white/70">
                  {detail}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto glass-card rounded-xl p-8">
        <h2 className="text-2xl font-semibold text-white mb-6">Send us a Message</h2>
        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white/80 mb-2">Name</label>
              <input
                type="text"
                className="w-full bg-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-white/80 mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-white/80 mb-2">Subject</label>
            <input
              type="text"
              className="w-full bg-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50"
              placeholder="Message Subject"
            />
          </div>
          <div>
            <label className="block text-white/80 mb-2">Message</label>
            <textarea
              className="w-full bg-white/10 rounded-lg px-4 py-2 text-white placeholder-white/50 h-32"
              placeholder="Your Message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;