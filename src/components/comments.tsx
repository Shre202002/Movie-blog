'use client';

import { submitComment } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Comment } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';
import { useRef, useTransition } from 'react';

export function Comments({
  movieId,
  comments,
}: {
  movieId: string;
  comments: Comment[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleFormSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const { success, message } = await submitComment(movieId, formData);
      if (success) {
        toast({
          title: 'Success',
          description: message,
        });
        formRef.current?.reset();
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: message,
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leave a Review</CardTitle>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={handleFormSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Your name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="comment">Comment</Label>
            <Textarea
              id="comment"
              name="comment"
              placeholder="Write your review..."
              required
            />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>

        <div className="mt-8 space-y-6">
          <h3 className="text-xl font-semibold">
            {comments.length} Reviews
          </h3>
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{comment.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(comment.createdAt, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {comment.comment}
                </p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-sm text-muted-foreground">No reviews yet. Be the first to write one!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
