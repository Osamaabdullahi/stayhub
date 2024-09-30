import React, { useState, useEffect } from "react";
import { FiX, FiCheck } from "react-icons/fi";

const NotificationComponent = ({
  message,
  type = "success",
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full z-10 transform transition-all ease-in-out duration-300 scale-100 opacity-100">
        <div
          className={`p-4 ${
            type === "success" ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FiCheck className="h-6 w-6 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm leading-5 font-medium text-white">
                  {type === "success" ? "Success" : "Notification"}
                </p>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                onClick={() => {
                  setIsVisible(false);
                  onClose();
                }}
                className="inline-flex text-white focus:outline-none focus:text-gray-200 transition ease-in-out duration-150"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <p className="text-sm leading-5 text-gray-500">{message}</p>
        </div>
        <div className="px-4 py-4 sm:px-6 sm:flex sm:flex-row-reverse">
          <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setIsVisible(false);
                onClose();
              }}
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Close
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationComponent;
