import {useLocation} from "wouter";
import {useUser} from "use-supabase";

export default function Security() {
    const [location, setLocation] = useLocation();
    if (!useUser) {setLocation("/")}
    return <h1>Security</h1>;
}