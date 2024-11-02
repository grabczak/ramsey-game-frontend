import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-full font-mono container mx-auto p-8 gap-8">
      <div className="flex flex-col gap-4 items-center md:flex-row md:gap-16">
        <h1 className="text-9xl">404</h1>
        <div className="flex flex-col justify-center items-center gap-4 md:items-start">
          <h2 className="text-5xl text-center md:text-left">Page not found</h2>
          <h3 className="text-xl text-center md:text-left">
            Requested resource could not be found on this server
          </h3>
        </div>
      </div>
      <Link to="/">
        <button className="border-2 border-gray-800 rounded px-3 py-1">
          Go back home
        </button>
      </Link>
    </div>
  );
}
