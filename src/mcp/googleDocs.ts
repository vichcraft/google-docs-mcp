import { google } from "googleapis";

export async function getGoogleDoc(docId: string) {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/documents.readonly"],
  });

  const client = await auth.getClient();
  const docs = google.docs({ version: "v1", auth: client });
  const res = await docs.documents.get({ documentId: docId });
  return res.data;
}
