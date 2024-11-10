import { Link } from "react-router-dom";
import { Controls as FlowControls } from "@xyflow/react";
import cx from "classnames";

import { useAppSelector, useAppDispatch } from "src/store";
import { restartGame } from "src/store";

export function Controls() {
  const winner = useAppSelector((state) => state.game.winner);

  const dispatch = useAppDispatch();

  const handleRestartClick = () => {
    dispatch(restartGame());
  };

  return (
    <>
      <div className="absolute z-50 flex w-full items-center justify-between text-xs">
        <div className="flex flex-1 justify-start">
          <Link to="/" className="m-4">
            <button className="bg-white px-3 py-1 shadow hover:bg-stone-50">
              &larr; Go back
            </button>
          </Link>
        </div>
        <div className="flex flex-1 justify-center">
          <button
            onClick={handleRestartClick}
            className="m-4 bg-white px-3 py-1 shadow hover:bg-stone-50"
          >
            Restart
          </button>
        </div>
        <div className="flex flex-1 justify-end">
          <FlowControls
            orientation="horizontal"
            showInteractive={false}
            fitViewOptions={{ padding: 0.5 }}
            className="relative m-4 shadow hover:bg-stone-50"
          />
        </div>
      </div>
      <div
        className={cx(
          "absolute bottom-0 z-50 flex w-full items-center justify-between",
          { hidden: winner === "none" },
        )}
      >
        <div className="flex flex-1 justify-center">
          <div className="m-4 px-3 py-1 shadow">
            Winner:{" "}
            <span
              className={cx("font-bold capitalize", {
                "text-blue-500": winner === "browser",
                "text-red-500": winner === "server",
              })}
            >
              {winner}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
