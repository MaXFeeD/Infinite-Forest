const changeTorchSpecial = (block, item, special: "iced" | "flamed", coords) => {
    const minus = Entity.setCarriedItem;
  const region = BlockSource.getDefaultForActor(Player.getLocal());
 if(block.id === BlockID["eucalyptus_torch"]) { minus(Player.getLocal(), item.id, item.count - 1, 0);
 //const place = coords.relative;
 for(let i = 0; i <= 10; i++){
 spawnParticle(smoke, coords.x+ 0.5, coords.y + 0.8, coords.z + 0.5,
   0, 0.1, 0); };
     region.setBlock(coords.x, coords.y, coords.z, BlockID[special + "_eucalyptus_torch"],0)
      Game.message(JSON.stringify(TileEntity.addTileEntity(coords.x,
         coords.y, coords.z, region)));
 };
 
}
 
const FlameDust = new FItem("flame_dust", 64, "Flame dust", ["flame_dust", 6]);
const IceDust = new FItem("ice_dust", 64, "Ice dust", ["ice_dust", 11]);

FlameDust.onUse((coords, item, block, player) => {
 // Researchs.setupQuestion(player,"Интересно. Почему-то неведомый мне дождь старался погасить изготовленный мною, но стоило посыпать горящей пылью, и всё решилось...")
 const place = coords.relative;
 const region = BlockSource.getDefaultForActor(Player.getLocal());
    return Entity.getSneaking(Player.getLocal()) === true ? 
    region.setBlock(place.x, place.y, place.z, VanillaBlockID.fire , 0) : 
    changeTorchSpecial(block, item, "flamed", coords);
});


IceDust.onUse((coords, item, block, player) => {
 return changeTorchSpecial(block, item, "iced", coords)
 //Researchs.setupQuestion(player,"Невероятно! Она, заставила его светиться..? Я должен побольше узнать о ледяной пыли")
});

