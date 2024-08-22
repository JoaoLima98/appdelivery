import React, { useEffect, useState, useTransition } from "react";
import { UserDatabase } from "@/hooks/useUser";
import useAsyncStorage from "@/hooks/useAsyncStorage";

type AuthContextProps = {
  signIn: (data: Omit<UserDatabase, "password">) => Promise<void>;
  signOut: () => Promise<void>;
  session: any;
};

const AuthContext = React.createContext({} as AuthContextProps);

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
  const { getValue, setValue, removeItem } =
    useAsyncStorage<Omit<UserDatabase, "password">>("session");
  const [session, setSession] = useState<any>();

  useEffect(() => {
    const loadSession = async () => {
      const storedSession = await getValue();

      if (storedSession) {
        setSession(storedSession);
      }
    };

    loadSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (data: Omit<UserDatabase, "password">) => {
          await setValue(data);
          setSession(data);
        },
        signOut: async () => {
          await removeItem();
          setSession(null);
        },
        session: session,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
