export function Footer() {
  return (
    <footer className="bg-card border-t mt-auto py-6">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} All Movies Download. All rights reserved.</p>
        <p className="mt-1">All Movie Reviewed.</p>
      </div>
    </footer>
  );
}
