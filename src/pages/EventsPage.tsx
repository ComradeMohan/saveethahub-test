import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';

const EventsPage = () => {
  const events = [
    {
      title: 'Python Programming Workshop 2024',
      date: 'November 24, 2024',
      location: 'Top Engineers',
      attendees: 250,
      category: 'Workshop',
      registrationFee: 'Paid',
      lastDateSubmission: 'November 20, 2024',
      link: 'https://rzp.io/rzp/gFzlYmQz'
    },
    {
      title: '5-Day Online FDP on Generative AI and Prompt Engineering 2024',
      date: 'November 25th - 29th 2024',
      location: 'SRM Vadapalani',
      attendees: 500,
      category: 'Career',
      registrationFee: '300',
      lastDateSubmission: 'November 14 2024',
      link: 'https://example.com/register-career-fair'
    },
    {
      title: 'PEC HACKS 2.O',
      date: 'December 28th - 29th 2024',
      location: 'Panimalar Engineering College',
      attendees: 150,
      category: 'Hackathon',
      registrationFee: 'Free',
      lastDateSubmission: 'March 30, 2024',
      link: 'https://pechacks2.devfolio.co/'
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Upcoming Events</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Stay updated with the latest events and activities happening on campus
        </p>
      </div>

      <div className="space-y-6">
        {events.map((event, index) => (
          <div
            key={index}
            className="glass-card rounded-xl p-6 hover:transform hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center mb-2">
                  <span className="px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full text-sm">
                    {event.category}
                  </span>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2">{event.title}</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center text-white/70">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-white/70">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{event.attendees} Attending</span>
                  </div>
                </div>

                <p className="text-white/70 mt-2">Registration Fee: {event.registrationFee}</p>
                <p className="text-white/70">Last Date for Submission: {event.lastDateSubmission}</p>
              </div>

              {/* Wrap the button in an anchor tag */}
              <a href={event.link} target="_blank" rel="noopener noreferrer">
                <button className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors whitespace-nowrap">
                  Register Now
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
