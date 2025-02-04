import { completeTextFromClaude } from "./llm/anthropicAdapter.js"
import { completeTextFromChatGPT } from "./llm/openaiAdapter.js"
import { completeTextFromDeepseek } from "./llm/deepseekAdapter.js";


let memories = []

export function purgeIfNeeded() {
    if (memories.length > 100) {
        memories = [];
    }
}

export function addMemory(memory){
    purgeIfNeeded();
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
    try {
        memories = await completeTextFromDeepseek(prompt);
    } catch (error) {
        memories = await completeTextFromChatGPT(prompt);
    }

    console.log("memory", memories)
}