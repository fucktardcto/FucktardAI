import Anthropic from '@anthropic-ai/sdk';
import "../loadEnv.js"
function getClient(){

    const client = new Anthropic({
        apiKey: process.env['ANTHROPIC_API'], // This is the default and can be omitted
    });
    return client
}

export async function completeTextFromClaude(prompt) {
    let client = getClient()
    let output =   await client.messages.create({
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
        model: 'claude-3-5-sonnet-20240620',
  });

  return output.content[0].text

}