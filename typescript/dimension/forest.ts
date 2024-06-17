function randomInt(min: int, max: int) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//var Particles = ModAPI.requireGlobal("Particles");

function getSign(n) {
  if (n > 0) return 1;
  if (n == 0) return 0;
  if (n < 0) return -1;
}
function random(min, max) {
  var rnd = Math.random();
  var dot = getSign(Math.random() * 2 - 1);
  return Math.floor(rnd * (max - min) * dot + min * dot);
}
function getMinDistance(min, max) {
  var x = random(0, max);
  var z = random(0, max);
  if (x * x + z * z > min * min) {
    return { x: x, z: z };
  } else {
    return getMinDistance(min, max);
  }
}

function addGlowworm(coords) {
  var xz = getMinDistance(10, 30);
  var x = xz.x;
  var y = random(0, 1);
  var z = xz.z;
  var xz = getMinDistance(3, 5);
  var xV = xz.x / 80;
  var yV = random(3, 5) / 600;
  var zV = xz.z / 80;

  ForestParticle.send(
    glowworm,
    coords.x + x,
    coords.y + y,
    coords.z + z,
    xV,
    yV,
    zV,
    Player.getLocal()
  );
}
function addFire(coords) {
  var xz = getMinDistance(30, 80);
  var x = xz.x;
  var y = random(0, 1);
  var z = xz.z;
  var xz = getMinDistance(3, 5);
  var xV = xz.x / 80;
  var yV = random(3, 5) / 600;
  var zV = xz.z / 80;

  ForestParticle.send(
    glowworm,
    coords.x + x,
    coords.y + y,
    coords.z + z,
    xV,
    yV,
    zV,
    Player.getLocal()
  );
  //fire
}

let time = 0;

Callback.addCallback("PlayerChangedDimension", function (playerUid, from, to) {
  if (Entity.getDimension(playerUid) == InfiniteForest.id) {
    time = World.getWorldTime();
    World.setWorldTime(42000);
    Commands.exec("/gamerule doDaylightCycle false");
  } else {
    // inventSaverFunc(EDimension.NORMAL, playerUid);
    Commands.exec("/gamerule doDaylightCycle true");
    World.setWorldTime(time);
  }
});

namespace Plants {
  export function generate(coords: Vector, id: int, data?: int) {
    if (
      World.getBlockID(coords.x, coords.y, coords.z) === VanillaBlockID.grass &&
      World.getBlockID(coords.x, coords.y + 1, coords.z) === 0
    ) {
      return World.setBlock(coords.x, coords.y + 1, coords.z, id, data || 0);
    }
  }
}

namespace ForestGeneration {
  Callback.addCallback(
    "GenerateCustomDimensionChunk",
    function (chunkX, chunkZ, random, dimensionId) {
      if (dimensionId !== InfiniteForest.id) return;
     let underwater_block = VMath.randomValue(VanillaBlockID.gravel, VanillaBlockID.sand, VanillaBlockID.clay, VanillaBlockID.dirt)
      for(let i = 0; i <= 256; i++) {
        let coords = GenerationUtils.randomCoords(chunkX, chunkZ);
        coords = GenerationUtils.findSurface(coords.x, 127, coords.z);
  
        if(coords.y <= 54 && World.getBlockID(coords.x, coords.y, coords.z) ===
        VanillaBlockID.grass) {
          World.setBlock(coords.x, coords.y, coords.z, underwater_block, 0);
          if(underwater_block === VanillaBlockID.dirt && Math.random() > 0.05) {
            BlockSource.getCurrentWorldGenRegion().setBlock(coords.x, coords.y + 1, coords.z, VanillaBlockID.seagrass, EBlockStates.ALLOW_UNDERWATER_BIT);
          }
        };
      }
      for (let i = 0; i <= 24; i++) {
        let coords = GenerationUtils.randomCoords(chunkX, chunkZ);
        coords = GenerationUtils.findSurface(coords.x, 127, coords.z);
        if (coords.y > 54) {
        if (Math.random() > 0.94) {
            Plants.generate(coords, VanillaBlockID.tallgrass);
        }
        if (Math.random() > 0.9) {
          for (let i = 0; i <= 16; i++) {
            Plants.generate(coords, VanillaBlockID.double_plant);
          }
        }
        if (Math.random() > 0.9) {
          for (let i = 0; i <= 16; i++) {
            Plants.generate(coords, VanillaBlockID.double_plant, 2);
          }
        }
        if (Math.random() > 0.8) {
          for (let i = 0; i <= 8; i++) {
            Plants.generate(coords, VanillaBlockID.tallgrass, 2);
          }
        }

        if (Math.random() > 0.8) {
          for (let i = 0; i <= 8; i++) {
            Plants.generate(coords, VanillaBlockID.yellow_flower);
          }
        }
        if (Math.random() > 0.8) {
          for (let i = 0; i <= 8; i++) {
            Plants.generate(coords, VanillaBlockID.red_flower);
          }
        }}
      };
      for(let i = 0; i <= 3; i++) {
      let coords = GenerationUtils.randomCoords(chunkX, chunkZ);
      coords = GenerationUtils.findSurface(coords.x, 127, coords.z);
      if (coords.y > 54) { 
     
      
      if (Math.random() > 0.8) {
        Plants.generate(coords, EForestPlants.FIRONIA);
      }
      if (Math.random() > 0.4) {
        Plants.generate(coords, EForestPlants.ELECTRIC_MUSHROOM);
      }}
    }

      if (Math.random() > 0.01) {
        const block = VMath.randomValue(
          VanillaBlockID.podzol,
          VanillaBlockID.leaves,
          VanillaBlockID.leaves2,
          VanillaBlockID.ice,
          VanillaBlockID.mossy_cobblestone,
          VanillaBlockID.vine,
          VanillaBlockID.mycelium,
          VanillaBlockID.stone,
          VanillaBlockID.gravel
        );
        for (let i = 0; i <= 128; i++) {
          let coords = GenerationUtils.randomCoords(chunkX, chunkZ);
          coords = GenerationUtils.findSurface(coords.x, 127, coords.z);
          if (coords.y > 54) return;
          if (
            World.getBlockID(coords.x, coords.y, coords.z) ===
            VanillaBlockID.grass
          ) {
           
            if (block === VanillaBlockID.mycelium && Math.random() > 0.1) {
              const mushroom = VMath.randomValue(
                VanillaBlockID.red_mushroom,
                VanillaBlockID.brown_mushroom,
                EForestPlants.ELECTRIC_MUSHROOM
              );
              World.setBlock(coords.x, coords.y + 1, coords.z, mushroom, 0);
              return;
            }
            if (block === VanillaBlockID.ice && Math.random() > 0.1) {
              World.setBlock(
                coords.x,
                coords.y + 1,
                coords.z,
                EForestPlants.ICE_FLOWER,
                0
              );
              return;
            }
            if (block === VanillaBlockID.podzol && Math.random() > 0.4) {
              if (Math.random() > 0.1) {
              
                World.setBlock(
                  coords.x,
                  coords.y + 1,
                  coords.z,
                  VanillaBlockID.sweet_berry_bush,
                  randomInt(1, 4)
                );
              return;
            }
          }
          
        };
        World.setBlock(coords.x, coords.y, coords.z, block, 0);
        return;
      };


      /*  if (Math.random() < 0.98) {
          for (let i = 0; i <= 16; ) {
            if (
              World.getBlockID(coords.x, coords.y, coords.z) ===
                VanillaBlockID.grass &&
              World.getBlockID(coords.x, coords.y + 1, coords.z) ===
                VanillaBlockID.water &&
              World.getBlockID(coords.x, coords.y + 2, coords.z) === 0
            ) {
              World.setBlock(
                coords.x,
                coords.y + 1,
                coords.z,
                VanillaBlockID.waterlily,
                0
              );
            }
          }
        } */
    }}
  );
}
