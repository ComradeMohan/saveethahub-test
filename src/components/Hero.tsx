import React from 'react';
import { GraduationCap, BookOpen, Award, Calendar,Group } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Separate GetStartedButton component
const GetStartedButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login'); // Ensure this route is correct (e.g. '/login' if needed)
  };

  return (
    <button
      onClick={handleClick}
      className="px-8 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors"
    >
      Get Started
    </button>
  );
};

// Hero component using the GetStartedButton
const Hero = () => {
  return (
    <div className="relative min-h-[calc(100vh-5rem)] pt-10 flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-500/20 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Your Academic
              <span className="text-teal-400"> Success Hub</span>
            </h1>
            <p className="text-xl text-white/80">
              Access tools, resources, and guidance to excel in your academic journey.
              Calculate CGPA, track attendance, and discover learning opportunities.
            </p>
            <div className="flex flex-wrap gap-4">
              <GetStartedButton />
              <button className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors backdrop-blur-sm">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: BookOpen,
                  title: 'Learning Resources',
                  desc: 'Interactive Concept Maps',
                  path: '/concept-maps'
                },
                {
                  icon: Award,
                  title: 'Skill Development',
                  desc: 'Free Certifications',
                  path: '/skills'
                },
                {
                  icon: Calendar,
                  title: 'Events',
                  desc: 'Stay Updated with Activities',
                  path: '/events'
                },
                
                {
                  icon: Group,
                  title: '',
                  desc: 'CGPA & Attendance Calculators',
                  path: '/community'
                }
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="p-6 bg-white/10 backdrop-blur-lg rounded-xl hover:transform hover:-translate-y-1 transition-all duration-300"
                >
                  <item.icon className="h-8 w-8 text-teal-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
