import { EmojiEmotions } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Box, styled, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { OutgoingMessages as OutgoingMessagesAtom, IncommingMessages as IncommingMessagesAtom } from "../store/atoms/Atoms";
import { useRecoilState } from 'recoil';
import '../index.css';

type SetOutgoingMessagesFunction = (prevMessages: string[]) => string[];

export default function App() {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [outgoingMessages, setOutgoingMessages] = useRecoilState<string[]>(OutgoingMessagesAtom);
    const [incommingMessages, setIncommingMessages] = useRecoilState<string[]>(IncommingMessagesAtom);

    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:9000');
        newSocket.onopen = () => {
            console.log('Connection established');
        };
        newSocket.onmessage = (message) => {
            console.log('Message received:', message.data);
            setIncommingMessages((prevMessages) => [...prevMessages, message.data]);
            console.log(message);
        };
        setSocket(newSocket);
    }, [setIncommingMessages]);

    return (
        <div className="bg-chat h-[80vh] rounded-r-2xl rounded-l-none flex flex-col">
            <Header />
            <div className="flex-1 overflow-auto mt-1">
                {incommingMessages.map((message, index) => (
                    <div key={index} className='border-2 bg-green-300 rounded-lg ml-96 mb-1 text-gray-500'>{message}</div>
                ))}
            </div>
            <Footer socket={socket} setOutgoingMessages={setOutgoingMessages} />
        </div>
    );
}

function Header() {
    return (
        <div className="bg-gray-100 h-16">
            {/* Add sender pic and video call option */}
        </div>
    );
}


function Footer({ socket, setOutgoingMessages }: { socket: WebSocket | null, setOutgoingMessages: SetOutgoingMessagesFunction  }) {
    const [inputValue, setInputValue] = useState<string>('');

    const handleSendMessage = () => {
        if (socket) {
            setOutgoingMessages((prevMessages) => [...prevMessages, inputValue]);
            socket.send(inputValue);
            setInputValue('');
        }
    };


    return (
        <Container>
            <EmojiEmotions />
            <Search>
                <InputField
                    placeholder="Type a message"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
            </Search>
            <button className="px-8" onClick={handleSendMessage}>
                <SendIcon />
            </button>
        </Container>
    );
}

const Container = styled(Box)`
    height: 55px;
    background: #ededed;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 4px;
    &  > * {
        margin: 5px;
        color: #919191;
    }
`;

const Search = styled(Box)`
    border-radius: 18px;
    background-color: #FFFFFF;
    width: calc(94% - 100px);
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 20px;
    padding-left: 25px;
    font-size: 14px;
    height: 20px;
    width: 100%;
`;
