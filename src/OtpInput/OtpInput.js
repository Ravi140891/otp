import React, { useState, useEffect } from "react";
import "./OtpInput.css";

const OtpInput = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  // function to handle input change
  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== "" && index < 5) {
      document.getElementById(index + 1).focus();
    }
  };

  // function to handle backspace
  const handleBackspace = (index, e) => {
    e.preventDefault();
    const newOtp = [...otp];
    newOtp[index] = "";
    setOtp(newOtp);
    if (index > 0) {
      document.getElementById(index - 1).focus();
    }
  };

  // function to handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData("Text").slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      if (isNaN(pastedData[i])) break;
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
  };

  // focus the first input field on component mount
  useEffect(() => {
    document.getElementById(0).focus();
  }, []);

  // function to clear input fields
  const clearFields = () => {
    setOtp(["", "", "", "", "", ""]);
    document.getElementById(0).focus();
  };

  return (
    <div className="wrapper">
      <div className="container">
        <h3>Enter verification code</h3>
        <div className="input_fields">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace") handleBackspace(index, e);
              }}
              onPaste={(e) => handlePaste(e)}
              id={index}
              className="input"
            />
          ))}
        </div>
        <div className="btn_container">
          <button className="btn" onClick={clearFields}>
            Clear
          </button>
          <button className="btn">Get OTP</button>
        </div>
      </div>
      <ul>
        {otp.join("").length === 6 && (
          <li>
            <span>Your OTP is: </span>
            {otp.join("")}
          </li>
        )}
      </ul>
    </div>
  );
};

export default OtpInput;
