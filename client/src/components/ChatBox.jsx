import React, { useState, useRef, useEffect } from "react";

const faqData = [
  {
    question: "How do I sign up?",
    answer: "Signing up is easy! Click the 'Sign Up' button in the top navigation bar. Enter your name, email, and create a password. Once registered, you'll have immediate access to your dashboard where you can start creating blogs."
  },
  {
    question: "How does BlogGen work?",
    answer: "BlogGen is an AI-powered blog platform. After signing up, go to your Dashboard and click 'Create Blog'. Enter a topic or idea, and our AI will generate a complete blog post for you. You can then edit, customize, and publish it instantly!"
  },
  {
    question: "How does AI generate posts?",
    answer: "Our AI uses advanced language models to create high-quality blog content. Simply provide a topic, title, or brief description, and the AI analyzes your input to generate relevant, engaging, and SEO-friendly blog posts in seconds."
  },
  {
    question: "Is BlogGen free to use?",
    answer: "Yes! BlogGen is currently free to use. We're an AI-based blog posting solution that started in 2025, and in 2026 we will fully automate the complete blogging process with even more powerful AI features."
  },
  {
    question: "Can I edit AI-generated content?",
    answer: "Absolutely! After the AI generates your blog post, you have full control to edit the title, content, add images, and customize everything before publishing. The AI gives you a head start, and you make it perfect."
  },
  {
    question: "Contact support",
    answer: "For any questions or support, email us at contact@bloggen.com. Our team typically responds within 24 hours. We're here to help you succeed with your blogging journey!"
  }
];

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! Welcome to BlogGen. How can I help you today? Choose a question below or type your own." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuestionClick = (faq) => {
    setMessages(prev => [
      ...prev,
      { type: "user", text: faq.question },
      { type: "bot", text: faq.answer }
    ]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim().toLowerCase();
    setMessages(prev => [...prev, { type: "user", text: inputValue }]);
    setInputValue("");

    const matchedFaq = faqData.find(faq => 
      faq.question.toLowerCase().includes(userMessage) ||
      userMessage.includes(faq.question.toLowerCase().split(" ")[0])
    );

    if (matchedFaq) {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: "bot", text: matchedFaq.answer }]);
      }, 500);
    } else if (userMessage.includes("contact") || userMessage.includes("help") || userMessage.includes("talk")) {
      setTimeout(() => {
        setMessages(prev => [...prev, { type: "bot", text: "I'd be happy to connect you with our team! Please fill out the contact form below." }]);
        setShowContactForm(true);
      }, 500);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: "bot", 
          text: "I'm not sure about that. Please choose from the questions below, or contact us at contact@bloggen.com for personalized help!" 
        }]);
      }, 500);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setShowContactForm(false);
    setMessages(prev => [...prev, { 
      type: "bot", 
      text: `Thank you ${contactForm.name}! We've received your message and will get back to you at ${contactForm.email} within 24 hours.` 
    }]);
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden flex flex-col" style={{ height: "500px" }}>
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-lg">BlogGen Assistant</h3>
              <p className="text-sm opacity-90">Ask us anything!</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
                  msg.type === "user" 
                    ? "bg-blue-600 text-white rounded-br-none" 
                    : "bg-white text-gray-700 border border-gray-200 rounded-bl-none shadow-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />

            {/* Contact Form */}
            {showContactForm && !formSubmitted && (
              <form onSubmit={handleContactSubmit} className="bg-white p-3 rounded-lg border border-gray-200 space-y-2">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Your Message"
                  required
                  rows={2}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Quick Questions */}
          <div className="px-3 py-2 bg-gray-100 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-1">
              {faqData.slice(0, 4).map((faq, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(faq)}
                  className="text-xs bg-white border border-gray-300 px-2 py-1 rounded-full hover:bg-blue-50 hover:border-blue-300 text-gray-600"
                >
                  {faq.question.length > 20 ? faq.question.substring(0, 18) + "..." : faq.question}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ChatBox;
