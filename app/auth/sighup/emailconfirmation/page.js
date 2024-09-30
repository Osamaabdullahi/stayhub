import { FaHome } from "react-icons/fa";
import Image from "next/image";

export default function ConfirmEmail() {
  return (
    <div className="min-h-screen flex">
      {/* Left Half - Icon Section with Background Image */}
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-gradient-to-b from-gray-900 to-transparent text-white relative">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
          <FaHome className="text-6xl mb-4" />
          <h1 className="text-3xl font-bold mb-2">StayHub</h1>
          <p className="text-lg">Find your perfect stay with us!</p>
        </div>
        <Image
          src="/images/cottage.jpg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="absolute inset-0 z-0"
        />
      </div>

      {/* Right Half - Confirmation Message Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-red-500">
            <FaHome className="inline-block mr-2 text-2xl" />
            Confirm Your Email
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            Thank you for signing up! We've sent a confirmation link to your
            email address. Please check your inbox and click the link to confirm
            your email.
          </p>
          <p className="text-gray-700 mb-6 text-center">
            Didn't receive the email? Please check your spam folder or
            <a href="#" className="text-blue-500 underline">
              resend the confirmation email
            </a>
            .
          </p>
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mb-2">
            Resend Email
          </button>
        </div>
      </div>
    </div>
  );
}
