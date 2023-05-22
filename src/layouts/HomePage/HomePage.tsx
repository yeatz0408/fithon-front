import { useOktaAuth } from "@okta/okta-react"
import { Carousel } from "./components/Carousel"
import { ExploreTopBooks } from "./components/ExploreTopBooks"
import { Heroes } from "./components/Heroes"
import { LibraryServices } from "./components/LibraryServices"

export const HomePage = () => {

    const { authState } = useOktaAuth();

    if (authState && authState.isAuthenticated === false) {
        alert("是非ログインして全ての機能を確認してください！" +
            "\n\nテストID\n" +
            "ID: testuser5@email.com \n" +
            "PW: testtest11");    
    }

    return (
        <div>
            <ExploreTopBooks />
            <Carousel />
            <Heroes />
            {/* <LibraryServices /> */}
        </div>
    )
}