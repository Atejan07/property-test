import { Router } from 'express';
import multer from 'multer';
import { getAllProperties, addProperty, uploadImage } from '../controllers';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/properties', getAllProperties);
router.post('/properties', addProperty);
router.post('/upload', upload.single('my_file'), uploadImage);

export { router };
