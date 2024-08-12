import Header from "../components/Header.js";
import SignInForm from "../components/SignInForm.js";  
import Footer from "../components/Footer.js";


function SignInPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <SignInForm />
            <Footer />
        </div>
    )
}

export default SignInPage;