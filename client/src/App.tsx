import { Suspense, lazy } from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";

const Weblogin = lazy(()=>import('./components/Weblogin'));
const Dashboard = lazy(()=>import('./components/Dashboard'));
const Signup = lazy(()=>import('./components/Signup'));

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Suspense fallback={<div>loading...</div>}><Signup/></Suspense>}/>
                <Route path="/login" element={<Suspense fallback={<div>loading...</div>}><Weblogin/></Suspense>}/>
                <Route path="/" element={<Suspense fallback={<div>loading...</div>}><Dashboard/></Suspense>}/>
            </Routes>
        </BrowserRouter>
    )
}