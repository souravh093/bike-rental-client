import { Frown, Home, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

export default function Error() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 text-white p-4">
      <div className="space-scene mb-8">
        <div className="stars"></div>
        <div className="planet"></div>
        <div className="astronaut">
          <Frown className="w-8 h-8" />
        </div>
      </div>
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! Looks like you're lost in space.</p>
      <div className="flex space-x-4">
        <Link
          to={"/"}
          className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors duration-200"
        >
          <Home className="mr-2" />
          Go Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="flex items-center px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-full transition-colors duration-200"
        >
          <RotateCcw className="mr-2" />
          Go Back
        </button>
      </div>
      <style>{`
        .space-scene {
          position: relative;
          width: 200px;
          height: 200px;
        }
        .stars {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: radial-gradient(
              2px 2px at 20px 30px,
              #eee,
              rgba(0, 0, 0, 0)
            ),
            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 90px 40px, #fff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 130px 80px, #fff, rgba(0, 0, 0, 0)),
            radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0, 0, 0, 0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: rotate 100s linear infinite;
        }
        .planet {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 120px;
          height: 120px;
          margin-top: -60px;
          margin-left: -60px;
          border-radius: 50%;
          background: linear-gradient(to bottom, #4b6cb7 0%, #182848 100%);
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
        }
        .astronaut {
          position: absolute;
          top: 60px;
          left: 100px;
          animation: float 6s ease-in-out infinite;
        }
        @keyframes rotate {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 200px 200px;
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </div>
  );
}
