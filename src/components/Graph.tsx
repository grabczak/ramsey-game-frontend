import { useMemo } from "react";
import { shallowEqual } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { ReactFlow } from "@xyflow/react";

import { play } from "src/api";
import { CircleNode, Controls } from "src/components";
import {
  useAppSelector,
  useAppDispatch,
  setEdgeTeam,
  setWinner,
  setWinningEdges,
} from "src/store";
import { TEdge } from "src/types";
import { createFlowEdges, createFlowNodes } from "src/utils";

export function Graph() {
  const { graph, subcliqueSize, winner, winningEdges } = useAppSelector(
    (state) => state.game,
    shallowEqual,
  );

  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: play,
    onMutate: ({ latestEdge }) => {
      dispatch(setEdgeTeam({ edgeId: latestEdge.id, team: "browser" }));
    },
    onSuccess: ({ data }) => {
      const { winner, edge, clique } = data;

      dispatch(setWinner({ winner }));

      if (edge) {
        dispatch(setEdgeTeam({ edgeId: edge.id, team: "server" }));
      }

      if (winner === "browser" || winner === "server") {
        dispatch(setWinningEdges({ winningEdges: clique }));
      }
    },
    onError: (_, { latestEdge }) => {
      dispatch(setEdgeTeam({ edgeId: latestEdge.id, team: "none" }));
    },
  });

  const disabled = isPending || winner !== "none";

  const handleEdgeClick = (_: React.MouseEvent, edge: TEdge) => {
    if (disabled || edge.team !== "none") {
      return;
    }

    mutate({
      graph,
      subcliqueSize,
      latestEdge: edge,
    });
  };

  const nodes = useMemo(
    () => createFlowNodes({ nodes: graph.nodes }),
    [graph.nodes],
  );

  const edges = useMemo(
    () =>
      createFlowEdges({ edges: graph.edges, winner, winningEdges, disabled }),
    [graph.edges, disabled, winningEdges, winner],
  );

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
      onEdgeClick={handleEdgeClick}
      className={isPending ? "cursor-progress" : "cursor-inherit"}
    >
      <Controls />
    </ReactFlow>
  );
}
