import React from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { FileText } from "lucide-react";

const DocumentPreview = ({ job }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    job.uploadFileUrl && (
      <div className="post-history-detail-document">
        <h2 className="post-history-detail-section-title">
          <FileText size={20} /> Document Preview
        </h2>
        <div className="post-history-detail-pdf-viewer">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl={job.uploadFileUrl}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </div>
      </div>
    )
  );
};

export default DocumentPreview;
