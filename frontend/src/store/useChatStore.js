import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstant } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try{
            const res = await axiosInstant.get("/messages/users");
            set({ users: res.data });
        }catch(err){
            toast.error(err.response.data.message);
        }finally{
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessageLoading: true });
        try{
            const res = await axiosInstant.get(`/messages/${userId}`);
            set({ messages: res.data });
        }catch(err){
            toast.error(err.response.data.message);
        }finally{
            set({ isMessageLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const {selectedUser, messages} = get();
        try{
            const res = await axiosInstant.post(`/messages/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data]});
        }catch(err){
            toast.error(err.response.data.message);
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessage", (newMessage) => {
            if(newMessage.senderId !== selectedUser._id) return;
            set({
                messages: [...get().messages, newMessage],
            });
        });
    },

    unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");

    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
    
}))