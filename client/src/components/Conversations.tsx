/**
 * high level --> it has all the conversation list 
 *
 */
import "../index.css";
import { useRecoilState } from "recoil";
import { OutgoingMessages as OutgoingMessagesAtom,Username as usernameAtom} from "../store/atoms/Atoms";
import { JwtPayload } from "jsonwebtoken";


export default function ConversationList() {
    const [outgoingMessages, setOutgoingMessages] = useRecoilState<string[]>(OutgoingMessagesAtom);
    const [username,setusername] = useRecoilState<JwtPayload>(usernameAtom);

    return (
        <div className="conversation-list-container border-gray-200 border-r-2 h-[80vh] rounded-l-2xl rounded-r-none flex flex-col overflow-hidden">
            <Header username={username}/>
            <div className="conversation-list flex-1 overflow-auto mt-2 px-4">
                {outgoingMessages.map((message, index) => (
                    <div key={index} className="message mb-1 max-w-[calc(100%-64px)] mr-40 break-words border-2 py-6  bg-green-300 rounded-lg">{message}</div>
                ))}
            </div>
        </div>
    );
}

function Header({username}:{username: JwtPayload}) {
    return (
        <div className="conversation-header bg-gray-100 h-16 rounded-l-lg flex items-center px-4">
            <img className="w-16 mr-10 rounded-full" src="https://avatar.iran.liara.run/public/girl" alt="User" /> <br />
           <p className="text-green-400"> hello...{username.username}</p> 
        </div>
    );
}










