import { Link } from "react-router-dom";
import { Controls as FlowControls } from "@xyflow/react";

import { TTeam } from "src/types";

type TControlsProps = {
  winner: TTeam;
};

export function Controls({ winner }: TControlsProps) {
  return (
    <>
      <div className="absolute z-50 flex w-full items-center justify-between">
        <div className="flex flex-1 justify-start">
          <Link to="/">
            <button className="react-flow__controls m-4 px-3 py-1 font-mono text-xs text-black">
              &larr; Go back
            </button>
          </Link>
        </div>
        <div className="flex flex-1 justify-center">
          <button className="react-flow__controls m-4 px-3 py-2 font-mono text-xs text-black">
            Restart
          </button>
        </div>
        <div className="flex flex-1 justify-end">
          <FlowControls
            orientation="horizontal"
            showInteractive={false}
            fitViewOptions={{ padding: 0.5 }}
            className="relative m-4"
          />
        </div>
      </div>
      {winner !== "none" && (
        <div className="absolute bottom-0 left-0 right-0 z-50 me-auto ms-auto w-fit">
          <div className="m-4 px-3 py-1 font-mono text-xl text-black shadow-md">
            Winner:{" "}
            <span
              className={`font-bold capitalize ${winner === "browser" ? "text-blue-500" : "text-red-500"}`}
            >
              {winner}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
