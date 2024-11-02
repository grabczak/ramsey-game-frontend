import { Link } from "react-router-dom";

export function Rules() {
  return (
    <div className="container mx-auto max-w-lg flex flex-col justify-center min-h-full font-mono text-justify items-center gap-6 p-10">
      <h1 className="text-4xl font-bold text-center">Rules</h1>
      {/* prettier-ignore */}
      <p>
        Let <strong>n</strong> be a natural number and <strong>K<sub>n</sub></strong> a clique with <strong>n</strong> vertices.
        Two players alternate coloring still uncolored edges of <strong>K<sub>n</sub></strong>,
        each of them with their assigned color and choosing one edge per move.
        For a given natural number <strong>m</strong>,
        the winner is the first player to obtain a monochromatic subclique <strong>K<sub>m</sub></strong> of <strong>K<sub>n</sub></strong> in their color.
      </p>
      {/* prettier-ignore */}
      <p>
        Your assigned color is <strong><span className="text-blue-500">blue</span></strong>.
        The server is your opponent and his color is <strong><span className="text-red-500">red</span></strong>.
      </p>
      {/* prettier-ignore */}
      <p>
        There is a strong mathematical theory related to this problem.
        You can read more about it <a href="https://www.cs.umd.edu/~gasarch/papers/ramseygames.pdf" target="_blank" className="text-blue-700 underline hover:no-underline">here</a>.
      </p>
      <Link to="/">
        <button className="border-2 border-gray-800 rounded px-3 py-1">
          &larr; Go back
        </button>
      </Link>
    </div>
  );
}