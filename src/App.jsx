import React, { useState, useRef } from "react";
import pdf_format from "./assets/certificate_template.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CertificateGeneratorbyfrontend from "./pages/CertificateGeneratorbyfrontend";

const App = () => {
  
  return (
    <div>
      <CertificateGeneratorbyfrontend />
    </div>
    
  );
};

export default App;
