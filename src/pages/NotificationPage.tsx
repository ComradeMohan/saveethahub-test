import React from "react";
import { motion } from "framer-motion";

const notifications = [
  {
    date: "Feb 05, 2025",
    title: "APPROVED ELECTIVE NPTEL COURSES",
    content: "",
    fileLink: "https://drive.google.com/file/d/1x5B6DAqm7LB6XWrGq5FfQ8k-oHo2DYY2/view?usp=sharing",
    fileLabel: "NPTEL COURSES",
  },
  {
    date: "Jan 25, 2025",
    title: "Hostllers courses are APPROVED",
    content: "",
    fileLink: null,
  },
  {
    date: "Jan 17, 2025",
    title: "Courses for Ds and Hostlers",
    content: "Updated courses pdf in excel sheet for easy filtering and searching.",
    fileLink: "https://docs.google.com/spreadsheets/d/1eEOCQ6xawpvsWWmwOU_JU9nuR0Q4MAQa/edit?usp=sharing",
    fileLabel: "Courses for Ds, Hostllers",
  },
  {
    date: "Jan 16, 2025",
    title: "Results are coming soon",
    content: "",
    fileLink: null,
  },
  {
    date: "Jan 13, 2025",
    title: "Faculties Phone Number",
    content: "Check out our updated faculties phone number. Use it only for academic purposes.",
    fileLink: "https://docs.google.com/spreadsheets/d/1iy65VhiTq2o9ensXNaxs_hbuEgt-xNAv/edit?usp=sharing",
    fileLabel: "Faculty Phone Numbers",
  },
  {
    date: "Jan 11, 2025",
    title: "Course Clarifications",
    content: `For CSE Students (2021 Regulations):\n\n- 33 Mandatory Courses\n- 8 Electives: 2 Open Electives, 6 Program Electives\n  - PDD mapped with 3 electives\n  - Remaining 3 electives: University courses or 3 NPTEL courses (University will provide eligible list)\n  - MPMC and FOC are Program Electives\n\nCore Special Courses (Mandatory): Embedded Systems, BEEE, Numerical Methods, Engineering Maths II/III`,
    fileLink: "https://docs.google.com/document/d/1TxFoQ-wZxJQOntVm4-b_9AFGKz2q2qNl/edit?usp=sharing",
    fileLabel: "Curriculum and Evaluation Rubrics",
  },
];

const Notifications = () => {
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <h1 className="text-3xl font-bold text-white mb-6">Notifications</h1>
      <div id="notifications-container" className="space-y-4">
        {notifications.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white/15 p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="text-gray-300 text-sm">{item.date}</div>
            <div className="content mt-2">
              <h2 className="text-lg font-semibold text-white">{item.title}</h2>
              {item.content && <p className="text-gray-300 mt-1">{item.content}</p>}
              {item.fileLink && (
                <a
                  className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  href={item.fileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.fileLabel}
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
