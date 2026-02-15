import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { CollaboratorForm } from "../pages/NewCollaborator";

export type CreateCollaboratorResult =
  | { success: true }
  | { success: false; error: "UNKNOWN_ERROR" };

export async function createCollaborator(
  data: CollaboratorForm,
): Promise<CreateCollaboratorResult> {
  return addDoc(collection(db, "collaborators"), {
    ...data,
    createdAt: serverTimestamp(),
  })
    .then(() => ({ success: true as const }))
    .catch(() => ({
      success: false as const,
      error: "UNKNOWN_ERROR",
    }));
}
