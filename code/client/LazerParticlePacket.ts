abstract class LazerParticlePacket extends ClientPacket {
  static LAZER_DISTANCE = 0.05;
  static identifier: string = "packet.infinite_forest.lazer_particles";
  static function(packetData: { player: int }) {
    const vector = Entity.getLookVector(packetData.player);
    const position = Entity.getPosition(packetData.player);
    Entity.getPosition(packetData.player);
    for (let distance = 0.45; distance <= 15; distance += 0.01) {
      Particles.addParticle(
        EForestParticle.INSIGHT_VIEW,
        position.x + vector.x * distance,
        position.y + vector.y * distance,
        position.z + vector.z * distance,
        0,
        0,
        0
      );
    }
    return;
  }
  public static send(player: int) {
    const client = Network.getClientForPlayer(player);
    if (!client) {
      return;
    }
    client.send("packet.infinite_forest.lazer_particles", {
      player: player,
    });
    return;
  }
}

Network.addClientPacket(
  LazerParticlePacket.identifier,
  LazerParticlePacket.function
);