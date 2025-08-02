'use client';

import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';

export function WatchNowButton() {
  return (
    <Button size="lg" className="w-full py-6 text-lg bg-accent text-accent-foreground hover:bg-accent/90">
      <PlayCircle className="mr-2 h-6 w-6" />
      Watch Now
    </Button>
  );
}
