const InfiniteForest = new Dimensions.CustomDimension("infinite_forest", 75);
const InfiniteForestBiome = new CustomBiome("infinite_forest");
InfiniteForest.setHasSkyLight(false);
InfiniteForest.setSkyColor(21 / 255, 96 / 255, 189 / 255);
InfiniteForest.setFogColor(0 / 255, 128 / 255, 0 / 255);
const generator = Dimensions.newGenerator({
  biome: InfiniteForestBiome.id,
  
 layers: [
  {
    minY: 0,
    maxY: 55,
    yConversion: [
      [0, 1],
      [-1, 0.4],
    ],
    material: { base: 9 },
  },

  {
    minY: 0,
    maxY: 120,
    yConversion: [
      [0, 1.7],
      [1, -1.9],
    ],
    material: { base: 1, surface: { id: 3, data: 0, width: 3 }, cover: 2 },
    noise: {
      octaves: { count: 5, scale: 70 },
    },
  },

  {
    minY: 0,
    maxY: 1,
    yConversion: [[0.7, 1]],
    material: { base: 7 },
  },
],
});
InfiniteForest.setGenerator(generator);

interface IPlantDesc {
  coords: Vector;
  place: Vector;
  id: number;
  random: [number, number];
}


/*


{
  layers: [
   {
     minY: 10,
     maxY: 55,
     yConversion: [[0, 0]],
     material: { base: 9 },
   },
 
   
    {
     minY: 0,
     maxY: 100,
     yConversion: [
       [0, 1],
       [1, -0.95],
     ],
     material: { base: 1, surface: { id: 3, data: 0, width: 3 }, cover: 2 },
     noise: {
       octaves: { count: 5, scale: 100 },
     },
   },
   
   
   {
     minY: 2,
     maxY: 4,
     yConversion: [[0.7, 1]],
     material: { base: 7 },
   },
 ],
}








{
  layers: [
   {
     minY: 0,
     maxY: 55,
     yConversion: [[0, 1], [-1, 0.4]],
     material: { base: 9 },
   },
 
   
    {
     minY: 0,
     maxY: 120,
     yConversion: [
       [0, 1.7],
       [1, -1.9],
     ],
     material: { base: 1, surface: { id: 3, data: 0, width: 3 }, cover: 2 },
     noise: {
       octaves: { count: 5, scale: 70 },
     },
   },
   
   
   {
     minY: 0,
     maxY: 1,
     yConversion: [[0.7, 1]],
     material: { base: 7 },
   },
 ],
}



 layers: [
    {
      minY: 0,
      maxY: 55,
      yConversion: [
        [0, 1],
        [-1, 0.4],
      ],
      material: { base: 9 },
    },

    {
      minY: 0,
      maxY: 120,
      yConversion: [
        [0, 1.7],
        [1, -1.9],
      ],
      material: { base: 1, surface: { id: 3, data: 0, width: 3 }, cover: 2 },
      noise: {
        octaves: { count: 5, scale: 70 },
      },
    },

    {
      minY: 0,
      maxY: 1,
      yConversion: [[0.7, 1]],
      material: { base: 7 },
    },
  ], //TODO: OLD NEW


  
  layers: [
    {
      minY: 0,
      maxY: 55,
      yConversion: [
        [0, 1],
        [-1, 0.4],
      ],
      material: { base: 9 },
    },

    {
      minY: 0,
      maxY: 200,
      yConversion: [
        [0, 0.6],
        [1, -1.2],
      ],
      material: { base: 1, surface: { id: 3, data: 0, width: 3 }, cover: 2 },
      noise: {
        octaves: { count: 8, scale: 145 },
      },
    },

    {
      minY: 0,
      maxY: 1,
      yConversion: [[0.7, 1]],
      material: { base: 7 },
    },
  ], //TODO: NEW






  layers: [
    {
      minY: 0,
      maxY: 35,
      yConversion: [
        [0, 1],
        [-1, 0.4],
      ],
      material: { base: 9 },
    },

    {
      minY: 0,
      maxY: 150,
      yConversion: [
        [0, 0.4],
        [1, -0.9],
      ],
      material: { base: 1, surface: { id: 3, data: 0, width: 3 }, cover: 2 },
      noise: {
        octaves: { count: 5, scale: 170 },
      },
    },

    {
      minY: 0,
      maxY: 1,
      yConversion: [[0.7, 1]],
      material: { base: 7 },
    },
  ], //TODO: NEW NEW 





*/
