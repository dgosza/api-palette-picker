import { Request, Response, NextFunction } from 'express';
import GetPaletteByColor from '../services/GetPaletteByColor';
import logger from '../../../lib/logger';

interface IFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
}

export default class PaletteController {
  public async get(request: Request, response: Response, next: NextFunction): Promise<Response> {
    const images: Array<IFile> = request.files as Array<IFile>;

    if (!images || images.length === 0) {
      logger.error('No files were uploaded.');
      return response.status(400).json({ message: 'No files were uploaded.' });
    } else {
      const getPaletteByColor = new GetPaletteByColor();
      const palettesImages: Array<any> = [];

      for (const image of images) {
        const imageData = await getPaletteByColor.execute({ image });
        palettesImages.push(imageData);
      }

      return response.json(palettesImages);
    }
  }
}
