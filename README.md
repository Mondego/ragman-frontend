# RAGMan frontend

## About

RAGMan frontend is a fork of [ChatBot-UI](https://github.com/mckaywrigley/chatbot-ui) at around Nov 8, 2023, which is further developed by the Mondego group at UC Irvine. Our project is a true fork, in the sense that it does not follow ChatBot-UI any longer. Our UI aims to be feature poor and very simple. Unlike the original ChatBot-UI, RAGMan frontend requires a second web app, RAGMan-backend, to work. All the fancy intelligent actions are done in RAGMan-backend.

![RAGMan frontend](./public/screenshots/screenshot-0402023.jpg)


## Running Locally

NOTE: requires NodeJS version 18 or above.

**1. Clone Repo**

```bash
git clone https://github.com/Mondego/ragman-frontend.git
```

**2. Install Dependencies**

```bash
npm i
```

**3. Provide OpenAI API Key**

Create a .env.local file in the root of the repo with your OpenAI API Key: (This step is unnecessary, because we call openai API from backend, but you can set the key to make sure the frontend is running)

```bash
OPENAI_API_KEY=YOUR_KEY
```

> You can set `OPENAI_API_HOST` where access to the official OpenAI host is restricted or unavailable, allowing users to configure an alternative host for their specific needs.

> Additionally, if you have multiple OpenAI Organizations, you can set `OPENAI_ORGANIZATION` to specify one.

**4. Run App**
* run locally
    ```bash
    npm run dev
    ```

* use this command for server running
    ```bash
    npm run dev -- -p 3333
    ```


**5. Use It**

You should be able to start chatting.

## Configuration

When deploying the application, the following environment variables can be set:

| Environment Variable              | Default value                  | Description                                                                                                                               |
| --------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| RAGMAN_BACKEND_HOST               |                                | The url for the server                                                                                  |
| NEXT_PUBLIC_NAME                  |                                | The user-facing name of the app                                                                                   |
| OPENAI_API_KEY                    |                                | The default API key used for authentication with OpenAI                                                                                   |
| OPENAI_API_HOST                   | `https://api.openai.com`       | The base url, for Azure use `https://<endpoint>.openai.azure.com`                                                                         |
| OPENAI_API_TYPE                   | `openai`                       | The API type, options are `openai` or `azure`                                                                                             |
| OPENAI_API_VERSION                | `2023-03-15-preview`           | Only applicable for Azure OpenAI                                                                                                          |
| AZURE_DEPLOYMENT_ID               |                                | Needed when Azure OpenAI, Ref [Azure OpenAI API](https://learn.microsoft.com/zh-cn/azure/cognitive-services/openai/reference#completions) |
| OPENAI_ORGANIZATION               |                                | Your OpenAI organization ID                                                                                                               |
| DEFAULT_MODEL                     | `gpt-3.5-turbo`                | The default model to use on new conversations, for Azure use `gpt-35-turbo`                                                               |
| NEXT_PUBLIC_DEFAULT_SYSTEM_PROMPT | [see here](utils/app/const.ts) | The default system prompt to use on new conversations                                                                                     |
| NEXT_PUBLIC_DEFAULT_TEMPERATURE   | 1                              | The default temperature to use on new conversations                                                                                       |
| GOOGLE_API_KEY                    |                                | See [Custom Search JSON API documentation][GCSE]                                                                                          |
| GOOGLE_CSE_ID                     |                                | See [Custom Search JSON API documentation][GCSE]                                                                                          |

If you do not provide an OpenAI API key with `OPENAI_API_KEY`, users will have to provide their own key.

If you don't have an OpenAI API key, you can get one [here](https://platform.openai.com/account/api-keys).

## Contact

If you have any questions, feel free to reach out to Iris Ma on [Iris Ma](mailto:huaiyaom@uci.edu).

