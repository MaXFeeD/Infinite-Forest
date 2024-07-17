abstract class Curse {
  protected static readonly blacklist: string[] = [];
  public static onTick: (...args) => void;
  public static idenitifier: string;
  public static has(player: int) {
    const name = Entity.getNameTag(player);
    const actor = new PlayerActor(player);
    if (actor.getGameMode() === EGameMode.CREATIVE) {
      return false;
    }
    return !this.blacklist.includes(name);
  }
}

abstract class ColdCurse extends Curse {
  public static COLD_HEIGHT = 130;
  public static COLD_MESSAGE: boolean = true;
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
  public static runSnow(x: int, y: int, z: int, radius = 16, count = 16) {
    if (World.getThreadTime() % 3 === 0) {
      for (let n = -count; n <= count; n++) {
        ForestParticle.send(
          EForestParticle.SNOWFALL,
          x + n,
          y,
          z + randomInt(-radius, radius),
          0.05,
          -0.1,
          0,
          Player.getLocal()
        );
        ForestParticle.send(
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
  public static onTick(ticker: int, player: int): void {
    if (!this.has(player)) return;
    const pos = Entity.getPosition(player);
    if (pos.y > ColdCurse.COLD_HEIGHT) {
      Entity.damageEntity(player, 5);
      Entity.addEffect(player, EPotionEffect.DIG_SLOWDOWN, 3, 10, false, false);
      //  const layout = ColdCurse.UI.layout;
      if (ColdCurse.UI.isOpened() === false) {
        ColdCurse.UI.open();
        // layout && layout.setAlpha(0)
      }
      // if (ColdCurse.UI.isOpened() === true) {
      //   layout && layout.setAlpha(1 / ticker);
      //   ColdCurse.UI.forceRefresh();
      //   if (ticker > 1) {
      //     ticker -= 1;
      //   }
      // }
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
