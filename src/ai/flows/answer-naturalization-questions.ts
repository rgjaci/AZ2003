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
  answer: z.string().describe('The answer to the question about the naturalization process.'),
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
      answer: z.string().describe('The answer to the question about the naturalization process.'),
    }),
  },
  prompt: `You are an expert on the U.S. naturalization process. Answer the following question clearly and accurately:\n\nQuestion: {{{question}}}`,
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
