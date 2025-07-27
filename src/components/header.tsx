
"use client"
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, Highlight, useInstantSearch, Configure } from 'react-instantsearch';
import Image from 'next/image'

const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY || ''
);

const Hit = ({ hit }: any) => (
  <a href={`/movies/${hit.objectID}`}>
  <article className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow hover:shadow-md transition bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <Image
      src={hit.posterUrl}
      alt={hit.title}
      width={50}
      height={100}
      className="hidden sm:block h-auto object-cover rounded-md border border-gray-300 dark:border-gray-600"
    />
    <div className="flex flex-col justify-between">
      <h1 className="sm:text-lg font-semibold text-gray-800 dark:text-gray-100">
        <Highlight attribute="title" hit={hit} />
      </h1>
      <p className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
        <span className="font-medium">Genre:</span>{' '}
        <Highlight attribute="genre" hit={hit} />
      </p>
      <p className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
        <span className="font-medium">Actors:</span>{' '}
        <Highlight attribute="actors" hit={hit} />
      </p>
    </div>
  </article>
  </a>
);


export function Header() {

  function CustomHits() {
    const { results } = useInstantSearch();

    if (results?.query === '') return null;

    if (results?.hits.length === 0) {
      return (
        <div className="absolute top-12 bg-card p-4 rounded-lg shadow-lg w-full">
          <p className="text-muted-foreground text-center">
            No results found for &quot;{results.query}&quot;.
          </p>
        </div>
      );
    }
    return (
      <div className="absolute top-12 bg-card p-4 rounded-lg shadow-lg w-full space-y-2">
        <Hits hitComponent={Hit} />
      </div>
    );
  }

  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <Clapperboard className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-[-15deg]" />
          <span className="text-xl font-bold font-headline text-foreground transition-colors group-hover:text-primary">
            Kiwi Cinema
          </span>
        </Link>
        <div className="w-full max-w-md">
          <InstantSearch searchClient={searchClient} indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'movies'}>
            <Configure hitsPerPage={5} />
            <div className="relative">
              <SearchBox
                placeholder="Search movies..."
                classNames={{
                  root: '',
                  form: 'relative',
                  input:
                    'w-full h-10 pl-10 pr-4 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring',
                  submit: 'hidden',
                  reset: 'hidden',
                }}
              />
              <SearchIcon
                className="w-5 h-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
              <CustomHits />
            </div>
          </InstantSearch>
        </div>
      </div>
    </header>
  );
}
