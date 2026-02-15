import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { CollaboratorForm } from "../pages/NewCollaborator";

export type CreateCollaboratorResult =
  | { success: true }
  | { success: false; error: "UNKNOWN_ERROR" };

export type UpdateCollaboratorResult =
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

export async function getCollaboratorById(id: string) {
  if (!id) return null;

  const snapshot = await getDoc(doc(db, "collaborators", id));

  if (!snapshot.exists()) return null;

  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}

export async function updateCollaborator(
  id: string,
  data: CollaboratorForm,
): Promise<UpdateCollaboratorResult> {
  if (!id) {
    return { success: false, error: "UNKNOWN_ERROR" };
  }

  return updateDoc(doc(db, "collaborators", id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
    .then(() => ({ success: true as const }))
    .catch(() => ({
      success: false as const,
      error: "UNKNOWN_ERROR",
    }));
}

export async function deleteCollaborator(id: string) {
  if (!id) {
    return { success: false, error: "UNKNOWN_ERROR" };
  }
  return updateDoc(doc(db, "collaborators", id), {
    status: "inactive",
    updatedAt: serverTimestamp(),
  })
    .then(() => ({ success: true as const }))
    .catch(() => ({
      success: false as const,
      error: "UNKNOWN_ERROR",
    }));
}
