import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import LinkForm from "../components/LinkForm.js";
import RequireAuth from "../components/RequireAuth.js";

function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <RequireAuth>
                <LinkForm />
            </RequireAuth>
            <Footer />
        </div>
    )
}

export default HomePage;