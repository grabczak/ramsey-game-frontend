import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ReactFlow, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { play } from "src/api";
import { CircleNode } from "src/components";
import { useAppSelector, useAppDispatch, setEdgeTeam } from "src/store";
import { TGraph } from "src/types";

export function Graph() {
  const graph = useAppSelector((state) => state.game.graph);

  const subcliqueSize = useAppSelector((state) => state.game.subcliqueSize);

  const dispatch = useAppDispatch();

  const nodes = useMemo(() => {
    return graph.nodes.map((n, i, a) => ({
      ...n,
      data: { label: n.id },
      position: {
        x: 250 * Math.cos((-2 * Math.PI * i) / a.length + Math.PI / 2) + 250,
        y: -250 * Math.sin((-2 * Math.PI * i) / a.length + Math.PI / 2) + 250,
      },
      type: "circleNode",
      style: {
        cursor: "not-allowed",
      },
    }));
  }, [graph.nodes]);

  const edges = useMemo(() => {
    const colors = {
      browser: "rgb(59, 130, 246)",
      server: "rgb(239, 68, 68)",
      none: "rgb(177, 177, 183, 50%)",
    };

    return graph.edges.map((e) => ({
      ...e,
      type: "straight",
      focusable: false,
      style: {
        stroke: colors[e.team],
        strokeWidth: 4,
        pointerEvents:
          e.team === "none" ? ("auto" as const) : ("none" as const),
      },
    }));
  }, [graph.edges]);

  const nodeTypes = useMemo(() => ({ circleNode: CircleNode }), []);

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={nodes}
      edges={edges}
      nodesDraggable={false}
      panOnDrag={false}
      zoomOnDoubleClick={false}
      zoomOnPinch={false}
      zoomOnScroll={false}
      fitView
      fitViewOptions={{ padding: 0.5 }}
      onEdgeClick={(_, edge) => {
        if (edge.team !== "none") {
          return;
        }

        dispatch(setEdgeTeam({ edgeId: edge.id, team: "browser" }));

        const apiGraph: TGraph = {
          ...graph,
          edges: graph.edges.map((e) =>
            e.id === edge.id ? { ...e, team: "browser" as const } : e,
          ),
        };

        play(apiGraph, subcliqueSize)
          .then((r) => {
            dispatch(setEdgeTeam({ edgeId: r.data.id, team: "server" }));
          })
          .catch((e) => console.log(e));
      }}
    >
      <Link to="/">
        <button
          className="m-[15px] px-3 py-1 font-mono absolute text-xs text-black z-50"
          style={{ boxShadow: "rgba(0, 0, 0, 0.08) 0px 0px 2px 1px" }}
        >
          &larr; Go back
        </button>
      </Link>
      <Controls
        position="top-right"
        orientation="horizontal"
        showInteractive={false}
        fitViewOptions={{ padding: 0.5 }}
      />
    </ReactFlow>
  );
}
