import { Request, Response, Router } from 'express';
import { Message } from '../types';
const fs = require('fs');

const messageDirectory = './messages';
const messagesRouter = Router();

messagesRouter.post('/', async (req, res) => {
    const { author, message } = req.body;
    
    if (!req.body.author || !req.body.message) {
        return res.status(400).send({'error': 'Author and message must be present in the request'});
    }

    const newMessage: Message = {
        id: crypto.randomUUID(),
        author,
        message,
        createdAt: new Date().toISOString()
    };

    fs.readFile('db.json', (err: Error, data: string) => {
        if (err) {
            return res.status(500).json({error: 'Internal server error'});
        }

        const db = JSON.parse(data.toString() || '{}');
        db.messages = db.messages || [];
        db.messages.push(newMessage);

        fs.writeFile('db.json', JSON.stringify(db, null, 2), (err: Error) => {
            if (err) {
                return res.status(500).json({error: 'Internal server error'});
            }

            res.status(200).json(newMessage);
        });
    });
});

messagesRouter.get('/', (req: Request, res: Response) => {
    const queryDate = req.query.datetime as string; 
    if (queryDate) {

        const date = new Date(queryDate);

        if (!isNaN(date.getDate())){ 

            fs.readFile('db.json', (err: Error, data: string) => {

                if (err) {
                    return res.status(500).json({error: 'Внутренняя ошибка сервера'});
                }
                const iso = date.toISOString();
                const db = JSON.parse(data.toString());
                let messages = db.messages || [];
                const filteredMessagesAll = messages.filter((item: any) => item.createdAt > iso);
                res.json(filteredMessagesAll.slice(-30));
            });

        } else {
            return res.status(500).json({error: 'Внутренняя ошибка сервера'});
        }
    } else { 
    fs.readFile('db.json', (err: Error, data: string) => {
        if (err) {
            return res.status(500).json({error: 'Внутренняя ошибка сервера'});
        };

        const db = JSON.parse(data.toString());
        let messages = db.messages || [];
        res.json(messages.slice(-30));
    });
};
});

export default messagesRouter;