import React from "react";
import { UserDatabase } from "@/hooks/useUser";
import useAsyncStorage from "@/hooks/useAsyncStorage";

const AuthContext = React.createContext<{
  signIn: (user: Omit<UserDatabase, "password">) => void;
  signOut: () => void;
  session?: Omit<UserDatabase, "password"> | null;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
});

export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [session, setSession, removeSession] = useAsyncStorage("session", null);
  return (
    <AuthContext.Provider
      value={{
        signIn: async (data) => {
          await setSession(data);
        },
        signOut: async () => {
          await removeSession();
        },
        session,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
