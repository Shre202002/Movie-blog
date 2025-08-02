'use server';

import { detectSpam } from '@/ai/flows/detect-spam';
import { db } from '@/lib/firebase';
import { revalidatePath } from 'next/cache';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export async function submitComment(
  movieId: string,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  const name = formData.get('name') as string;
  const comment = formData.get('comment') as string;

  if (!name || !comment) {
    return { success: false, message: 'Name and comment are required.' };
  }

  try {
    const { isSpam } = await detectSpam({ comment });
    if (isSpam) {
      return { success: false, message: 'Spam detected. Comment not posted.' };
    }

    await addDoc(collection(db, 'comments'), {
      movieId,
      name,
      comment,
      createdAt: serverTimestamp(),
    });

    revalidatePath(`/movies/${movieId}`);
    return { success: true, message: 'Comment posted successfully!' };
  } catch (error) {
    console.error('Error submitting comment:', error);
    return { success: false, message: 'Failed to post comment.' };
  }
}
