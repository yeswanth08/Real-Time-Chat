import { EmojiEmotions } from '@mui/icons-material';
import { useState, useEffect,useRef } from 'react';
import { Box, styled, InputBase } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { OutgoingMessages as OutgoingMessagesAtom, IncommingMessages as IncommingMessagesAtom } from "../store/atoms/Atoms";
import { useRecoilState } from 'recoil';
import { socket } from './socket';
import { Socket } from 'socket.io-client';
import '../index.css';


type SetOutgoingMessagesFunction = (prevMessages: string[]) => string[];

export default function App() {
    const [outgoingMessages, setOutgoingMessages] = useRecoilState<string[]>(OutgoingMessagesAtom);
    const [incomingMessages, setIncomingMessages] = useRecoilState<string[]>(IncommingMessagesAtom);

    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            console.log('connected');
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }
        
        function onMessage(data: any) {
            setIncomingMessages((prev) => [...prev, data]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('message', onMessage);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
        };
    }, [setIncomingMessages]);

    return (
        <div className="bg-chat h-[80vh] rounded-r-2xl rounded-l-none flex flex-col">
            <Header />
            <Display incomingMessages={incomingMessages} />
            <Footer socket={socket} setOutgoingMessages={setOutgoingMessages} />
        </div>
    );
}

function Display({ incomingMessages }: { incomingMessages: string[] }) {
    const [lastDisplayedIndex, setLastDisplayedIndex] = useState(-1);
    const conversationListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (conversationListRef.current) {
            conversationListRef.current.scrollTop = conversationListRef.current.scrollHeight;
        }
    }, [incomingMessages]);

    useEffect(() => {
        const displayTimer = setTimeout(() => {
            if (incomingMessages.length > lastDisplayedIndex + 1) {
                setLastDisplayedIndex((prev) => prev + 1);
            }
        }, 100); 

        const removeTimer = setTimeout(() => {
            if (incomingMessages.length > 0 && lastDisplayedIndex > -1) {
                setLastDisplayedIndex((prev) => prev - 1);
            }
        }, 5); 

        return () => {
            clearTimeout(displayTimer);
            clearTimeout(removeTimer);
        };
    }, [incomingMessages, lastDisplayedIndex]);

    return (
        <div ref={conversationListRef} className="conversation-list-container flex-1 overflow-auto mt-1">
            {incomingMessages.length > 0 &&
                incomingMessages.slice(0, lastDisplayedIndex + 1).map((message, index) => (
                    <div key={index} className="conversation-list message ml-96 mr-12 mb-1 max-w-[calc(100%-64px)]  break-words border-2 py-6  bg-green-300 rounded-lg">{message}</div>
                ))}
        </div>
    );
}


function Header() {
    return (
        <div className="bg-gray-100 h-16 flex flex-col-1">
            <img src="https://avatar.iran.liara.run/public/boy" alt="sender" className='w-16 mx-12 rounded-full'/>
            <p className='text-green-400 py-4'>Anonymous Receiver</p>
        </div>
    );
}

function Footer({ socket, setOutgoingMessages }: { socket: Socket, setOutgoingMessages: SetOutgoingMessagesFunction }) {
    const [inputValue, setInputValue] = useState<string>('');

    const handleSendMessage = () => {
        if (socket && socket.connected) {
            socket.send(inputValue);
            setOutgoingMessages((prev) => [...prev, inputValue]);
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
