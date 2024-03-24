import { RagmanBackendError, RagmanBackendStream } from '@/utils/server';

import { ChatBody, Message } from '@/types/chat';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { message, position, cid, aid } = (await req.json()) as ChatBody;

    const stream = await RagmanBackendStream(message, position, cid, aid);

    return new Response(stream);
  } catch (error) {
    console.error(error);
    if (error instanceof RagmanBackendError) {
      return new Response('Error', { status: 500, statusText: error.message });
    } else {
      return new Response('Error', { status: 500 });
    }
  }
};

export default handler;
