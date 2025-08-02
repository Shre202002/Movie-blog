
'use client';

import { Button } from '@/components/ui/button';
import { Download, PlayCircle } from 'lucide-react';
import { useState } from 'react';

function handleGenerateLink(movieId: string) {
  return `https://www.allmoviesdownload.xyz/movies/${movieId}`;
}

export function StreamOnline({ movieId }: { movieId: string }) {
  const [buttonText, setButtonText] = useState('Watch Now');

  const handleClick = async () => {
    setButtonText("Generating Link...")
    window.open(handleGenerateLink(movieId), "_blank")
    setButtonText("Watch Now")
  };

  return (
    <Button onClick={handleClick} size="lg" className="w-full py-6 text-lg bg-accent text-accent-foreground hover:bg-accent/90">
      <PlayCircle className="mr-2 h-6 w-6" /> {buttonText}
    </Button>
  );
}


export function DownloadLinks({ links, movieId }: { links: { [key: string]: string } | undefined, movieId: string }) {
  
  if (!links || Object.keys(links).length === 0) {
    return (
      <p className="text-muted-foreground italic">No download links available.</p>
    );
  }

  const sortedLinks = Object.keys(links).sort((a, b) => {
    const qualityA = parseInt(a.replace('p', ''));
    const qualityB = parseInt(b.replace('p', ''));
    return qualityB - qualityA;
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {sortedLinks.map((quality) => {
        return(
          <DownloadButton key={quality} quality={quality} movieId={movieId} />
        )
      })}
    </div>
  );
}

function DownloadButton({ quality, movieId }: { quality: string, movieId: string }) {
  const [buttonText, setButtonText] = useState(quality);
  
  const handleClick = async () => {
    setButtonText("Generating...");
    try {
      const generatedLink = handleGenerateLink(movieId);
      window.open(generatedLink, "_blank");
    } catch (error) {
      console.error("Failed to generate link", error);
    } finally {
      setButtonText(quality);
    }
  };

  return (
    <Button onClick={handleClick} size="lg" className="bg-primary hover:bg-primary/90">
      <Download className="mr-2" /> {buttonText}
    </Button>
  );
}
