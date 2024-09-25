import { NEXT_PUBLIC_DISCLAIMER_MESSAGE_FILE_PATH } from '@/utils/app/const';

import { readFile } from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';

const allowedOrigins = ['http://127.0.0.1:3333', 'http://localhost:3333']

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const origin = req.headers.origin;

    if (origin != undefined && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }

    try {
        const disclaimer = await readFile(NEXT_PUBLIC_DISCLAIMER_MESSAGE_FILE_PATH, 'utf-8');
        res.status(200).json({ disclaimer });
    } catch (error) {
        res.status(404).json( { error: `Error reading disclaimer message: ${error}` } );
    }
}

export default handler;