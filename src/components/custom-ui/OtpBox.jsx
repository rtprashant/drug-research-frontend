import React, { useState, useRef } from 'react';

const OtpBox = ({ onSubmit }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (value, index) => {
    if (/^[0-9]*$/.test(value)) { 
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (index) => {
    if (otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (event) => {
    const pasteData = event.clipboardData.getData("text").slice(0, 6);
    if (/^\d{1,6}$/.test(pasteData)) {
      const newOtp = pasteData.split("");
      setOtp([...newOtp, ...new Array(6 - newOtp.length).fill("")].slice(0, 6));
      if (inputRefs.current[5]) inputRefs.current[5].focus(); 
    }
    event.preventDefault();
  };

  const handleSubmit = () => {
    onSubmit(otp.join(""));
  };

  return (
    <div className="flex justify-center items-center flex-col space-y-4">
      <div className="flex space-x-2">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            maxLength="1"
            className="w-12 h-12 text-center border border-gray-400 rounded focus:outline-none focus:ring focus:ring-blue-300"
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => e.key === "Backspace" && handleBackspace(index)}
            onPaste={handlePaste}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
        disabled={otp.includes("")}
      >
        Submit OTP
      </button>
    </div>
  );
};

export default OtpBox;
