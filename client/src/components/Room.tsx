
import { memo, useEffect, useState } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';
import '../index.css';
import { useRecoilState } from 'recoil';
import { Username as UsernameAtom } from '../store/atoms/Atoms';

export default function App(){

    const navigate = useNavigate();

    useEffect(()=>{
        const token = cookie.get('jwt');
        if (!token) navigate('/login');
    },[navigate]);
    return(
            <Display>
                <Appbar/>
            </Display>
    )
}


// child components


const Display = memo(function Display({children}){
    return(
        <div className='h-screen'>
            {children}
        </div>
    )
})

const Appbar = memo(function Appbar(){

    return(
        <div className='bg-green-600 h-48'>
            <div className='text-white text-xl pt-8 pl-28'>
                <WhatsAppIcon/> Bhashan Web
            </div>
            <center>
                <Card/>
            </center>
        </div>
    )
})

const Card = memo(function Card(){

    const [username,setusername] = useRecoilState<string>(UsernameAtom);

    const navigate = useNavigate();

    return(
        <div className='bg-white mt-6 pt-6 mx-32 h-96 rounded-lg shadow-2xl border border-gray-200 flex justify-between'>
            <div>
                
            </div>
        </div>
    )
})


