import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import problemsData from './problems.json';
import { auth, db } from './firebase';
import { collection, query, where, getDocs, doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';

const ProblemPage: React.FC = () => {
  const { language, problemId } = useParams<{ language: string; problemId: string }>();
  const navigate = useNavigate();
  const langData = problemsData.languages.find(
    (l) => l.name.toLowerCase() === language?.toLowerCase()
  );
  const problem = langData?.problems.find((p) => p.id === parseInt(problemId || '0'));

  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('No output yet');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingCode, setLoadingCode] = useState<boolean>(true);
  const [editorSize, setEditorSize] = useState({ width: 600, height: 400 });
  const [outputSize, setOutputSize] = useState({ width: 600, height: 300 });

  const editorRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const fetchUserCode = async () => {
    setLoadingCode(true);
    try {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        console.log("No user email found. Redirecting to login...");
        navigate("/login");
        return;
      }

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;
        const docRef = doc(db, 'user_codes', `${userId}_${problemId}_${language.toLowerCase()}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCode(docSnap.data().code);
        } else {
          setCode(problem?.sampleCode || '');
        }
      }
    } catch (err) {
      console.error("Error fetching user code:", err);
    } finally {
      setLoadingCode(false);
    }
  };

  useEffect(() => {
    fetchUserCode();
  }, [problemId]);

  if (!problem) {
    return <div className="text-white p-4">Problem not found</div>;
  }

  const handleRun = async () => {
    setLoading(true);
    try {
      const response = await fetch('/.netlify/functions/runCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, input: problem.sampleInput }),
      });
      const data = await response.json();
      setOutput(data.run?.stdout || data.run?.stderr || "No output");
    } catch (error) {
      setOutput(`Error running code: ${error.message}`);
    }
    setLoading(false);
  };

  const saveCode = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert('You need to be logged in to save code.');
      return;
    }
  
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userId = userDoc.id;
        const docRef = doc(db, 'user_codes', `${userId}_${problemId}_${language.toLowerCase()}`); // Ensuring same ID format
  
        await setDoc(docRef, {
          userId,
          problemId,
          problemTitle: problem?.title,
          code,
          language,
          updatedAt: serverTimestamp(),
        });
  
        alert('Code saved successfully!');
      }
    } catch (error) {
      console.error("Error saving code:", error);
    }
  };
  

  return (
    <div className="min-h-screen text-white p-4 max-w-6xl mx-auto">
      <button onClick={() => navigate('/labspage')} className="mb-4 bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded">
        Back to Labs
      </button>
      <h2 className="text-2xl font-bold mb-4">{problem.title}</h2>
      <p className="mb-4">{problem.description}</p>
      
      <div className="mb-4">
        <h3 className="font-semibold">Sample Input:</h3>
        <pre className="bg-gray-800 p-2 rounded overflow-auto">{problem.sampleInput}</pre>
        <h3 className="font-semibold mt-2">Sample Output:</h3>
        <pre className="bg-gray-800 p-2 rounded overflow-auto">{problem.sampleOutput}</pre>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div ref={editorRef} style={{ width: editorSize.width, height: editorSize.height }} className="relative border border-gray-700">
          {loadingCode ? (
            <div className="flex items-center justify-center w-full h-full bg-gray-900 text-gray-400">
              Loading code...
            </div>
          ) : (
            <Editor
              width={`${editorSize.width}px`}
              height={`${editorSize.height}px`}
              defaultLanguage={language?.toLowerCase()}
              value={code}
              onChange={(value) => setCode(value || '')}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: 'on',
              }}
            />
          )}
        </div>
        <div ref={outputRef} style={{ width: outputSize.width, height: outputSize.height }} className="relative bg-gray-900 p-4 rounded border border-gray-700">
          <h3 className="font-semibold">Output:</h3>
          <pre className="bg-gray-800 p-2 rounded overflow-auto" style={{ height: outputSize.height - 40 }}>{output}</pre>
        </div>
      </div>
      
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleRun}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 py-2 px-4 rounded disabled:opacity-50"
        >
          {loading ? 'Running...' : 'Run'}
        </button>
        <button
          onClick={saveCode}
          className="bg-gray-500 hover:bg-gray-600 py-2 px-4 rounded"
        >
          Save Code
        </button>
      </div>
    </div>
  );
};

export default ProblemPage;
