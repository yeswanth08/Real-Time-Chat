import { memo, useEffect } from "react";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LogoutIcon from '@mui/icons-material/Logout';
import Conversations from "./Conversations";
import { useNavigate } from 'react-router-dom';
import Messages from "./Messages";
import cookies from 'js-cookie'; 
import "../index.css";

export default function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const authenticate = async () => {
            try {
                const token = cookies.get('jwt'); 
                if (!token) navigate('/login');
            } catch (err) {
                navigate('/login');
            }
        };
        authenticate();
    }, [navigate]);

    return (
        <Display>
            <Appbar />
        </Display>
    );
}

// Child components

const Display = memo(function Display({ children }) {
    return (
        <div className="h-screen">
            {children}
        </div>
    );
});

const Appbar = memo(function Appbar() {
    return (
        <div className='bg-green-600 h-48'>
            <div className='text-white text-xl pt-8 pl-28 flex justify-between'>
                <div><WhatsAppIcon /> Bhashan Web</div>
                <button className="mx-32 hover:bg-rose-400 rounded-2xl w-16 px-6 pb-1 hover:cursor-progress"><LogoutIcon /></button>
            </div>
            <center>
                <Card />
            </center>
        </div>
    );
});

const Card = memo(function Card() {
    return (
        <div className='bg-white mt-4 mx-24 h-[80vh] rounded-2xl shadow-2xl border border-gray-200 flex'>
            <div className="flex-none w-1/3"><Conversations /></div>
            <div className="flex-1"><Messages /></div>
        </div>
    );
});
