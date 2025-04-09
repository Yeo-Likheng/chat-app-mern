import React, { useState, useEffect } from "react";

const AuthImagePattern = ({ title, subtitle, image1 = "/src/assets/male-image.avif", image2 = "/src/assets/female-image.jpg" }) => {
  const [animatedBoxes, setAnimatedBoxes] = useState([0, 2, 4, 6, 8]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedBoxes(prev => 
        prev[0] === 0 ? [1, 3, 5, 7] : [0, 2, 4, 6, 8]
      );
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary/10 overflow-hidden ${
                animatedBoxes.includes(i) ? "animate-pulse" : ""
              }`}
            >
              {animatedBoxes.includes(i) ? (
                <img 
                  src={image1} 
                  alt="Animation 1" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={image2} 
                  alt="Animation 2" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;