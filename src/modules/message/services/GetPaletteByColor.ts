import AppError from '../../../lib/error';
import logger from '../../../lib/logger';
import Vibrant = require('node-vibrant');

interface IRequest {
  image: any;
}

class GetPaletteByColor {
  public async execute({ image }: IRequest): Promise<string> {
    const colors: any = [];
    let number = 0;

    Vibrant.from(image.buffer)
      .getPalette()
      .then((palette: any) => {
        console.log(palette)
        for (const color in palette) {
          console.log(color)
          number = number + 1;
          const type = color;
          const typeTextColor = palette[color].getTitleTextColor();
          const hex = palette[color].getHex();
          const hexTextColor = palette[color].getBodyTextColor();
          // const name = getColorName(hex);
          const nameTextColor = palette[color].getBodyTextColor();
          colors.push({ type, number, typeTextColor, hex, hexTextColor, nameTextColor });
        }
        console.log(colors);
        return colors;
      })
      .catch((err) => console.error(err));
  }
}

export default GetPaletteByColor;
