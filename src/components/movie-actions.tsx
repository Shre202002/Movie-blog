
'use client';

import { Button } from '@/components/ui/button';
import { Download, PlayCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
export function StreamOnline({ link, movieId }: { link: string; movieId: string }) {
  const router = useRouter()
    if (!link) {
      return (
        <Button size="lg" disabled>
          <PlayCircle className="mr-2" /> Not Available
        </Button>
      );
    }
    return (
      <form action="https://www.aimlinfo.in/" method="POST" target="_blank">
        <input type="hidden" name="id" value={movieId} />
        <input type="hidden" name="link" value={link} />
        <Button onClick={()=>router.push("https://www.aimlinfo.in/")}>go somewhere</Button>
        <Button type="submit" size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
          <PlayCircle className="mr-2" /> Stream Online
        </Button>
      </form>
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
        {sortedLinks.map(([quality, link]) => (
          <form key={quality} action="https://www.aimlinfo.in/" method="POST" target="_blank">
              <input type="hidden" name="id" value={movieId} />
              <input type="hidden" name="link" value={link} />
              <Button type="submit" variant="outline" className="w-full">
                  <Download className="mr-2" /> {quality}
              </Button>
          </form>
        ))}
      </div>
    );
  }
  
