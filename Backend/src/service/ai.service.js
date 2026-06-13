import {ChatMistralAI} from "@langchain/mistralai"
import {ChatGoogleGenerativeAI} from "@langchain/google-genai"
import {HumanMessage,SystemMessage,AIMessage} from "langchain"

const mistralmodel = new ChatMistralAI({
    model:"mistral-small-latest",
    apiKey:process.env.MISTRALAI_API_KEY
})

const geminimodel = new ChatGoogleGenerativeAI({
    model:"gemini-2.5-flash-lite",
    apiKey:process.env.GEMINI_API_KEY
})

export async function generateResponse(messages){  

    const formattedMessages = messages
        .map(msg => {
            if(msg.role === 'user'){
                return new HumanMessage(msg.content)
            }
            else if(msg.role === 'ai'){
                return new AIMessage(msg.content)
            }
            return null;
        })
        .filter(msg => msg !== null)

    const response = await geminimodel.invoke(formattedMessages)
    return response.content;
}

export async function generateChatTitle(message){

    const response = await mistralmodel.invoke([
        new SystemMessage(`You are a helpful assistant that generates concise and relevant chat titles based on the conversation content. The title should capture the essence of the discussion in a  4 -5 words.`),

        new HumanMessage(`Generate a concise and relevant title for a chat with the following content: ${message}`)
    ])
    return response.text;
}

