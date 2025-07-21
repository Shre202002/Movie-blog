// "use client"
import { getMovies } from '@/lib/data';
import { SearchableMovieList } from '@/components/searchable-movie-list';
import { Button } from '@/components/ui/button';
import { collection, addDoc } from 'firebase/firestore';
import {db} from '@/lib/firebase';

export default async function HomePage() {
  const allMovies = await getMovies();

  // const handleInsert = async () => {
  //   try {
  //     const response = await fetch("/bollywood_movies.json"); // Load JSON from public folder
  //     const data = await response.json(); // Parse it

  //     const colRef = collection(db, "movies");

  //     for (const item of data) {
  //       await addDoc(colRef, item); // Insert each item
  //       console.log("Inserted:", item);
  //     }

  //     alert("Data inserted successfully!");
  //   } catch (error) {
  //     console.error("Error inserting data:", error);
  //   }
  // };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2 text-primary">All Movies</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of the latest and upcoming movies. Use the search below to find your next favorite film.
        </p>
        {/* <Button onClick={handleInsert}>Upload Data</Button> */}
      </div>
      <SearchableMovieList movies={allMovies} />
    </main>
  );
}
