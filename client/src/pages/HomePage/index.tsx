import {useAtomValue} from "jotai";
import { userAtom } from "../../atoms/userAtom.ts";

function Home (){
    const userData = useAtomValue(userAtom);


    // if (randomMutation.isLoading) return <PageLoader />

    return (
        <div>
            <h2>Benvenuto {userData.name.substring(0,1).toUpperCase() + userData.name.substring(1, userData.name.length).toLowerCase()}</h2>
        </div>
    )
}

export default Home;