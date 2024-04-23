import { atom } from "recoil";

export const IncommingMessages = atom<string[]>({
    key: "IncomingMessages",
    default: []
});

export const OutgoingMessages = atom<string[]>({
    key: "OutgoingMessages",
    default: []
});


export const Username = atom<string>({
    key: "Username",
    default: ""
})