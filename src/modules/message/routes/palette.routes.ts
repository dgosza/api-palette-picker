import { Router } from 'express';
import PaletteController from '../controllers';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

// MULTER CONFIG
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();
const paletteController = new PaletteController();

router.get(
  '/v1/get-palette-color',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      // Add any header validation here if needed
    }).unknown(),
  }),
  upload.array('images', 10),
  paletteController.get,
);

export default router;
