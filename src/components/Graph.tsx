import { useMemo } from "react";
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
import {
  createFlowEdges,
  createFlowNodes,
  createApiRequestGraph,
} from "src/utils";

export function Graph() {
  const graph = useAppSelector((state) => state.game.graph);

  const subcliqueSize = useAppSelector((state) => state.game.subcliqueSize);

  const winner = useAppSelector((state) => state.game.winner);

  const winningEdges = useAppSelector((state) => state.game.winningEdges);

  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: play,
    onMutate: ({ latestEdge }) => {
      dispatch(setEdgeTeam({ edgeId: latestEdge.id, team: "browser" }));
    },
    onSuccess: ({ data }) => {
      const { winner, edge, clique } = data;

      switch (winner) {
        case "none":
          dispatch(setWinner({ winner }));
          dispatch(setEdgeTeam({ edgeId: edge.id, team: "server" }));
          break;
        case "browser":
          dispatch(setWinner({ winner }));
          dispatch(setWinningEdges({ winningEdges: clique }));
          break;
        case "server":
          dispatch(setWinner({ winner }));
          dispatch(setEdgeTeam({ edgeId: edge.id, team: "server" }));
          dispatch(setWinningEdges({ winningEdges: clique }));
          break;
        case "draw":
          dispatch(setWinner({ winner }));
          if (edge) {
            dispatch(setEdgeTeam({ edgeId: edge.id, team: "server" }));
          }
          break;
        default:
          return;
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
      graph: createApiRequestGraph(graph, edge),
      subcliqueSize,
      latestEdge: edge,
    });
  };

  const nodes = useMemo(() => createFlowNodes(graph.nodes), [graph.nodes]);

  const edges = useMemo(
    () => createFlowEdges(graph.edges, disabled, winningEdges),
    [graph.edges, disabled, winningEdges],
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
