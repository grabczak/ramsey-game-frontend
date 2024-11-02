import { Handle, Position } from "@xyflow/react";

type TCircleNodeProps = {
  data: {
    label: string;
  };
};

export function CircleNode({ data }: TCircleNodeProps) {
  return (
    <>
      <div className="w-7 h-7 border-2 border-solid border-gray-500 rounded-full bg-white flex justify-center items-center text-[20px] font-mono">
        <Handle type="source" position={Position.Top} />
        <div className="text-gray-800">{data.label}</div>
        <Handle type="target" position={Position.Top} />
      </div>
    </>
  );
}
