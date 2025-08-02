import { config } from 'dotenv';
config();

import '@/ai/flows/generate-movie-summary.ts';
import '@/ai/flows/detect-spam.ts';
import '@/ai/flows/generate-movie-plot.ts';
