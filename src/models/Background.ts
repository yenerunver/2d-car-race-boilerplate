export class Background {
  static drawBackground(context: CanvasRenderingContext2D, asset: string) {
    const background = new Image();
    background.src = asset;

    background.onload = () => {
      context.drawImage(background, 0, 0);
    };
  }
}
