"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getGuestSession } from "../services/auth/getGuestSession";

// Define the context type
interface GuestSessionContextType {
  guestSessionId: string | null;
  setGuestSessionId: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with a default value
const GuestSessionContext = createContext<GuestSessionContextType>({
  guestSessionId: null,
  setGuestSessionId: () => {},
});

export const GuestSessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [guestSessionId, setGuestSessionId] = useState<string | null>(null);

  const initializeGuestSession = async () => {
    try {
      const data = await getGuestSession();
      if (data.guest_session_id) {
        setGuestSessionId(data.guest_session_id);
      }
    } catch (error) {
      console.error("Failed to initialize guest session:", error);
    }
  };

  useEffect(() => {
    initializeGuestSession();
  }, []);

  return (
    <GuestSessionContext.Provider value = {{ guestSessionId, setGuestSessionId }}>
      {children}
    </GuestSessionContext.Provider>
  );
};

export const useGuestSession = () => useContext(GuestSessionContext);