import { EmojiEmotions } from '@mui/icons-material';
import { useState, useEffect } from 'react';
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
    const [incommingMessages, setIncommingMessages] = useRecoilState<string>(IncommingMessagesAtom);

    const [isConnected, setIsConnected] = useState(socket.connected);

        useEffect(() => {
            function onConnect() {
                console.log('connected');
                setIsConnected(true);
            }

            function onDisconnect() {
                setIsConnected(false);
            }
            
            function onMessage(data:any){
                setIncommingMessages(data);
            }
                socket.on('connect', onConnect);
                socket.on('disconnect', onDisconnect);
                socket.on('message',onMessage);

            return () => {
                socket.off('connect', onConnect);
                socket.off('disconnect', onDisconnect);
            };
        }, [setIncommingMessages]);
    return (
        <div className="bg-chat h-[80vh] rounded-r-2xl rounded-l-none flex flex-col">
            <Header />
            <div className="flex-1 overflow-auto mt-1">
                    <div className='border-2 bg-green-300 rounded-lg ml-96 mr-12 mb-1 py-6 text-gray-500'>{incommingMessages}</div>
            </div>
            <Footer socket={socket} setOutgoingMessages={setOutgoingMessages} />
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


function Footer({ socket, setOutgoingMessages }: { socket: Socket, setOutgoingMessages: SetOutgoingMessagesFunction  }) {
    const [inputValue, setInputValue] = useState<string>('');

    const handleSendMessage = () => {
        if (socket&&socket.connected){
            socket.send(inputValue);
            setOutgoingMessages((prev)=>[...prev,inputValue]);
            setInputValue("");
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
