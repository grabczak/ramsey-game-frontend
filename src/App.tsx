import { useState, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { play } from "./api";

function CircleNode({ data }: { data: { label: string } }) {
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

const initialNodes = ((n: number) => {
  const nodes = [];

  for (let i = 0; i < n; i++) {
    nodes.push({
      id: String(i),
      data: { label: String(i) },
      position: {
        x: 100 * Math.cos((-2 * Math.PI * i) / n + Math.PI / 2) + 100,
        y: -100 * Math.sin((-2 * Math.PI * i) / n + Math.PI / 2) + 100,
      },
      type: "circleNode",
    });
  }

  return nodes;
})(6);

const initialEdges = ((n: number) => {
  const edges = [];

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      edges.push({
        id: `${i}-${j}`,
        source: String(i),
        target: String(j),
        type: "straight",
        focusable: false,
      });
    }
  }

  return edges;
})(initialNodes.length);

function App() {
  const [nodes /*, setNodes */] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const nodeTypes = useMemo(() => ({ circleNode: CircleNode }), []);

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        nodesDraggable={false}
        onEdgeClick={(_, edge) => {
          setEdges((edges) =>
            edges.map((e) =>
              e.id === edge.id ? { ...e, style: { stroke: "green" } } : e,
            ),
          );

          play(nodes, edges)
            .then(({ data: edge }) => {
              setEdges((edges) =>
                edges.map((e) =>
                  e.id === edge.id ? { ...e, style: { stroke: "red" } } : e,
                ),
              );
            })
            .catch((e) => console.log(e));
        }}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default App;
