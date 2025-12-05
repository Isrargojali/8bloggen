import React, { useState } from "react";

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <p className="text-sm opacity-90">We're here to help!</p>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                Welcome to <strong>BlogGen</strong> - an AI-based blog posting solution that started in 2025.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                In <strong>2026</strong>, we will fully automate the complete blogging process with AI!
              </p>
            </div>

            <div className="border-t pt-4">
              <p className="text-gray-600 text-sm mb-2">Have questions? Reach out to us:</p>
              <a
                href="mailto:contact@bloggen.com"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>contact@bloggen.com</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
      >
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ChatBox;
