import { completeTextFromClaude } from "./llm/anthropicAdapter.js"
import { completeTextFromChatGPT } from "./llm/openaiAdapter.js"

let memories = []

export function addMemory(memory){
    memories.push(memory)
}

export function getMemoryAsText(){
    return JSON.stringify(memories)
}

export async function consolidateMemory(){
    let strMemory = getMemoryAsText()
    let prompt = `
    Your memory of past experiences is: ${strMemory}
    Summarize the most important memories and delete some 
    return the new memory as a new JSON array
    Do not make any other comment. 
    the new memory is:
    `
    memories = await completeTextFromChatGPT(prompt)
    console.log("memory", memories)
}