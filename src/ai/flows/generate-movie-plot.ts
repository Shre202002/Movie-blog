'use server';
/**
 * @fileOverview Generates a more detailed plot for a movie.
 *
 * - generateMoviePlot - A function that generates an expanded movie plot.
 * - GenerateMoviePlotInput - The input type for the generateMoviePlot function.
 * - GenerateMoviePlotOutput - The return type for the generateMoviePlot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMoviePlotInputSchema = z.object({
  title: z.string().describe('The title of the movie.'),
  plot: z.string().describe('The existing short plot of the movie.'),
});
export type GenerateMoviePlotInput = z.infer<typeof GenerateMoviePlotInputSchema>;

const GenerateMoviePlotOutputSchema = z.object({
  plot: z
    .string()
    .describe(
      'A detailed plot of the movie, up to 500 words. It should be engaging and descriptive.'
    ),
});
export type GenerateMoviePlotOutput = z.infer<
  typeof GenerateMoviePlotOutputSchema
>;

export async function generateMoviePlot(
  input: GenerateMoviePlotInput
): Promise<GenerateMoviePlotOutput> {
  return generateMoviePlotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMoviePlotPrompt',
  input: {schema: GenerateMoviePlotInputSchema},
  output: {schema: GenerateMoviePlotOutputSchema},
  prompt: `You are a movie expert. Based on the title and the short plot summary provided, expand the plot into a detailed and engaging storyline of up to 500 words.

Movie Title: {{{title}}}

Short Plot: {{{plot}}}

Expanded Plot:`,
});

const generateMoviePlotFlow = ai.defineFlow(
  {
    name: 'generateMoviePlotFlow',
    inputSchema: GenerateMoviePlotInputSchema,
    outputSchema: GenerateMoviePlotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
