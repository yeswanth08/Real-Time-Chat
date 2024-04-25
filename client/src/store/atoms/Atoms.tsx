import { JwtPayload } from "jsonwebtoken";
import { atom } from "recoil";

export const IncommingMessages = atom<string[]>({
    key: "IncomingMessages",
    default: []
});

export const OutgoingMessages = atom<string[]>({
    key: "OutgoingMessages",
    default: []
});


export const Username = atom<JwtPayload>({
    key: "Username",
    default: {}
})


export const Roomid = atom<string>({
    key: 'Roomid',
    default: ''
})