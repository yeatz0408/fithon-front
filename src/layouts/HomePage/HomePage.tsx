import { Carousel } from "./components/Carousel"
import { ExploreTopBooks } from "./components/ExploreTopBooks"
import { Heroes } from "./components/Heroes"
import { LibraryServices } from "./components/LibraryServices"

export const HomePage = () => {
    return (
        <div>
            <ExploreTopBooks />
            <Carousel />
            <Heroes />
            {/* <LibraryServices /> */}
        </div>
    )
}