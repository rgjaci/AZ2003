'use server';

/**
 * @fileOverview An AI agent to answer user questions about the naturalization process.
 *
 * - answerNaturalizationQuestions - A function that handles answering questions.
 * - AnswerNaturalizationQuestionsInput - The input type for the answerNaturalizationQuestions function.
 * - AnswerNaturalizationQuestionsOutput - The return type for the answerNaturalizationQuestions function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnswerNaturalizationQuestionsInputSchema = z.object({
  question: z.string().describe('The question about the naturalization process.'),
});
export type AnswerNaturalizationQuestionsInput = z.infer<typeof AnswerNaturalizationQuestionsInputSchema>;

const AnswerNaturalizationQuestionsOutputSchema = z.object({
  answer: z.string().describe('The answer to the question about the naturalization process, formatted in Markdown.'),
});
export type AnswerNaturalizationQuestionsOutput = z.infer<typeof AnswerNaturalizationQuestionsOutputSchema>;

export async function answerNaturalizationQuestions(
  input: AnswerNaturalizationQuestionsInput
): Promise<AnswerNaturalizationQuestionsOutput> {
  return answerNaturalizationQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerNaturalizationQuestionsPrompt',
  input: {
    schema: z.object({
      question: z.string().describe('The question about the naturalization process.'),
    }),
  },
  output: {
    schema: z.object({
      answer: z.string().describe('The answer to the question about the naturalization process, formatted in Markdown. Use **bold text** for headings or key terms. Use numbered lists (e.g., 1. Item) for steps. Use double newlines (\n\n) for paragraph breaks.'),
    }),
  },
  prompt: `You are an expert on the U.S. naturalization process. Answer the following question clearly, accurately, and comprehensively.
Format your response using Markdown:
- Use **bold text** for headings or very important terms (e.g., "**Step 1: Determine Eligibility**").
- Use numbered lists for sequential steps or lists of items (e.g., "1. First item\n2. Second item").
- Use double newlines (i.e., an empty line) to separate distinct paragraphs and list items for better readability.
- Ensure that list items are clearly separated by double newlines if they contain more than a short phrase.

Question: {{{question}}}`,
});

const answerNaturalizationQuestionsFlow = ai.defineFlow<
  typeof AnswerNaturalizationQuestionsInputSchema,
  typeof AnswerNaturalizationQuestionsOutputSchema
>({
  name: 'answerNaturalizationQuestionsFlow',
  inputSchema: AnswerNaturalizationQuestionsInputSchema,
  outputSchema: AnswerNaturalizationQuestionsOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
