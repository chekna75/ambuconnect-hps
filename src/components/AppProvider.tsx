import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner"; // Import the Toaster component

interface Props {
  children: ReactNode;
}

/**
 * A provider wrapping the whole app.
 *
 * You can add multiple providers here by nesting them,
 * and they will all be applied to the app.
 */
export const AppProvider = ({ children }: Props) => {
  return (
    <>
      {children}
      <Toaster richColors closeButton /> {/* Add Toaster here */}
    </>
  );
};