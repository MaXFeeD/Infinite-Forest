
const InfiniteForest = new Dimensions.CustomDimension("infinite_forest", 75);

InfiniteForest.setHasSkyLight(false);
InfiniteForest.setFogDistance(10, 40)
InfiniteForest.setSkyColor(21 / 255, 96 / 255, 189 / 255);
InfiniteForest.setFogColor(0 / 255, 128 / 255, 0 / 255);
const generator = Dimensions.newGenerator({
  layers: [
    {
      minY: 2,
      maxY: 75,
      yConversion: [[0, 0]],
      material: { base: 9 },
    },
    {
      minY: 0,
      maxY: 82,
      yConversion: [
        [0.7, 1],
        [1, -0.5],
      ],
      material: { base: 1, surface: { id: 3, data: 0, width: 3 }, cover: 2 },
      noise: {
        octaves: { count: 4, scale: 20 },
      },
    },
    {
      minY: 2,
      maxY: 4,
      yConversion: [[0.7, 1]],
      material: { base: 7 },
    },
  ],
});
InfiniteForest.setGenerator(generator);
