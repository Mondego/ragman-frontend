import { RAGMAN_BACKEND_HOST } from '@/utils/app/const';

export const config = {
  runtime: 'edge',
};

const handler = async (_: Request): Promise<Response> => {
  console.log('----- assistants -----');
  try {
    
    let url = `${RAGMAN_BACKEND_HOST}/assistants`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.status === 401) {
      return new Response(response.body, {
        status: 500,
        headers: response.headers,
      });
    } else if (response.status !== 200) {
      console.error(
        `Ragman backend returned an error ${
          response.status
        }: ${await response.text()}`,
      );
      throw new Error('Ragman backend returned an error');
    }

    return new Response(await response.text(), { status: 200 });

  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
