import { Handle, Position } from "@xyflow/react";

type TCircleNodeProps = {
  data: {
    label: string;
  };
};

export function CircleNode({ data }: TCircleNodeProps) {
  return (
    <>
      <div className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-solid border-gray-500 bg-white">
        <Handle type="source" position={Position.Top} />
        <div>{data.label}</div>
        <Handle type="target" position={Position.Top} />
      </div>
    </>
  );
}
