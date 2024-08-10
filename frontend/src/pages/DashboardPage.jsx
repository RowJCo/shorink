import Header from "../components/Header";
import Footer from "../components/Footer";
import LinkForm from "../components/LinkForm";
import RequireAuth from "../components/RequireAuth";

function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <RequireAuth><LinkForm /></RequireAuth>
            <Footer />
        </div>
    )
}

export default HomePage;