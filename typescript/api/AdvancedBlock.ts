class AdvancedBlock extends FBlock {
    constructor(id: string, data);
    constructor(id: string, data, modelData: model_descriptor);
  constructor(
    id: string,
    data: Block.BlockVariation[],
    modelData?: model_descriptor
  ) {
    super(id, data);
    if (modelData) this.visual(modelData);
  }

  public visual(data): void {
    const mesh = new RenderMesh();
    mesh.setBlockTexture(data.texture, 0);
    if(!data.importParams) data.importParams = {translate: [0.5, 0, 0.5]}
    if(data && data.importParams && !data.importParams.translate) data.importParams["translate"] = [0.5, 0, 0.5];
    mesh.importFromFile(
      MODELSDIR + data.model + ".obj",
      "obj",
      data.importParams || null
    );
    const render = new ICRender.Model();
    render.addEntry(new BlockRenderer.Model(mesh));
    return BlockRenderer.setStaticICRender(BlockID[this.id], 0, render);
  }
  public placer(
    item: universal,
    condition?: (coords, item, block, player, region: BlockSource) => void,
    data?: int
  ) {
    Item.registerUseFunction(item, (coords, item, block, player) => {
      const region = BlockSource.getDefaultForActor(player);
      if (condition) return condition(coords, item, block, player, region);
      const place = coords.relative;
 
     return (region.setBlock(place.x, place.y, place.z, BlockID[this.id], data || 0),
     TileEntity.addTileEntity(coords.x, coords.y, coords.z, region));
    });
  }
}
