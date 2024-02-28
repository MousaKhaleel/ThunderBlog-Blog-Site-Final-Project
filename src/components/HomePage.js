import Blog from "./Blog";
import HeroSection from "./HeroSection";

function HomePage() {
    return ( 
        <div>
        <HeroSection />
        <main>
        <Blog />
        <Blog />
        <Blog />
        </main>
        </div>
     );
}

export default HomePage;