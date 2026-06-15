import {ChatMistralAI} from "@langchain/mistralai"
import {ChatGoogleGenerativeAI} from "@langchain/google-genai"
import {HumanMessage,SystemMessage,AIMessage,tool,createAgent} from "langchain"
import * as z from "zod"
import { searchInternet } from "./internet.service.js"

const mistralmodel = new ChatMistralAI({
    model:"mistral-small-latest",
    apiKey:process.env.MISTRALAI_API_KEY
})

const geminimodel = new ChatGoogleGenerativeAI({
    model:"gemini-2.5-flash-lite",
    apiKey:process.env.GEMINI_API_KEY
})

const searchInternetTool = tool(
    searchInternet,
    {
        name:"searchInternet",
        description:"use this tool to get the latest information from the internet.",
        schema:z.object({
            query : z.string().describe("The search query to look up on the internet.")
        })
    }
)

const agent = createAgent({
    model: geminimodel,
    tools: [ searchInternetTool ],
})

export async function generateResponse(messages) {
    console.log(messages)

    const response = await agent.invoke({
        messages: [
            new SystemMessage(`
                You are a helpful and precise assistant for answering questions.
                If you don't know the answer, say you don't know. 
                If the question requires up-to-date information, use the "searchInternet" tool to get the latest information from the internet and then answer based on the search results.
            `),
            ...(messages.map(msg => {
                if (msg.role == "user") {
                    return new HumanMessage(msg.content)
                } else if (msg.role == "ai") {
                    return new AIMessage(msg.content)
                }
            })) ]
    });
     return response.messages[ response.messages.length - 1 ].content;
}

export async function generateChatTitle(message){

    const response = await mistralmodel.invoke([
        new SystemMessage(`You are a helpful assistant that generates concise and relevant chat titles based on the conversation content. The title should capture the essence of the discussion in a  4 -5 words.`),

        new HumanMessage(`Generate a concise and relevant title for a chat with the following content: ${message}`)
    ])
    return response.text;
}

