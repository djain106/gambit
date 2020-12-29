import { createContext, useContext } from "react";

export const UserContext = createContext({ user: {}, setUser: () => { } });

export function useUser() {
    return useContext(UserContext);
}