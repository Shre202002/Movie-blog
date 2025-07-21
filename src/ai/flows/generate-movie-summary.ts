// This file is machine-generated - edit at your own risk!

'use server';

/**
 * @fileOverview Generates a concise AI-powered summary or highlight for a movie.
 *
 * - generateMovieSummary - A function that generates the movie summary.
 * - GenerateMovieSummaryInput - The input type for the generateMovieSummary function.
 * - GenerateMovieSummaryOutput - The return type for the generateMovieSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMovieSummaryInputSchema = z.object({
  title: z.string().describe('The title of the movie.'),
  genre: z.string().describe('The genre of the movie.'),
  director: z.string().describe('The director of the movie.'),
  actors: z.string().describe('A comma separated list of the actors in the movie.'),
  plot: z.string().describe('A short plot description of the movie.'),
});
export type GenerateMovieSummaryInput = z.infer<typeof GenerateMovieSummaryInputSchema>;

const GenerateMovieSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise summary or highlight of the movie.'),
});
export type GenerateMovieSummaryOutput = z.infer<typeof GenerateMovieSummaryOutputSchema>;

export async function generateMovieSummary(input: GenerateMovieSummaryInput): Promise<GenerateMovieSummaryOutput> {
  return generateMovieSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMovieSummaryPrompt',
  input: {schema: GenerateMovieSummaryInputSchema},
  output: {schema: GenerateMovieSummaryOutputSchema},
  prompt: `You are a movie expert. Generate a concise summary or highlight for the movie based on the following information.

Title: {{{title}}}
Genre: {{{genre}}}
Director: {{{director}}}
Actors: {{{actors}}}
Plot: {{{plot}}}

Summary: `,
});

const generateMovieSummaryFlow = ai.defineFlow(
  {
    name: 'generateMovieSummaryFlow',
    inputSchema: GenerateMovieSummaryInputSchema,
    outputSchema: GenerateMovieSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
