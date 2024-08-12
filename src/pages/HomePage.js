import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import Home from "../components/Home.js";

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