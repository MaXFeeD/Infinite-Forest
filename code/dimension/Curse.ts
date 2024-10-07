abstract class Curse {
  private static readonly list: name[] = [];
  private static readonly stateList: Record<name, boolean> = {};
  public static onTick: (...args) => void;
  public static idenitifier: string;
  public static addIdentifierToList = (() =>
    Curse.list.push(this.idenitifier))();
  public static has(player?) {
    if (player) {
      const actor = new PlayerActor(player);
      if (actor.getGameMode() === EGameMode.CREATIVE) {
        return false;
      }
    }
    return (Curse.stateList[this.idenitifier] =
      Curse.stateList[this.idenitifier] || true);
  }
  public static hasList(player: int, list: name[]) {
    const name = Entity.getNameTag(player);
    const actor = new PlayerActor(player);
    if (actor.getGameMode() === EGameMode.CREATIVE) {
      return false;
    }
    for (let element of list) {
      if (!Curse.stateList[element]) return false;
    }
    return true;
  }
  public static getCurseList() {
    return Curse.list;
  }
  public static getStatelist() {
    return Curse.stateList;
  }
}

Saver.addSavesScope(
  "scope.infinite_forest.curseStatelist",
  function read(scope) {
    scope.stateList ??= Curse.getStatelist();
  },
  function save() {
    return { stateList: Curse.getStatelist() };
  }
);

abstract class ColdCurse extends Curse {
  public static COLD_HEIGHT = 130;
  public static COLD_MESSAGE: boolean = true;
  public static idenitifier: string = "cold";
  public static UI = new UI.Window({
    drawing: [
      {
        type: "background",
        color: android.graphics.Color.argb(0, 0, 0, 0),
      },
      {
        type: "bitmap",
        x: -5,
        y: -22.5,
        bitmap: "screen_cold",
        scale: 3.6,
      },
    ],
  });

  public static open() {
    ColdCurse.UI.open();
    let alpha = 0;
    ColdCurse.UI.layout.setAlpha(alpha);
    Threading.initThread("thread.infinite_forest.cold_curse_ui", () => {
      while(alpha < 1) {
        alpha += 0.005;
         ColdCurse.UI.layout.setAlpha(alpha)
      }
    })
  }

 public static close() {
  ColdCurse.UI.open();
  let alpha = 1;
  ColdCurse.UI.layout.setAlpha(alpha);
  Threading.initThread("thread.infinite_forest.cold_curse_ui", () => {
    while(alpha > 0) {
      alpha -= 0.005;
       ColdCurse.UI.layout.setAlpha(alpha);

       if(alpha >= 1) {
        ColdCurse.UI.close
       }
    }
  })
 }

  public static runSnow(x: int, y: int, z: int, radius = 16, count = 16) {
    if (World.getThreadTime() % 8 === 0) {
      for (let n = -count; n <= count; n++) {
        ParticlePacket.send(
          EForestParticle.SNOWFALL,
          x + n,
          y,
          z + randomInt(-radius, radius),
          0.05,
          -0.1,
          0,
          Player.getLocal()
        );
        ParticlePacket.send(
          EForestParticle.SNOWFALL,
          x + randomInt(-radius, radius),
          y,
          z + n,
          0.05,
          -0.1,
          0,
          Player.getLocal()
        );
      }
    }
  }
  public static sendMessage(coords: Vector) {
    if (coords.y >= 115) {
      ColdCurse.COLD_MESSAGE === true &&
        Game.message(
          `<${Entity.getNameTag(Player.getLocal())}> ${
            Native.Color.BLUE
          }${Translation.translate("message.infinite_forest.cold_myself")}`
        );
      ColdCurse.COLD_MESSAGE = false;
    } else {
      ColdCurse.COLD_MESSAGE = true;
    }
  }
  public static damage(player: int) {
    Entity.damageEntity(player, 1);
    Entity.addEffect(player, EPotionEffect.DIG_SLOWDOWN, 3, 10, false, false);
    return;
  }
  public static onTick(ticker: int, player: int): void {
    if (this.has(player) === false) return;
    const pos = Entity.getPosition(player);
    if (pos.y > ColdCurse.COLD_HEIGHT) {
      ServerPlayerDamage();
      if (ColdCurse.UI.isOpened() === false) {
        ColdCurse.UI.open();
      }
    } else {
      ColdCurse.UI.isOpened() && ColdCurse.UI.close();
    }
  }
  static {
    ColdCurse.UI.setTouchable(false);
    ColdCurse.UI.setAsGameOverlay(true);
  }
}

Translation.addTranslation("message.infinite_forest.cold_myself", {
  ru: "Становится холодно...",
  en: "Cold is coming...",
});
