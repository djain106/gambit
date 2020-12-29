import { createContext, useContext } from "react";

export const AuthContext = createContext({ authToken: "", setAuthCookie: () => { } });

export function useAuth() {
    return useContext(AuthContext);
}