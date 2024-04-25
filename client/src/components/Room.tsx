import { memo, useCallback, useEffect, useState } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { JwtPayload } from 'jsonwebtoken';
import { Username } from '../store/atoms/Atoms';
import cookie from 'js-cookie';
import '../index.css';
import axios from 'axios';

export default function App() {
    const navigate = useNavigate();

    const authenticate = useCallback(async () => {
        const token = await cookie.get('jwt');
        if (!token) navigate('/');
    }, [navigate]);

    useEffect(() => {
        authenticate();
    }, [authenticate]);

    return (
        <Display>
            <Appbar/>
        </Display>
    );
}

const Display = memo(function Display({ children }) {
    return (
        <div className='h-screen'>
            {children}
        </div>
    );
});

const Appbar = memo(function Appbar() {
    return (
        <div className='bg-green-600 h-48'>
            <div className='text-white text-xl pt-8 pl-28'>
                <WhatsAppIcon /> Bhashan Web
            </div>
            <center>
                <Card />
            </center>
        </div>
    );
});

const Card = memo(function Card() {

    const payload = useRecoilValue<JwtPayload>(Username);
    const [userid, setuserid] = useState<string>('');
    const navigate =  useNavigate();

    const handleCopyClick = () => {
        navigator.clipboard.writeText(payload.userid)
            .then(() => {
                window.alert('User ID copied to clipboard');
            })
            .catch((error) => {
                console.error('Failed to copy user ID to clipboard:', error);
            });
    };

    const handleconnection = async()=>{
        const users = {
            user1: userid,
            user2: payload.userid
        }
        const roomtoken = await axios.post('http://localhost:9000/chat-api/',{users:users});
        if (roomtoken.status===200) navigate('/');
        else window.alert('enter the correct id');
    }

    return (
        <div className='bg-white mt-6 pt-6 mx-32 h-96 rounded-lg shadow-2xl border border-gray-200 flex justify-between'>
            <center className='ml-72 my-12'>
                <div className='border-2 w-96 shadow-xl rounded-sm'>
                    <div className='mr-32 my-2'>
                            Hello... {payload.username} <br />
                    </div>
                    <input
                        type="text"
                        className='border-2 rounded-lg border-gray-400 hover:border-green-500 px-4'
                        value={payload.userid}
                        readOnly 
                    />
                    <button
                        onClick={handleCopyClick}
                        className='border-1 ml-2 border-gray-400 bg-green-500 hover:bg-green-400 rounded-lg text-white px-2 pb-1 mb-4'>
                        Copy ID
                    </button>
                    <input
                        type="text"
                        placeholder='Enter the id'
                        className='border-2 rounded-lg mb-4 border-gray-400 hover:border-green-500 px-10'
                        value={userid} 
                        onChange={(e) => setuserid(e.target.value)} 
                    />  <br />
                    <button className='bg-green-500 border-2 border-gray-500 hover:bg-green-400 rounded-xl text-white px-10 mb-2 pb-1' onClick={handleconnection}>connect</button>
                </div>
            </center>
        </div>
    );
});
