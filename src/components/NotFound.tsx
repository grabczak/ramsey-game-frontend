import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="container mx-auto flex min-h-full flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-16">
        <h1 className="text-9xl">404</h1>
        <div className="flex flex-col items-center justify-center gap-4 md:items-start">
          <h2 className="text-center text-5xl md:text-left">Page not found</h2>
          <h3 className="text-center text-xl md:text-left">
            Requested resource could not be found on this server
          </h3>
        </div>
      </div>
      <Link to="/">
        <button className="rounded border-2 border-gray-800 px-3 py-1">
          Go back home
        </button>
      </Link>
    </div>
  );
}
