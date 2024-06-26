/**
 * high level --> we have whatsapp web login
 */

import { memo,useState } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatImage from '../assets/chat.png';
import cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import '../index.css';
import { Username } from '../store/atoms/Atoms';
import { JwtPayload } from 'jsonwebtoken';

export default function App(){
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

    const [username,setusername] = useState<string>('');
    const [password,setpassword] = useState<string>('');
    const [payload,setpayload] = useRecoilState<JwtPayload>(Username);

    const navigate = useNavigate();

    const authenticate = async()=>{
        try{
            const user:{username:string,password:string} = {username,password};
            const res = await axios.post('http://localhost:9000/create-api/',user,{withCredentials: true});
        
            if (res.status===404) throw new Error(res.data)
                
            else{
                await cookies.set('jwt',res.data.msg);
                const paresedresponse = await axios.post('http://localhost:9000/parse-api/',{token: res.data.msg});
                await setpayload(paresedresponse.data.msg);
                navigate('/room');
            }
        }catch(err){
            window.alert(`${err}`);
        }
    }

    return(
        <div className='bg-white mt-6 pt-6 mx-32 h-96 rounded-lg shadow-2xl border border-gray-200 flex justify-between'>
            <div className='mx-16 mt-14'>
                <h4>Enter the Credentials to create account</h4><br />
                <input type="text" placeholder='username'className='border-2 border-gray-500 rounded-lg hover:border-green-200 h-8 p-2 mb-2' onChange={(e)=>setusername(e.target.value)}/> <br />
                <input type="text" placeholder='password' className='border-2 border-gray-500 rounded-lg mt-2 hover:border-green-200 h-8 p-2 mb-2' onChange={(e)=>setpassword(e.target.value)}/> <br />
                <button className='border-2 border-gray-100 rounded-xl  w-24 h-8 mt-2 text-white bg-green-500 hover:cursor-progress hover:bg-green-400' onClick={authenticate}>Create</button>
                <div className='hover:text-green-500 hover:cursor-pointer mt-1' onClick={()=>navigate('/login')}>Already have an account ? click here </div>
            </div>
            <div className='w-96 mr-32 mt-6'>
                <img src={ChatImage} alt="Img-Chat" />
            </div>
        </div>
    )
})


