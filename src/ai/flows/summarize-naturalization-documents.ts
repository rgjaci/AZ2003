'use server';

/**
 * @fileOverview An AI agent that summarizes naturalization documents.
 *
 * - summarizeNaturalizationDocuments - A function that handles the summarization process.
 * - SummarizeNaturalizationDocumentsInput - The input type for the summarizeNaturalizationDocuments function.
 * - SummarizeNaturalizationDocumentsOutput - The return type for the summarizeNaturalizationDocuments function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeNaturalizationDocumentsInputSchema = z.object({
  documentDataUri: z
    .string()
    .describe(
      "A document related to the naturalization case, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type SummarizeNaturalizationDocumentsInput = z.infer<typeof SummarizeNaturalizationDocumentsInputSchema>;

const SummarizeNaturalizationDocumentsOutputSchema = z.object({
  summary: z.string().describe('A summary of the key information in the document.'),
});
export type SummarizeNaturalizationDocumentsOutput = z.infer<typeof SummarizeNaturalizationDocumentsOutputSchema>;

export async function summarizeNaturalizationDocuments(
  input: SummarizeNaturalizationDocumentsInput
): Promise<SummarizeNaturalizationDocumentsOutput> {
  return summarizeNaturalizationDocumentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeNaturalizationDocumentsPrompt',
  input: {
    schema: z.object({
      documentDataUri: z
        .string()
        .describe(
          "A document related to the naturalization case, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
        ),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A summary of the key information in the document.'),
    }),
  },
  prompt: `You are an expert in naturalization processes. Please summarize the following document related to a naturalization case, extracting the key information. Document: {{media url=documentDataUri}}`,
});

const summarizeNaturalizationDocumentsFlow = ai.defineFlow<
  typeof SummarizeNaturalizationDocumentsInputSchema,
  typeof SummarizeNaturalizationDocumentsOutputSchema
>(
  {
    name: 'summarizeNaturalizationDocumentsFlow',
    inputSchema: SummarizeNaturalizationDocumentsInputSchema,
    outputSchema: SummarizeNaturalizationDocumentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
