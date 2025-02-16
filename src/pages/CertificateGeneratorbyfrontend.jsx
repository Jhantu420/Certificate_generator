
import React, { useState, useRef } from "react";
import pdf_format from "../assets/certificate_template.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const CertificateGeneratorbyfrontend = () => {
  const [name, setName] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const certificateRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedName(name);
  };

  const downloadPDF = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current, {
        scale: 5, // Higher scale for better quality
        useCORS: true, // Ensure images load properly
        backgroundColor: null, // Remove background
      }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = canvas.width / 3; // Maintain correct aspect ratio
        const imgHeight = canvas.height / 3;

        const pdf = new jsPDF({
          orientation: imgWidth > imgHeight ? "landscape" : "portrait",
          unit: "px",
          format: [imgWidth, imgHeight], // Exact size as image
        });

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("certificate.pdf");
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
        marginTop:"30px"
      }}
    >
      {/* Input Field */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {/* Certificate Container */}
      <div
        ref={certificateRef}
        style={{
          position: "relative",
          display: "inline-block",
        }}
      >
        <img
          src={pdf_format}
          alt="Certificate"
          style={{ width: "800px" }} // Increase width for better clarity
        />

        {/* Display the submitted name on the image */}
        {submittedName && (
          <div
            style={{
              position: "absolute",
              top: "47%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: "bold",
              fontSize: "32px",
              color: "black",
              fontFamily: "Arial, sans-serif",
              textAlign: "center",
              color: "#0e49a8",
            }}
          >
            {submittedName}
          </div>
        )}
      </div>

      {/* Download PDF Button */}
      <button onClick={downloadPDF} style={{ marginTop: "20px" }}>
        Download Certificate
      </button>
    </div>
  );
};

export default CertificateGeneratorbyfrontend;
