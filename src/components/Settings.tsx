import { Link } from "react-router-dom";

import {
  useAppSelector,
  useAppDispatch,
  setGraphSize,
  setSubcliqueSize,
} from "src/store";
import { getMaxSubcliqueSize } from "src/utils";

export function Settings() {
  const graphSize = useAppSelector((state) => state.game.graph.nodes.length);

  const subcliqueSize = useAppSelector((state) => state.game.subcliqueSize);

  const resume = useAppSelector((state) =>
    state.game.graph.edges.some((e) => e.team !== "none"),
  );

  const dispatch = useAppDispatch();

  const handleGraphSizeChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    dispatch(setGraphSize({ graphSize: Number(e.target.value) }));
  };

  const handleSubcliqueSizeChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    dispatch(setSubcliqueSize({ subcliqueSize: Number(e.target.value) }));
  };

  const minGraphSize = 4;
  const maxGraphSize = 9;
  const minSubcliqueSize = 3;
  const maxSubcliqueSize = getMaxSubcliqueSize(graphSize);

  return (
    <div className="container mx-auto flex min-h-full max-w-lg flex-col justify-center p-4">
      <h1 className="mb-6 text-center text-4xl font-bold">Ramsey Game</h1>
      <form className="flex flex-col items-center gap-6">
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="graph-size" className="text-lg">
            Graph size: {graphSize}
          </label>
          <input
            id="graph-size"
            type="range"
            value={graphSize}
            onChange={handleGraphSizeChange}
            min={minGraphSize}
            max={maxGraphSize}
            step={1}
            className="h-2 cursor-pointer appearance-none rounded bg-gray-300"
          />
          <div className="flex justify-between">
            <span className="text-xs">Min: ({minGraphSize})</span>
            <span className="text-xs">Max: ({maxGraphSize})</span>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="clique-size" className="text-lg">
            Subclique size: {subcliqueSize}
          </label>
          <input
            id="clique-size"
            type="range"
            value={subcliqueSize}
            onChange={handleSubcliqueSizeChange}
            min={minSubcliqueSize}
            max={maxSubcliqueSize}
            step={1}
            className="h-2 cursor-pointer appearance-none rounded bg-gray-300"
          />
          <div className="flex justify-between">
            <span className="text-xs">Min: ({minSubcliqueSize})</span>
            <span className="text-xs">Max: ({maxSubcliqueSize})</span>
          </div>
        </div>
        <div className="flex w-full justify-evenly">
          <Link to="/rules">
            <button className="rounded border-2 border-gray-800 px-3 py-1">
              Rules
            </button>
          </Link>
          <Link to="/game">
            <button className="rounded border-2 border-gray-800 bg-gray-800 px-3 py-1 text-white">
              {resume ? "Resume" : "Play"}
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
