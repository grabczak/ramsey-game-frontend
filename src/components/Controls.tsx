import { Link } from "react-router-dom";
import { Controls as FlowControls } from "@xyflow/react";

import { TTeam } from "src/types";

type TControlsProps = {
  winner: TTeam;
};

export function Controls({ winner }: TControlsProps) {
  return (
    <>
      <div className="absolute z-50 w-full flex justify-between items-center">
        <div className="flex-1 flex justify-start">
          <Link to="/">
            <button className="m-4 px-3 py-1 font-mono text-xs text-black react-flow__controls">
              &larr; Go back
            </button>
          </Link>
        </div>
        <div className="flex-1 flex justify-center">
          <button className="m-4 px-3 py-2 font-mono text-xs text-black react-flow__controls">
            Restart
          </button>
        </div>
        <div className="flex-1 flex justify-end">
          <FlowControls
            orientation="horizontal"
            showInteractive={false}
            fitViewOptions={{ padding: 0.5 }}
            className="relative m-4"
          />
        </div>
      </div>
      {winner !== "none" && (
        <div className="absolute z-50 bottom-0 left-0 right-0 w-fit ms-auto me-auto">
          <div className="m-4 px-3 py-1 font-mono text-black text-xl shadow-md">
            Winner:{" "}
            <span
              className={`capitalize font-bold ${winner === "browser" ? "text-blue-500" : "text-red-500"}`}
            >
              {winner}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
