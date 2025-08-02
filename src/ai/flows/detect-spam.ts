'use server';
/**
 * @fileOverview A spam detection AI agent.
 *
 * - detectSpam - A function that handles the spam detection process.
 * - DetectSpamInput - The input type for the detectSpam function.
 * - DetectSpamOutput - The return type for the detectSpam function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectSpamInputSchema = z.object({
  comment: z.string().describe('The comment to be checked for spam.'),
});
export type DetectSpamInput = z.infer<typeof DetectSpamInputSchema>;

const DetectSpamOutputSchema = z.object({
  isSpam: z.boolean().describe('Whether or not the comment is spam.'),
});
export type DetectSpamOutput = z.infer<typeof DetectSpamOutputSchema>;

export async function detectSpam(input: DetectSpamInput): Promise<DetectSpamOutput> {
  return detectSpamFlow(input);
}

const prompt = ai.definePrompt({
  name: 'detectSpamPrompt',
  input: {schema: DetectSpamInputSchema},
  output: {schema: DetectSpamOutputSchema},
  prompt: `You are a spam detection expert. Analyze the following comment and determine if it is spam. A comment is considered spam if it contains ads, scams, malicious links, or is otherwise irrelevant to the topic of a movie review.

Comment: {{{comment}}}

Is the comment spam?`,
});

const detectSpamFlow = ai.defineFlow(
  {
    name: 'detectSpamFlow',
    inputSchema: DetectSpamInputSchema,
    outputSchema: DetectSpamOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
