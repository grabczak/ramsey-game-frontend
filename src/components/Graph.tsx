import { useMemo } from "react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { play } from "src/api";
import { CircleNode } from "src/components";
import { useAppSelector, useAppDispatch, setEdgeTeam } from "src/store";
import { TGraph } from "src/types";

export function Graph() {
  const graph = useAppSelector((state) => state.game.graph);

  const targetCliqueSize = useAppSelector(
    (state) => state.game.targetCliqueSize,
  );

  const dispatch = useAppDispatch();

  const flowNodes = useMemo(() => {
    const nodes = graph.nodes.map((n, i, a) => ({
      ...n,
      data: { label: n.id },
      position: {
        x: 100 * Math.cos((-2 * Math.PI * i) / a.length + Math.PI / 2) + 100,
        y: -100 * Math.sin((-2 * Math.PI * i) / a.length + Math.PI / 2) + 100,
      },
      type: "circleNode",
    }));

    return nodes;
  }, [graph.nodes]);

  const flowEdges = useMemo(() => {
    const colors = {
      browser: "green",
      server: "red",
      none: "gray",
    };

    const edges = graph.edges.map((e) => ({
      ...e,
      type: "straight",
      focusable: false,
      style: { stroke: colors[e.team] },
    }));

    return edges;
  }, [graph.edges]);

  const nodeTypes = useMemo(() => ({ circleNode: CircleNode }), []);

  return (
    <ReactFlow
      nodeTypes={nodeTypes}
      nodes={flowNodes}
      edges={flowEdges}
      nodesDraggable={false}
      fitView
      onEdgeClick={(_, edge) => {
        dispatch(setEdgeTeam({ edgeId: edge.id, team: "browser" }));

        const apiGraph: TGraph = {
          ...graph,
          edges: graph.edges.map((e) =>
            e.id === edge.id ? { ...e, team: "browser" as const } : e,
          ),
        };

        play(apiGraph, targetCliqueSize)
          .then((r) => {
            dispatch(setEdgeTeam({ edgeId: r.data.id, team: "server" }));
          })
          .catch((e) => console.log(e));
      }}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}
