// app/actions/validatePasskey.ts
"use server";

export async function validatePasskeyAction(passkey: string): Promise<boolean> {
  if (passkey === process.env.ADMIN_PASSKEY) {
    return true;
  }
  return false;
}
