import { Message } from '@/types/chat';
import { OpenAIModel } from '@/types/openai';

import { RAGMAN_BACKEND_HOST } from '../app/const';

import {
  ParsedEvent,
  ReconnectInterval,
  createParser,
} from 'eventsource-parser';

export class RagmanBackendError extends Error {
  type: string;
  param: string;
  code: string;

  constructor(message: string, type: string, param: string, code: string) {
    super(message);
    this.name = 'OpenAIError';
    this.type = type;
    this.param = param;
    this.code = code;
  }
}

export const RagmanBackendStream = async (
  messages: Message[],
  cid: string,
  aid: string,
) => {

  let url = `${RAGMAN_BACKEND_HOST}/chat`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      messages: messages,
      cid: cid,
      aid: aid,
      stream: true,
    }),
  });

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  if (res.status !== 200) {
    const result = await res.json();
    if (result.error) {
      throw new RagmanBackendError(
        result.error.message,
        result.error.type,
        result.error.param,
        result.error.code,
      );
    } else {
      throw new Error(
        `OpenAI API returned an error: ${
          decoder.decode(result?.value) || result.statusText
        }`,
      );
    }
  }

  

  const stream = new ReadableStream({
    async start(controller) {
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === 'event') {
          const data = event.data;

          try {
            const json = JSON.parse(data);
            if (json.choices[0].finish_reason != null) {
              controller.close();
              return;
            }
            const text = json.choices[0].delta.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            controller.error(e);
          }
        }
      };

      try {
        for await (const chunk of res.body as any) {
          console.log('------- inside stream ------')
          console.log(decoder.decode(chunk));
          
          if (chunk) {
            const json = JSON.parse(decoder.decode(chunk));
            const text = json.content;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          }
        }
      } catch (e) {
        controller.error(e);
      }
      controller.close();
      return;

      // const parser = createParser(onParse);

      // for await (const chunk of res.body as any) {
        // parser.feed(decoder.decode(chunk));
      // }
    },
  });

  return stream;
};
