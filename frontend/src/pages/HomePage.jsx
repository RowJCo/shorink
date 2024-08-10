import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../components/Home";

function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            < Home />
            <Footer />
        </div>
    )
}

export default HomePage;