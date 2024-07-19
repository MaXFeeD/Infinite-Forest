const EMPTY_BOTTLE = new FBlock("bottle", [
  {
    name: "block.infinite_forest.bottle",
    texture: [["glass", 0]],
    inCreative: true,
  },
])
  .create()
  .setupBlockModel(
    {
      model: "bottle",
      texture: "forest_bottle",
    },
    0
  );

const FULL_BOTTLE = new FBlock("fireflies_bottle", [
  {
    name: "block.infinite_forest.fireflies_bottle",
    texture: [["glass", 0]],
    inCreative: true,
  },
])
  .create()
  .setupBlockModel(
    {
      model: "bottle",
      texture: "forest_bottle",
    },
    0
  );

class Bottle extends TileEntityBase {
  public static destroyParticles(x: int, y: int, z: int, player: int) {
    return ForestParticle.send(
      EForestParticle.GLOWWORM,
      x + 0.5,
      y + 0.4,
      z + 0.5,
      0,
      0.01,
      0,
      player
    );
  }
  public clientTick(): void {
    if (World.getThreadTime() % 20 === 0) {
      Particles.addParticle(
        EForestParticle.GLOWWORM,
        this.x + 0.5,
        this.y + 0.4,
        this.z + 0.5,
        0.001,
        0.001,
        0.001
      );
    }
  }
  static {
    BlockRegistry.setSoundType(BlockID["bottle"], "glass");
    BlockRegistry.setSoundType(BlockID["fireflies_bottle"], "glass");
    BlockRegistry.setLightLevel(BlockID["fireflies_bottle"], 10);
    Projectiles.breakBlock(BlockID["bottle"]);
    Projectiles.breakBlock(
      BlockID["fireflies_bottle"],
      (x, y, z, block, region) =>
        Bottle.destroyParticles(x, y, z, Player.getLocal()) //!
    );
    TileEntity.registerPrototype(BlockID["fireflies_bottle"], new Bottle());
  }
}

Block.setRandomTickCallback(BlockID["bottle"], (x, y, z, id, data, region) => {
  if (y >= 130 || region.getBiome(x , z) === ForestBiomes.WinterForest.getID()) {
    region.destroyBlock(x, y, z, false);
  }
  if (
    Block.getLightLevel(region.getBlockId(x, y + 1, z)) <= 5 ||
    region.getDimension() !== InfiniteForest.id ||
    region.getBiome(x, z) !== ForestBiomes.FirefliesForest.getID()
  ) {
    return;
  }
  CursedLightning.speedGlowworm(x, y, z, region);
  region.destroyBlock(x, y + 1, z, false);
  if (Math.random() < 0.5) {
    region.destroyBlock(x, y, z, false);
    region.explode(x, y, z, 0.1, false);
    if (Plants.block_list.includes(region.getBlockId(x, y - 1, z))) {
      region.setBlock(x, y - 1, z, VanillaBlockID.podzol, 0);
    }
    return;
  }
  region.destroyBlock(x, y, z, false);
  TileEntity.destroyTileEntityAtCoords(x, y, z);
  region.setBlock(x, y, z, BlockID["fireflies_bottle"], 0);
  TileEntity.addTileEntity(x, y, z, region);
});

function destroyBottle(
  coords: Vector,
  block: Tile,
  changedCoords: Vector,
  region: BlockSource
) {
  if (region.getBlockId(coords.x, coords.y - 1, coords.z) === 0) {
    if (region.getBlockId(coords.x, coords.y + 1, coords.z) === 0) {
      region.destroyBlock(coords.x, coords.y, coords.z, true);
      return;
    }
    region.destroyBlock(coords.x, coords.y, coords.z, true);
  }
}

Block.registerNeighbourChangeFunctionForID(BlockID["bottle"], destroyBottle);
Block.registerNeighbourChangeFunctionForID(
  BlockID["fireflies_bottle"],
  destroyBottle
);
Block.setRandomTickCallback(
  BlockID["fireflies_bottle"],
  (x, y, z, id, data, region) => {
    if (y >= 130) {
      region.destroyBlock(x, y, z, false);
    }
  }
);
