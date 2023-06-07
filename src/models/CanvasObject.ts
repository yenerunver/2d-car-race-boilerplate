import { CanvasObject as CanvasObjectType } from "../@types/CanvasObject";

export class CanvasObject {
  asset;

  size = 1;

  constructor(props: CanvasObjectType) {
    this.asset = props.asset;
    if (props.size) {
      this.size = props.size;
    }
  }

  static createFromAssetURL(
    assetURL: string,
    size?: number
  ): Promise<CanvasObject> {
    return new Promise((resolve, reject) => {
      const asset = new Image();
      asset.onload = () => resolve(new CanvasObject({ asset, size }));
      asset.onerror = reject;
      asset.src = assetURL;
    });
  }
}
