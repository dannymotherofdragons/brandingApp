import React, { useEffect, useState } from "react";

export default function EmailGate({ children }) {
  const [unlocked, setUnlocked] = useState(
    () => !!localStorage.getItem("colorMoodEmail")
  );

  // Close modal when MailerLite confirms subscription
  useEffect(() => {
    const done = () => {
      localStorage.setItem("colorMoodEmail", "true");
      setUnlocked(true);
    };
    window.addEventListener("ml:form:success", done);
    return () => window.removeEventListener("ml:form:success", done);
  }, []);

  if (unlocked) return <>{children}</>;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-2">Unlock One-Click Hex Copy</h2>
        <p className="mb-4 text-gray-700">
          Enter your email to copy any color’s hex code with a single click.
        </p>

        {/* MailerLite injects its form here */}
        <div className="ml-embedded" data-form="QAC7Ec"></div>

        <p className="mt-4 text-xs text-gray-500">
          We’ll never share your email. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );
}
