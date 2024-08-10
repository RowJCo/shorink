import Header from "../components/Header";
import SignInForm from "../components/SignInForm";  
import Footer from "../components/Footer";


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