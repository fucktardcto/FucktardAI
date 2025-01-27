import OpenAI from 'openai';

const client = new OpenAI({
	baseURL: 'https://api.deepseek.com',
  apiKey: process.env['DEEPSEEK_API_KEY'], 
});

export async function completeTextFromDeepseek(prompt) {
  const chatCompletion = await client.chat.completions.create({
	messages: [{ role: 'user', content: prompt }],
	model: 'deepseek-chat',
  });

  const response = chatCompletion.choices?.map(choice => choice?.message?.content)?.join('\n');

  return response;
}
