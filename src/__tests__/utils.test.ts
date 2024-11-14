import { expect, test } from "vitest";
import {
  clamp,
  getEdgeCount,
  getVertexCount,
  getMaxSubcliqueSize,
  createGraph,
} from "src/utils";

test("Clamps a value between min and max", () => {
  expect(clamp(0, -Infinity, Infinity)).toBe(0);
  expect(clamp(0, -1, 1)).toBe(0);
  expect(clamp(0, 0, 0)).toBe(0);
  expect(clamp(0, 1, -1)).toBe(-1);
  expect(clamp(0, Infinity, -Infinity)).toBe(-Infinity);
  expect(clamp(NaN, NaN, NaN)).toBe(NaN);
});

test("Returns number of edges in a clique of given size", () => {
  expect(getEdgeCount(-1)).toBe(0);
  expect(getEdgeCount(Infinity)).toBe(NaN);
  expect(getEdgeCount(NaN)).toBe(NaN);
  expect(getEdgeCount(0)).toBe(0);
  expect(getEdgeCount(1)).toBe(0);
  expect(getEdgeCount(2)).toBe(1);
  expect(getEdgeCount(3)).toBe(3);
  expect(getEdgeCount(4)).toBe(6);
  expect(getEdgeCount(5)).toBe(10);
  expect(getEdgeCount(6)).toBe(15);
  expect(getEdgeCount(7)).toBe(21);
  expect(getEdgeCount(8)).toBe(28);
  expect(getEdgeCount(9)).toBe(36);
  expect(getEdgeCount(9.5)).toBe(36);
});

test("Returns clique size of the smallest clique with given number of edges", () => {
  expect(getVertexCount(-1)).toBe(0);
  expect(getVertexCount(Infinity)).toBe(Infinity);
  expect(getVertexCount(NaN)).toBe(NaN);
  expect(getVertexCount(0)).toBe(1);
  expect(getVertexCount(1)).toBe(2);
  expect(getVertexCount(2)).toBe(2);
  expect(getVertexCount(3)).toBe(3);
  expect(getVertexCount(4)).toBe(3);
  expect(getVertexCount(5)).toBe(3);
  expect(getVertexCount(6)).toBe(4);
  expect(getVertexCount(10)).toBe(5);
  expect(getVertexCount(15)).toBe(6);
  expect(getVertexCount(21)).toBe(7);
  expect(getVertexCount(28)).toBe(8);
  expect(getVertexCount(36)).toBe(9);
  expect(getVertexCount(36.5)).toBe(9);
});

test("Returns the largest subclique size so that the game makes sense", () => {
  expect(getMaxSubcliqueSize(4)).toBe(3);
  expect(getMaxSubcliqueSize(5)).toBe(3);
  expect(getMaxSubcliqueSize(6)).toBe(4);
  expect(getMaxSubcliqueSize(7)).toBe(5);
  expect(getMaxSubcliqueSize(8)).toBe(5);
  expect(getMaxSubcliqueSize(9)).toBe(6);
});

test("Creates a clique of given size", () => {
  expect(createGraph(-1)).toStrictEqual({ nodes: [], edges: [] });
  expect(createGraph(0)).toStrictEqual({ nodes: [], edges: [] });
  expect(createGraph(1)).toStrictEqual({ nodes: [{ id: "0" }], edges: [] });
  expect(createGraph(2)).toStrictEqual({
    nodes: [{ id: "0" }, { id: "1" }],
    edges: [{ id: "0-1", source: "0", target: "1", team: "none" }],
  });
  expect(createGraph(6)).toStrictEqual({
    nodes: [
      {
        id: "0",
      },
      {
        id: "1",
      },
      {
        id: "2",
      },
      {
        id: "3",
      },
      {
        id: "4",
      },
      {
        id: "5",
      },
    ],
    edges: [
      {
        id: "0-1",
        source: "0",
        target: "1",
        team: "none",
      },
      {
        id: "0-2",
        source: "0",
        target: "2",
        team: "none",
      },
      {
        id: "0-3",
        source: "0",
        target: "3",
        team: "none",
      },
      {
        id: "0-4",
        source: "0",
        target: "4",
        team: "none",
      },
      {
        id: "0-5",
        source: "0",
        target: "5",
        team: "none",
      },
      {
        id: "1-2",
        source: "1",
        target: "2",
        team: "none",
      },
      {
        id: "1-3",
        source: "1",
        target: "3",
        team: "none",
      },
      {
        id: "1-4",
        source: "1",
        target: "4",
        team: "none",
      },
      {
        id: "1-5",
        source: "1",
        target: "5",
        team: "none",
      },
      {
        id: "2-3",
        source: "2",
        target: "3",
        team: "none",
      },
      {
        id: "2-4",
        source: "2",
        target: "4",
        team: "none",
      },
      {
        id: "2-5",
        source: "2",
        target: "5",
        team: "none",
      },
      {
        id: "3-4",
        source: "3",
        target: "4",
        team: "none",
      },
      {
        id: "3-5",
        source: "3",
        target: "5",
        team: "none",
      },
      {
        id: "4-5",
        source: "4",
        target: "5",
        team: "none",
      },
    ],
  });
});
