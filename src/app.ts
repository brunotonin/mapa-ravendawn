import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

// Define a pasta de conteúdo estático
app.use(express.static(path.join(__dirname, 'public')));

// Define a rota para servir a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a rota para servir os tiles do minimapa
app.get('/minimap/:map/:zoom/:x/:y', async (req, res) => {
    const map = parseInt(req.params.map, 10);
    const zoom = parseInt(req.params.zoom, 10);
    const x = parseInt(req.params.x, 10);
    const y = parseInt(req.params.y, 10);

    let inputImagePath = '';

    // Determine qual imagem de minimapa usar com base no nível de zoom
    if (map == 7) {
        inputImagePath = path.join(__dirname, 'public/assets/map/minimap');
    } else {
        inputImagePath = path.join(__dirname, `public/assets/map/floor${map}`);
    }
    let img = `${inputImagePath}/${zoom}/${x}/${y}.webp`;

    // Verifique se a imagem existe
    if (!fs.existsSync(img)) {
        return res.status(404).send('Imagem não encontrada');
    }

    // Envie o tile gerado como resposta webp
    res.set('Content-Type', 'image/webp');
    res.set('Cache-Control', 'public, max-age=31536000');
    res.send(fs.readFileSync(img));
});

// Inicie o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
