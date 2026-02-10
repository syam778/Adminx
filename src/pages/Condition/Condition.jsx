import React from "react";
import "./Condition.css";

const Condition = () => {
  return (
    <div className="terms-container">
      <div className="terms-card">
        <h2>Terms & Conditions</h2>

        <ol className="terms-list">
          <li>User must provide accurate and complete information.</li>
          <li>Providing false or misleading data is strictly prohibited.</li>
          <li>User is responsible for maintaining data confidentiality.</li>
          <li>All submitted information may be securely stored.</li>
          <li>User data will not be shared without permission.</li>
          <li>User agrees to follow all applicable laws and regulations.</li>
          <li>Service provider is not responsible for incorrect submissions.</li>
          <li>Service availability may change without notice.</li>
          <li>Misuse of the service may result in termination.</li>
          <li>Terms may be updated at any time.</li>
          <li>Continued use implies acceptance of updated terms.</li>
          <li>Service is provided on an “as-is” basis.</li>
          <li>No liability for indirect or incidental damages.</li>
          <li>Illegal activities using the platform are prohibited.</li>
          <li>Using this service means you accept all terms listed above.</li>
        </ol>
      </div>
    </div>
  );
};

export default Condition;
