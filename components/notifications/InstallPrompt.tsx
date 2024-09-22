import React, { useState,useEffect } from "react";

const InstallPrompt = () => {
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    )
 
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches)
  }, [])
  if (isStandalone) {
    return null;
  }

  return (
    <div className="absolute p-3 rounded-lg w-full bg-[#eee]">
      <button className="text-[#88226F]">Add to Home Screen</button>
      {isIOS && (
        <p className="text-[#88226F]">
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {' '}
            ⎋{' '}
          </span>and then Add to Home Screen
          <span role="img" aria-label="plus icon">
            {' '}
            ➕{' '}
          </span>.
        </p>
      )}
    </div>
  );
};

export default InstallPrompt