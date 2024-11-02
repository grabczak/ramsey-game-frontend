import { Handle, Position } from "@xyflow/react";

type TCircleNodeProps = {
  data: {
    label: string;
  };
};

export function CircleNode({ data }: TCircleNodeProps) {
  return (
    <>
      <div className="w-3 h-3 border border-solid border-black rounded-full bg-white flex justify-center items-center text-[8px] font-mono">
        <Handle type="source" position={Position.Top} />
        <div>{data.label}</div>
        <Handle type="target" position={Position.Top} />
      </div>
    </>
  );
}
