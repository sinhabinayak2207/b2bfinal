"use client";

import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Handle modal visibility with CSS transitions
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setIsAnimating(true);
      // Trigger animation after element is in DOM
      setTimeout(() => setIsAnimating(false), 10);
    } else if (isVisible) {
      setIsAnimating(true);
      // Wait for exit animation before removing from DOM
      setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 200);
    }
  }, [isOpen, isVisible]);
  
  // Close modal with escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-200 ${
          isAnimating && !isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Modal */}
        <div
          onClick={(e) => e.stopPropagation()}
          className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden transition-all duration-200 ${
            isAnimating && !isOpen 
              ? 'scale-95 opacity-0 translate-y-5' 
              : 'scale-100 opacity-100 translate-y-0'
          }`}
        >
          {/* Modal Header with Glowing Border */}
          <div className="relative bg-gradient-to-r from-blue-600 to-teal-400 p-0.5 rounded-t-2xl">
            <div className="bg-white dark:bg-gray-900 rounded-t-2xl">
              {/* Tabs */}
              <div className="flex">
                <button
                  onClick={() => setMode('login')}
                  className={`flex-1 py-4 text-center font-medium text-lg transition-colors ${
                    mode === 'login'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setMode('signup')}
                  className={`flex-1 py-4 text-center font-medium text-lg transition-colors ${
                    mode === 'signup'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  Sign Up
                </button>
              </div>
              
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Modal Body */}
          <div className="p-6">
            <div className={`transition-all duration-200 ${
              mode === 'login' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
            } ${mode === 'login' ? 'block' : 'hidden'}`}>
              <LoginForm onSwitchToSignup={() => setMode('signup')} />
            </div>
            <div className={`transition-all duration-200 ${
              mode === 'signup' ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
            } ${mode === 'signup' ? 'block' : 'hidden'}`}>
              <SignupForm onSwitchToLogin={() => setMode('login')} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;