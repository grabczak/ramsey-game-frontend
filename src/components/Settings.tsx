import { Link } from "react-router-dom";

import {
  useAppSelector,
  useAppDispatch,
  setGraphSize,
  setTargetCliqueSize,
} from "src/store";

export function Settings() {
  const graphSize = useAppSelector((state) => state.game.graph.nodes.length);

  const targetCliqueSize = useAppSelector(
    (state) => state.game.targetCliqueSize,
  );

  const dispatch = useAppDispatch();

  const handleGraphSizeChange: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    dispatch(setGraphSize({ graphSize: Number(e.target.value) }));
  };

  const handletargetCliqueSizeChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    dispatch(setTargetCliqueSize({ targetCliqueSize: Number(e.target.value) }));
  };

  const minGraphSize = 4;
  const maxGraphSize = 12;
  const minTargetCliqueSize = 3;
  const maxTargetCliqueSize = graphSize;

  return (
    <form className="flex flex-col items-center justify-center h-full">
      <label>Graph size: {graphSize}</label>
      <div className="flex">
        <div>{minGraphSize}</div>
        <input
          type="range"
          value={graphSize}
          onChange={handleGraphSizeChange}
          min={minGraphSize}
          max={maxGraphSize}
        />
        <div>{maxGraphSize}</div>
      </div>
      <label>Clique size: {targetCliqueSize}</label>
      <div className="flex">
        <div>{minTargetCliqueSize}</div>
        <input
          type="range"
          value={targetCliqueSize}
          onChange={handletargetCliqueSizeChange}
          min={minTargetCliqueSize}
          max={maxTargetCliqueSize}
        />
        <div>{maxTargetCliqueSize}</div>
      </div>
      <Link to="/game">
        <button>Play</button>
      </Link>
    </form>
  );
}
