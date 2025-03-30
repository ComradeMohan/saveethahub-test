import React from 'react';
import { Calculator, Clock, Compass, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const Features = () => {
  const features = [
    {
      icon: Calculator,
      title: 'CGPA Calculator',
      description: 'Calculate your CGPA easily with our intuitive calculator. Track your academic progress and set goals.',
      color: 'from-blue-500 to-blue-600',
      path: '/cgpa-calculator' // Path for CGPA Calculator
    },
    {
      icon: Clock,
      title: 'Attendance Tracker',
      description: 'Monitor your attendance across subjects. Stay informed about your attendance percentage.',
      color: 'from-teal-500 to-teal-600',
      path: '/attendance' // Path for Attendance Tracker
    },
    {
      icon: Compass,
      title: 'Concept Maps',
      description: 'Visual learning aids to understand complex topics. Interactive and comprehensive study materials.',
      color: 'from-purple-500 to-purple-600',
      path: '/concept-maps' // Path for Concept Maps
    },
    {
      icon: Award,
      title: 'Free Certifications',
      description: 'Enhance your skills with free certification courses. Learn from industry experts.',
      color: 'from-pink-500 to-pink-600',
      path: '/certifications' // Path for Free Certifications
    }
  ];

  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">
          Everything You Need to Succeed
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Access powerful tools and resources designed to support your academic journey
          and professional development.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <Link // Wrap each feature in a Link for navigation
            key={index}
            to={feature.path} // Set the destination path here
            className="group relative bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:transform hover:-translate-y-2 transition-all duration-300"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`}></div>
            <feature.icon className="h-12 w-12 text-white mb-4" />
            <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
            <p className="text-white/70">{feature.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Features;
