import React from "react";
import "./Visualization.css";

const Visualization = () => {
  return (
    <div className="visualization-container">
      <h1>Power BI Dashboard</h1>
      <iframe
        title="Power BI Report"
        src="https://app.powerbi.com/reportEmbed?reportId=16e3f070-d073-463f-b652-128695c42041&autoAuth=true&ctid=813e6569-4e44-4d95-88a0-16a97bd5277c"
        frameBorder="0"
        allowFullScreen
        className="powerbi-frame"
      ></iframe>
    </div>
  );
};

export default Visualization;
