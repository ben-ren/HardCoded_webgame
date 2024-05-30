class Background{
    static layerInfo = [
        { image: new Image(), src: 'images/skybox.png', speed: 0.1 },
        { image: new Image(), src: 'images/forest_seamless_lowres.png', speed: 0.3 },
        { image: new Image(), src: 'images/treeline.png', speed: 0.5 },
        { image: new Image(), src: 'images/pathway.png', speed: 0.6 },
        { image: new Image(), src: 'images/treetops.png', speed: 0.5 }
    ];

    constructor(gamespeed){
        this.layers = Background.layerInfo.map(info => {
            info.image.src = info.src;
            return new Layer(info.image, info.speed, gamespeed);
        });
    }

    LoadLayers(ctx, gamespeed){
        this.layers.forEach(layer => {
            this.RenderLayer(layer, ctx, gamespeed);
        });
    }

    RenderLayer(layer, ctx, gamespeed){
        layer.update(gamespeed);
        layer.draw(ctx);
    }
}