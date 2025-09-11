
import { Router } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const router = Router();
const dataPath = path.join(__dirname, 'parkings.json');

// קריאת כל החניות
router.get('/parkings', (req, res) => {
    if (!fs.existsSync(dataPath)) return res.json([]);
    const data = fs.readFileSync(dataPath, 'utf-8');
    res.json(JSON.parse(data));
});

// הוספת חניה
router.post('/parkings', (req, res) => {
    const parkings = fs.existsSync(dataPath)
        ? JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
        : [];
    const newParking = req.body;
    newParking.id = Date.now().toString();
    parkings.push(newParking);
    fs.writeFileSync(dataPath, JSON.stringify(parkings, null, 2));
    res.json(newParking);
});

// עדכון חניה
router.put('/parkings/:id', (req, res) => {
    console.log(req.body);
    if (!fs.existsSync(dataPath)) return res.status(404).json({ error: 'Not found' });
    const parkings = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    const idx = parkings.findIndex((p: any) => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    parkings[idx] = { ...parkings[idx], ...req.body };
    fs.writeFileSync(dataPath, JSON.stringify(parkings, null, 2));
    res.json(parkings[idx]);
});

export default router;
