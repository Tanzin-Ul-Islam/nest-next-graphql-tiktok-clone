import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface User {
    id?: any
    fullname: string
    email: string
    bio: string
    image: ""
}

export interface UserActions {
    setUser: (user: User) => void
    logout: () => void
}

export const useUserStore = create<User & UserActions>()(
    devtools(
        persist(
            (set) => ({
                id: undefined,
                fullname: "",
                email: "",
                bio: "",
                image: "",

                setUser: (user) => {
                    set({ ...user })
                },
                logout: () => {
                    set({
                        id: undefined,
                        fullname: "",
                        email: "",
                        bio: "",
                        image: "",
                    })
                }

            }),
            {
                name: "user-storage"
            }
        )
    )
)