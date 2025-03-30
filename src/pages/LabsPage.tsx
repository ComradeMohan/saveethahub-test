import React from 'react';
import { Link } from 'react-router-dom';
import problemsData from '../problems.json';

const LabsPage: React.FC = () => {
  const getSolvedProblems = () => JSON.parse(localStorage.getItem('solvedProblems') || '[]');

  return (
    <div className="min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 bg-[url('/assets/hero-bg.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 opacity-60"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            Master Programming Skills
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Practice coding problems and enhance your skills across multiple languages.
          </p>
        </div>
      </section>

      {/* Programming Languages Section */}
      <section className="pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Programming Languages</h2>
          {problemsData.languages.map((language) => {
            const solvedProblems = getSolvedProblems();
            const solvedCount = solvedProblems.filter(
              (p: { language: string; problemId: number }) =>
                p.language === language.name.toLowerCase()
            ).length;
            return (
              <div key={language.name} className="mb-12">
                <h3 className="text-2xl font-semibold mb-4">
                  {language.name} - Solved {solvedCount} / {language.problems.length}
                </h3>
                <div className="overflow-x-auto whitespace-nowrap pb-4">
                  <div className="flex space-x-4">
                    {language.problems.map((problem) => {
                      const isSolved = solvedProblems.some(
                        (p: { language: string; problemId: number }) =>
                          p.language === language.name.toLowerCase() &&
                          p.problemId === problem.id
                      );
                      return (
                        <div
                          key={problem.id}
                          className="bg-gray-800 rounded-xl p-6 shadow-lg w-72 shrink-0 transform hover:scale-105 transition duration-300 overflow-hidden"
                        >
                          <h4 className="text-lg font-bold truncate w-full">{problem.title}</h4>
                          <p className="text-gray-300 mt-2 line-clamp-3 overflow-hidden text-ellipsis">
                            {problem.description.substring(0, 100)}...
                          </p>
                          <div className="mt-4 flex items-center justify-between">
                            <Link
                              to={`/labs/${language.name.toLowerCase()}/${problem.id}`}
                              className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full font-semibold transition-colors"
                            >
                              Solve Problem
                            </Link>
                            {isSolved && <span className="text-green-400">✔ Solved</span>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default LabsPage;
