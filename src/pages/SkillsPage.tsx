import React from 'react';
import { Code, Palette, Video, Database } from 'lucide-react';

const SkillsPage = () => {
  const skillCategories = [
    {
      title: 'Programming',
      icon: Code,
      skills: [
        { name: 'Web Development', level: 'Beginner to Advanced', link: 'https://www.codecademy.com/catalog/subject/web-development' },
        { name: 'Python Programming', level: 'All Levels', link: 'https://www.w3schools.com/python/' },
        { name: 'Mobile App Development', level: 'Intermediate', link: 'https://developer.android.com/courses' },
        { name: 'Data Structures', level: 'Advanced', link: 'https://visualgo.net/en' }
      ]
    },
    {
      title: 'Design',
      icon: Palette,
      skills: [
        { name: 'UI/UX Design', level: 'Beginner', link: 'https://www.codecademy.com/learn/intro-to-ui-ux' },
        { name: 'Graphic Design', level: 'Intermediate', link: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/intro-to-graphic-design-with-photoshop' },
        { name: '3D Modeling', level: 'Advanced', link: 'https://www.udemy.com/topic/3d-modeling/free/?utm_source=bing&utm_medium=udemyads&utm_campaign=BG-Search_DSA_GammaCatchall_NonP_la.EN_cc.India&campaigntype=Search&portfolio=Bing-India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Gamma&utm_content=deal4584&utm_term=_._ag_1316117806681635_._ad__._kw_udemy_._de_c_._dm__._pl__._ti_dat-2334057027983529:loc-90_._li_155185_._pd__._&matchtype=b&msclkid=933fa876e875127a0005cf4f984e6e17' },
        { name: 'Motion Graphics', level: 'All Levels', link: 'https://alison.com/course/principles-of-animation?utm_source=bing&utm_medium=cpc&utm_campaign=531498933&utm_content=1356799886365176&utm_term=kwd-84801158857640:loc-90&msclkid=184c86fe947f10c5ab08e1c7e419f3e5' }
      ]
    },
    {
      title: 'Digital Media',
      icon: Video,
      skills: [
        { name: 'Video Editing', level: 'Beginner', link: 'https://www.mygreatlearning.com/academy/learn-for-free/courses/video-editing-basics' },
        { name: 'Sound Design', level: 'Advanced', link: 'https://www.classcentral.com/subject/sound-design' },
        { name: 'Content Creation', level: 'All Levels', link: 'https://www.classcentral.com/subject/content-creation' }
      ]
    },
    {
      title: 'Data Science',
      icon: Database,
      skills: [
        { name: 'Machine Learning', level: 'Advanced', link: 'https://aws.amazon.com/training/learn-about/machine-learning/?trk=990206a9-7378-4427-aa6e-63726deb06a1&sc_channel=ps&s_kwcid=AL!4422!10!71743393634831!71743930463137&s_kwcid=AL!4422!10!71743393634831!71743930463137&ef_id=fd7c78f836b918997d651fc14788d6ab:G:s&msclkid=fd7c78f836b918997d651fc14788d6ab' },
        { name: 'Data Analysis', level: 'Intermediate', link: 'https://www.simplilearn.com/learn-data-analytics-for-beginners-skillup' },
        { name: 'Data Visualization', level: 'Beginner', link: 'https://www.kaggle.com/learn/data-visualization' }
      ]
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Learn New Skills</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Enhance your professional portfolio with our curated skill development courses
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {skillCategories.map((category, index) => (
          <div key={index} className="glass-card rounded-xl p-6">
            <div className="flex items-center mb-6">
              <category.icon className="h-8 w-8 text-teal-400 mr-3" />
              <h2 className="text-2xl font-semibold text-white">{category.title}</h2>
            </div>
            <div className="space-y-4">
              {category.skills.map((skill, skillIndex) => (
                <a
                  key={skillIndex}
                  href={skill.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-white font-medium">{skill.name}</h3>
                    <span className="text-sm text-teal-400">{skill.level}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsPage;
