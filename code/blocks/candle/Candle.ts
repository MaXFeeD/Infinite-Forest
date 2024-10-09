class Candle extends FBlock {
  public static readonly CANDLE_MAX = 5;

  public static meshes = (() => {
    const one = new RenderMesh();
    one.importFromFile(MODELSDIR + "block/candle_max.obj", "obj",{
      translate: [0.5, 0.5, 0.5],
      invertV: false,
      noRebuild: false,
    });

    one.setBlockTexture("candle", 0);
    //  this.setupBlockModelFromMesh(one, 0);

    const small = new RenderMesh();
    small.importFromFile(MODELSDIR + "block/candle_min.obj", "obj", {
      translate: [0.5, 0.5, 0.5],
      invertV: false,
      noRebuild: false,
    });
    small.setBlockTexture("candle", 0);

    const two = one.clone();
    two.addMesh(small, 0.3, 0, 0);
    two.setBlockTexture("candle", 0);
    //  this.setupBlockModelFromMesh(two, 1);

    const three = two.clone();
    three.addMesh(small, -0.3, 0, 0);
    three.setBlockTexture("candle", 0);
    // this.setupBlockModelFromMesh(three, 2);

    const four = three.clone();
    four.addMesh(small, 0, 0, 0.3);
    four.setBlockTexture("candle", 0);
    //  this.setupBlockModelFromMesh(four, 3);

    const five = four.clone();
    five.addMesh(small, 0, 0, -0.3);
    five.setBlockTexture("candle", 0);
    //   this.setupBlockModelFromMesh(five, 4);
    return [one, two, three, four, five];
  })();

  constructor(public id: string, level: int) {
    super(
      id,
      [
        {
          inCreative: true,
          name: "block.infinite_forest.candle",
          texture: [["salt", 0]],
        },
      ]
    );

    Block.registerClickFunction(id, (coords, item, block, player) => {
      const region = BlockSource.getDefaultForActor(player);

      if (item.id === block.id && block.data < Candle.CANDLE_MAX) {
        region.setBlock(coords.x, coords.y, coords.z, block.id, block.data + 1);
      }

      if (item.id === VanillaItemID.flint_and_steel) {
        if (block.id === BlockID["candle_lit_4"]) {
          return;
        }

        let newID = "candle_lit_1";

        const stringId = String(IDRegistry.getIdInfo(block.id).split(":")[1]);
        const endChar = Number(stringId[stringId.length-1]);

        if (typeof endChar === "number") {
          newID = "candle_lit_" + (endChar + 1);
        }

        Entity.setCarriedItem(
          player,
          item.id,
          item.count,
          item.data++,
          item.extra
        );

        region.setBlock(
          coords.x,
          coords.y,
          coords.z,
          BlockID[newID],
          block.data
        );

        CandleTileReplacer.initialize(coords.x, coords.y, coords.z);
      }
    });

    BlockRegistry.setLightLevel(id, level);

    Candle.meshes.forEach((v, i) => this.setupBlockModelFromMesh(v, i));
  }

  public static getCount(region: BlockSource, coords: Vector) {
    const block = region.getBlock(coords.x, coords.y, coords.z);
    return Number(block.id === BlockID["candle"] ? block.data : 0);
  }
}

namespace ELightCandes {
  export const none = new Candle("unlit_candle", 0).create();
  export const three = new Candle("candle_lit_1", 3).create();
  export const six = new Candle("candle_lit_2", 6).create();
  export const nine = new Candle("candle_lit_3", 9).create();
  export const twenty = new Candle("candle_lit_4", 12).create();
}

Translation.addTranslation("block.infinite_forest.candle", {
  en: "Candle",
  ru: "Свеча",
});

class CandleTileReplacer {
  public static coordsList = new Set();
  public static initialize(x: int, y: int, z: int) {
    if(this.coordsList.has({x, y, z})) {
        return;
    };
    

    this.coordsList.add({x, y, z});
  
    Updatable.addLocalUpdatable({
      flames: 0,
      x,
      y,
      z,
      update() {
        const region = BlockSource.getCurrentClientRegion();
        const block = region.getBlock(this.x, this.y, this.z);
        if (World.getThreadTime() % 40 === 0) {
          if (!IDRegistry.getNameByID(block.id).startsWith("candle_lit")) {
            this.remove = true;
          }
        }
        if (World.getThreadTime() % 15 === 0) {
          block.data >= 0 &&
            Particles.addParticle(
              EParticleType.FLAME,
              this.x + 0.5,
              this.y + 0.95,
              this.z + 0.5,
              0,
              0.05,
              0
            );

          block.data >= 1 &&
            Particles.addParticle(
              EParticleType.FLAME,
              this.x + 0.8,
              this.y + 0.85,
              this.z + 0.5,
              0,
              0.05,
              0
            );

          block.data >= 2 &&
            Particles.addParticle(
              EParticleType.FLAME,
              this.x + 0.2,
              this.y + 0.85,
              this.z + 0.5,
              0,
              0.05,
              0
            );

          block.data >= 3 &&
            Particles.addParticle(
              EParticleType.FLAME,
              this.x + 0.5,
              this.y + 0.85,
              this.z + 0.8,
              0,
              0.05,
              0
            );

          block.data >= 4 &&
            Particles.addParticle(
              EParticleType.FLAME,
              this.x + 0.5,
              this.y + 0.85,
              this.z + 0.2,
              0,
              0.05,
              0
            );
        }
      },
    });
  }
}
