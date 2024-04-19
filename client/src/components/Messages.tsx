import Header from "./Header"
import Footer from "./Footer"

export default function App(){
    return (
        <div className="bg-chat h-[80vh] rounded-r-2xl rounded-l-none flex flex-col">
            <Header />
            <div className="flex-1 overflow-auto">
                
            </div>
            <Footer />
        </div>
    );
    
}