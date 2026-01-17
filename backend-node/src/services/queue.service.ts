import { pdfQueue } from "../lib/bullmq.ts";

export const addPdfJob = async (bookId: string, fileUrl: string) => {
  // We add a job to the 'pdf-processing-queue'
  await pdfQueue.add("process-pdf", {
    bookId,
    fileUrl,
  }, {
    attempts: 3,       // If Python fails, retry 3 times
    backoff: 5000,     // Wait 5s before retrying
    removeOnComplete: true // Auto-delete job after success
  });
  
  console.log(`Job added to queue for book: ${bookId}`);
};