class Reflection {
  public static list: Record<
    name,
    { message: string; bookPage: string; learnings: string[] }
  > = {};
  public static playerList: Record<name, Set<name>> = {};
  constructor(
    public name: string,
    public message: string,
    public bookPage: string,
    ...learnings: string[]
  ) {
    Reflection.list[name] = { message, bookPage, learnings };
  }
  public static hasLearnings(player: int, learnings: string[]) {
    const list = (Learning.playerList[player] ??= new Set());
    for (const learning of learnings) {
      if (Learning.has(player, learning) === false) {
        return false;
      }
    }
    return true;
  }
  public static has(player: int, name: string) {
    return (Reflection.playerList[Entity.getNameTag(player)] ??= new Set()).has(
      name
    );
  }
  public static send(player: int, name: string) {
    if (Reflection.has(player, name) === true) return;
    if (!Reflection.hasLearnings(player, Reflection.list[name].learnings))
      return;
    Reflection.sendMessage(player);
    const playerName = Entity.getNameTag(player);
    Reflection.playerList[playerName].add(name);
    BookUI.givePage(player,   Reflection.list[name].bookPage);
  }
  public static sendMessage(player: int) {
    const client = Network.getClientForPlayer(player);
    if (!client) return;
    BlockEngine.sendUnlocalizedMessage(
      client,
      Native.Color.DARK_GREEN +
        Translation.translate("message.infinite_forest.reflection")
    );
  }
}

namespace ReflectionList {
  export const TEMPERATURE_FLOWERS = new Reflection(
    "temperature_flowers",
    "temperature_flowers",
    "temperature_flowers_title",
    "fironia",
    "ice_flower",
    "electric_mushroom"
  );
}

Callback.addCallback("ItemUse", (c, i, b, ise, p) => {
  Reflection.send(p, "temperature_flowers");
});