import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

export interface GeneralState {
    isLoginOpen: boolean
    isEditProfileOpen: boolean
    selectedPosts: null
    ids: null
    posts: null
}

// export interface GeneralActions {
//     setisLoginOpen(:)
//     setisEditProfileOpen(:)
//     setselectedPosts(:)
//     setids(:)
//     setposts(:)
// }