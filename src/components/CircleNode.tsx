import { Handle, Position } from "@xyflow/react";

export function CircleNode({ data }: { data: { label: string } }) {
  return (
    <>
      <div
        style={{
          width: "15px",
          height: "15px",
          border: "1px solid rgb(26, 25, 43)",
          borderRadius: "50%",
          background: "rgb(255, 255, 255",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 8,
        }}
      >
        <Handle type="source" position={Position.Top} />
        <div>{data.label}</div>
        <Handle type="target" position={Position.Top} />
      </div>
    </>
  );
}
