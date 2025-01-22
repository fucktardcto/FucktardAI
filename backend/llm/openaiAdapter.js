import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], 
});

export async function completeTextFromChatGPT(prompt) {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'gpt-3.5-turbo',
  });

  const response = chatCompletion.choices?.map(choice => choice?.message?.content)?.join('\n');

  return response;
}
