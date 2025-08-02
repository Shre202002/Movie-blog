
'use client';

import { Button } from '@/components/ui/button';
import { getRandomBlog } from '@/lib/data';
import { Download, PlayCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

async function handleGenerateLink(movieId: string, link: string) {
  const domain = await getRandomBlog()
  const url = link.split("https://gigody.com/?id=")[1]
  const finalLink = `${domain}/?ywegkqdsfljsaldfjlsdkfjlsadjfoiwueroiuxkvck=${movieId}--${url}--${movieId}`
  return finalLink;
}

export function StreamOnline({ link, movieId }: { link: string; movieId: string }) {
  const [buttonText, setButtonText] = useState('Stream Online');

  if (!link) {
    return (
      <Button size="lg" disabled className="w-full py-6 text-lg">
        <PlayCircle className="mr-2" /> Not Available
      </Button>
    );
  }
  return (
    <Button onClick={async() =>{
      setButtonText("Generating Link...")
      window.open(await handleGenerateLink(movieId, link), "_blank")
      setButtonText("Stream Online")
    }} size="lg" className="w-full py-6 text-lg bg-accent text-accent-foreground hover:bg-accent/90">
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

  const sortedLinks = Object.entries(links).sort((a, b) => {
    const qualityA = parseInt(a[0].replace('p', ''));
    const qualityB = parseInt(b[0].replace('p', ''));
    return qualityB - qualityA;
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {sortedLinks.map(([quality, link]) => {
        return(
          <DownloadButton key={quality} quality={quality} link={link} movieId={movieId} />
        )
      })}
    </div>
  );
}

function DownloadButton({ quality, link, movieId }: { quality: string, link: string, movieId: string }) {
  const [buttonText, setButtonText] = useState(quality);
  
  const handleClick = async () => {
    setButtonText("Generating...");
    try {
      const generatedLink = await handleGenerateLink(movieId, link);
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
