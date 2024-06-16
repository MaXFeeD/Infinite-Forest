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
    name: "block.infinite_forest.bottle",
    texture: [["glass", 0]],
    inCreative: false,
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
  public static projectileBreak(id: int) {}
  public onTick(): void {
    if (World.getThreadTime() % 20 === 0) {
      // const entities = this.blockSource.listEntitiesInAABB(this.x - 20, this.y - 20, this.z - 20, this.x + 20, this.y + 20, this.z + 20, EEntityType.PLAYER, false);
      // for(const entity of entities) {
      ForestParticle.send(
        EForestParticle.GLOWWORM,
        this.x + 0.5,
        this.y + 0.4,
        this.z + 0.5,
        0.001,
        0.001,
        0.001,
        Player.getLocal() //!
      );
      //   };
    }
  }
  static {
    BlockRegistry.setSoundType(BlockID["bottle"], "glass");
    BlockRegistry.setSoundType(BlockID["fireflies_bottle"], "glass");
    BlockRegistry.setLightLevel(BlockID["fireflies_bottle"], 10);
    Projectiles.breakBlock(BlockID["bottle"]);
    Projectiles.breakBlock(
      BlockID["fireflies_bottle"],
      (x, y, z, block, region) => {
        ForestParticle.send(
          EForestParticle.GLOWWORM,
          x + 0.5,
          y + 0.4,
          z + 0.5,
          0,
          0.05,
          0,
          Player.getLocal() //!
        );
      }
    );
    TileEntity.registerPrototype(BlockID["fireflies_bottle"], new Bottle());
  }
}

Block.setRandomTickCallback(BlockID["bottle"], (x, y, z, id, data, region) => {
  if (
    Block.getLightLevel(region.getBlockId(x, y + 1, z)) <= 5 ||
    region.getDimension() !== InfiniteForest.id
  ) {
    return;
  }
  region.spawnEntity(x, y + 1, z, EEntityType.LIGHTNING_BOLT);
  region.destroyBlock(x, y + 1, z, false);
  if (Math.random() < 0.5) {
    region.destroyBlock(x, y, z, false);
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
