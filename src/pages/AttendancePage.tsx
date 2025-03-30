import React, { useState } from 'react';

interface Subject {
  name: string;
  totalClasses: number;
  attendedClasses: number;
}

const AttendancePage = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { name: '', totalClasses: 0, attendedClasses: 0 }
  ]);

  const addSubject = () => {
    setSubjects([...subjects, { name: '', totalClasses: 0, attendedClasses: 0 }]);
  };
  const updateSubject = (index: number, field: keyof Subject, value: string | number) => {
    const newSubjects = [...subjects];
    newSubjects[index] = { ...newSubjects[index], [field]: value };
    setSubjects(newSubjects);
  };

  const calculatePercentage = (attended: number, total: number): number => {
    return total > 0 ? (attended / total) * 100 : 0;
  };

  const calculateMissableClasses = (attended: number, total: number) => {
    return Math.floor(total * 0.2)- (total - attended); // Can miss up to 20%
  };

  const calculateAdditionalClassesNeeded = (total: number, attended: number) => {
    return Math.ceil((0.8*total-attended)/0.2); // How many more classes need to be attended
  };

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Attendance Calculator</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Track and calculate your attendance percentage for each subject
        </p>
      </div>

      <div className="max-w-4xl mx-auto glass-card rounded-xl p-8">
        {subjects.map((subject, index) => {
          const percentage = calculatePercentage(subject.attendedClasses, subject.totalClasses);
          const missableClasses = calculateMissableClasses(subject.attendedClasses,subject.totalClasses);
          const additionalClassesNeeded = calculateAdditionalClassesNeeded(subject.totalClasses, subject.attendedClasses);

          return (
            <div key={index} className="mb-6 p-6 bg-white/5 rounded-xl">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 mb-2">Total Classes</label>
                  <input
                    type="number"
                    value={subject.totalClasses || ''}
                    onChange={(e) => updateSubject(index, 'totalClasses', Number(e.target.value))}
                    className="w-full bg-white/10 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white/80 mb-2">Classes Attended</label>
                  <input
                    type="number"
                    value={subject.attendedClasses || ''}
                    onChange={(e) => updateSubject(index, 'attendedClasses', Number(e.target.value))}
                    className="w-full bg-white/10 rounded-lg px-4 py-2 text-white"
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Attendance Percentage:</span>
                  <span className="text-xl font-bold text-white">{percentage.toFixed(2)}%</span>
                </div>
                <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-teal-500 transition-all duration-300"
                    style={{
                      width: `${percentage}%`
                    }}
                  ></div>
                </div>

                {/* Display messages based on attendance percentage */}
                <div className="mt-4 text-white/80">
                  {percentage >= 80 ? (
                    <>
                      <p>OK! You can miss up to {missableClasses} more classes.</p>
                    </>
                  ) : (
                    <>
                      <p>You need to attend {additionalClassesNeeded} more class{additionalClassesNeeded === 1 ? '' : 'es'} to reach the required attendance.</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <button
          onClick={addSubject}
          className="w-full px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
        >
          Add Subject
        </button>
      </div>
    </div>
  );
};

export default AttendancePage;