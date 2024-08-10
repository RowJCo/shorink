import Header from "../components/Header";
import SignUpForm from "../components/SignUpForm";
import Footer from "../components/Footer";


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