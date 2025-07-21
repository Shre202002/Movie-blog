'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NextProgressBar = () => {
  return <ProgressBar height="4px" color="hsl(var(--accent))" options={{ showSpinner: false }} />;
};

export default NextProgressBar;
