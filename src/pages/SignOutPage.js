import { useEffect } from "react";
import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import userStore from "../stores/userStore.js";

function SignOutPage() {
    const store = userStore();
    useEffect(() => {
        store.signOut();
        
    }, []);

    return (
        
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-col flex-grow gap-5 self-center py-5 text-gray-800 mx-auto flex-1">
                <p className="text-center text-2xl font-bold mt-10">You are now logged out</p>
            </div>
            
            <Footer />
        </div>
        
    )
}

export default SignOutPage;