import React from 'react';
import { BookOpen, Users, Trophy, BarChart } from 'lucide-react';

const AcademicsPage = () => {
  const programs = [
    {
      icon: BookOpen,
      title: 'Engineering',
      description: 'Cutting-edge programs in various engineering disciplines',
      courses: ['Computer Science', 'Mechanical', 'Electrical', 'Civil']
    },
    {
      icon: Users,
      title: 'Management',
      description: 'Business and management programs for future leaders',
      courses: ['MBA', 'BBA', 'Executive Management']
    },
    {
      icon: Trophy,
      title: 'Medical Sciences',
      description: 'Comprehensive medical and healthcare programs',
      courses: ['MBBS', 'Dental', 'Nursing', 'Pharmacy']
    },
    {
      icon: BarChart,
      title: 'Research',
      description: 'Advanced research opportunities across disciplines',
      courses: ['PhD Programs', 'Research Centers', 'Publications']
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Academic Programs</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Discover our comprehensive range of academic programs designed to prepare you for success
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {programs.map((program, index) => (
          <div
            key={index}
            className="glass-card rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all duration-300"
          >
            <program.icon className="h-12 w-12 text-teal-400 mb-4" />
            <h2 className="text-2xl font-semibold text-white mb-3">{program.title}</h2>
            <p className="text-white/70 mb-4">{program.description}</p>
            <div className="grid grid-cols-2 gap-2">
              {program.courses.map((course, courseIndex) => (
                <div
                  key={courseIndex}
                  className="bg-white/5 rounded-lg px-3 py-2 text-white/90 text-sm"
                >
                  {course}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicsPage;