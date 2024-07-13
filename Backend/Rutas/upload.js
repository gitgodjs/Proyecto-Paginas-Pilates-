const router = require('express').Router();
const { bucket } = require('../fireBase');
const multer = require('multer');
const upload = multer();

router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req) {
            console.log("No se encontró ninguna imagen para subir.");
            return res.status(400).json({ error: 'No se encontró ninguna imagen para subir.' });
        }

        const imageFile = req.body.image;

        const imageUrl = await uploadImage(imageFile);

        res.status(200).json({ imageUrl });
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        res.status(500).json({ error: 'Error interno del servidor al subir la imagen.' });
    }
});

async function uploadImage(imageData) {
    return new Promise((resolve, reject) => {
        // Decodificar el base64 y obtener información del archivo
        const base64Image = imageData.split(';base64,').pop();
        const buffer = Buffer.from(base64Image, 'base64');
        const contentType = imageData.split(';')[0].split(':')[1];

        // Generar un nombre único para el archivo
        const fileName = `image_${Date.now()}.jpg`;

        // Subir el archivo a Firebase Storage
        const blob = bucket.file(fileName);
        const blobStream = blob.createWriteStream({
            metadata: {
                contentType
            }
        });

        blobStream.on('error', (error) => {
            console.error('Error al subir la imagen:', error);
            reject('Error al subir la imagen a Firebase.');
        });

        blobStream.on('finish', () => {
            blob.makePublic().then(() => {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
                console.log('Imagen subida a Firebase:', publicUrl);
                resolve(publicUrl);
            }).catch(error => {
                reject('Error al hacer pública la imagen en Firebase.', error);
            });
        });

        blobStream.end(buffer);
    });
}

module.exports = router;
