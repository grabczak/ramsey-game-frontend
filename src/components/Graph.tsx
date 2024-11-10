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
  setWinningSubclique,
} from "src/store";
import { TNode, TEdge } from "src/types";
import {
  createFlowEdges,
  createFlowNodes,
  createApiRequestGraph,
} from "src/utils";

export function Graph() {
  const graph = useAppSelector((state) => state.game.graph);

  const subcliqueSize = useAppSelector((state) => state.game.subcliqueSize);

  const winner = useAppSelector((state) => state.game.winner);

  const winningSubclique = useAppSelector(
    (state) => state.game.winningSubclique,
  );

  const dispatch = useAppDispatch();

  const { mutate, isPending } = useMutation({
    mutationFn: play,
    onMutate: ({ latestEdge }) => {
      dispatch(setEdgeTeam({ edgeId: latestEdge.id, team: "browser" }));
    },
    onSuccess: ({ data }) => {
      dispatch(setWinner({ winner: data.winner }));

      if (data.clique !== "none") {
        const winningEdges = data.clique;

        const winningNodes: TNode[] = [
          ...new Set(winningEdges.map((e) => e.id.split("-")).flat()),
        ].map((id) => ({ id }));

        dispatch(
          setWinningSubclique({
            winningSubclique: { nodes: winningNodes, edges: winningEdges },
          }),
        );
      }

      if (data.winner === "browser") {
        return;
      }

      dispatch(setEdgeTeam({ edgeId: data.edge.id, team: "server" }));
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
    () => createFlowEdges(graph.edges, disabled, winningSubclique),
    [graph.edges, disabled, winningSubclique],
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
