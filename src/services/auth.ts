import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export type AuthError = "INVALID_CREDENTIALS" | "USER_DISABLED";

export type AuthResult =
  | { success: true }
  | { success: false; error: AuthError };

export async function signIn(
  email: string,
  password: string
): Promise<AuthResult> {
  return signInWithEmailAndPassword(auth, email, password)
    .then(() => ({ success: true as const }))
    .catch((error) => {
      if (error.code === "auth/user-disabled") {
        return {
          success: false as const,
          error: "USER_DISABLED",
        };
      }

      return {
        success: false as const,
        error: "INVALID_CREDENTIALS",
      };
    });
}
