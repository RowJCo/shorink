import Header from "../components/Header.js";
import SignUpForm from "../components/SignUpForm.js";
import Footer from "../components/Footer.js";


function SignUpPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <SignUpForm />
            <Footer />
        </div>
    )
}

export default SignUpPage;