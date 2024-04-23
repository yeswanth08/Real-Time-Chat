/**
 * high level --> it has all the conversation list 
 *
 */
import "../index.css";
import { useRecoilState } from "recoil";
import { OutgoingMessages as OutgoingMessagesAtom} from "../store/atoms/Atoms";



export default function ConversationList() {
    const [outgoingMessages, setOutgoingMessages] = useRecoilState<string[]>(OutgoingMessagesAtom);

    return (
        <div className="conversation-list-container border-gray-200 border-r-2 h-[80vh] rounded-l-2xl rounded-r-none flex flex-col overflow-hidden">
            <Header />
            <div className="conversation-list flex-1 overflow-auto mt-2 px-4">
                {outgoingMessages.map((message, index) => (
                    <div key={index} className="message mb-1 max-w-[calc(100%-64px)] mr-32 break-words border-2 bg-green-300 rounded-lg">{message}</div>
                ))}
            </div>
        </div>
    );
}

function Header() {
    return (
        <div className="conversation-header bg-gray-100 h-16 rounded-l-lg flex items-center px-4">
            <img className="w-16 rounded-full" src="https://avatar.iran.liara.run/public" alt="User" />
        </div>
    );
}










