import { Link } from "react-router-dom";

import {
  useAppSelector,
  useAppDispatch,
  setGraphSize,
  setSubcliqueSize,
} from "src/store";
import { getMinSubcliqueSize, getMaxSubcliqueSize } from "src/utils";

export function Settings() {
  const graphSize = useAppSelector((state) => state.game.graph.nodes.length);

  const subcliqueSize = useAppSelector((state) => state.game.subcliqueSize);

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
  const minSubcliqueSize = getMinSubcliqueSize();
  const maxSubcliqueSize = getMaxSubcliqueSize(graphSize);

  return (
    <div className="font-mono flex flex-col justify-center min-h-full container mx-auto max-w-lg p-4 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-6">Ramsey Game</h1>
      <form className="flex flex-col gap-6 items-center">
        <div className="flex flex-col gap-2 w-full">
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
            className="h-2 bg-gray-300 appearance-none cursor-pointer rounded"
          />
          <div className="flex justify-between">
            <span className="text-xs">Min: ({minGraphSize})</span>
            <span className="text-xs">Max: ({maxGraphSize})</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
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
            className="h-2 bg-gray-300 appearance-none cursor-pointer rounded"
          />
          <div className="flex justify-between">
            <span className="text-xs">Min: ({minSubcliqueSize})</span>
            <span className="text-xs">Max: ({maxSubcliqueSize})</span>
          </div>
        </div>
        <div className="flex justify-evenly w-full">
          <Link to="/rules">
            <button className="border-2 border-gray-800 rounded px-3 py-1">
              Rules
            </button>
          </Link>
          <Link to="/game">
            <button className="border-2 border-gray-800 rounded bg-gray-800 text-white px-3 py-1">
              Play
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
