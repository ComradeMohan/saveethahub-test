import React from "react";
import { useLocation } from "react-router-dom";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const PdfViewer: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const pdfUrl = params.get("file");

  if (!pdfUrl) {
    return (
      <div className="h-screen flex justify-center items-center text-white text-lg">
        No PDF selected.
      </div>
    );
  }

  return (
    <div className="h-screen pt-10 flex flex-col">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <Viewer fileUrl={pdfUrl} />
      </Worker>
    </div>
  );
};

export default PdfViewer;
