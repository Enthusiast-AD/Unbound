import { createUploadthing, type FileRouter } from "uploadthing/express";

const f = createUploadthing();

// 1. Define the FileRouter
export const uploadRouter = {
  // Define a route named "pdfUploader"
  pdfUploader: f({
    pdf: {
      maxFileSize: "32MB",
      maxFileCount: 1,
    },
  })
    // 2. Set permissions (optional)
    .middleware(async ({ req, res }) => {
      // Logic to verify user (e.g., check Clerk token)
      // For now, we'll just return a mock ID
      return { userId: "mock-user-id" };
    })
    // 3. What to do after upload finishes
    .onUploadComplete(async ({ metadata, file }) => {
      // This runs on server
      console.log("✅ Upload complete for userId:", metadata.userId);
      console.log("📂 File URL:", file.url);
      console.log("🔑 File Key:", file.key);

      // Return data to the client
      return { uploadedBy: metadata.userId, fileUrl: file.url, fileKey: file.key };
    }),
} satisfies FileRouter;

// Export the type so the frontend can use it (optional)
export type OurFileRouter = typeof uploadRouter;