export const getEdgeCount = (vertexCount: number) => {
  return (vertexCount ** 2 - vertexCount) / 2;
};

export const clamp = (n: number, min: number, max: number) => {
  return Math.min(Math.max(n, min), max);
};

export const getMinSubcliqueSize = (graphSize: number) => {
  return clamp(graphSize, 3, 3);
};

// v 9  8  7  6  5  4 3
// e 36 28 21 15 10 6 3
export const getMaxSubcliqueSize = (graphSize: number) => {
  const edgeCount = getEdgeCount(graphSize);

  for (let i = 4; i < 10; i++) {
    const iEdgeCount = getEdgeCount(i);

    if (iEdgeCount > edgeCount / 2) {
      return i - 1;
    }
  }

  return 3;
};
