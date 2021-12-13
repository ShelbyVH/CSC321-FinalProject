import {useLocation} from "wouter";
import {useUser} from "use-supabase";

export default function Settings() {
    const [location, setLocation] = useLocation();
    if (!useUser) {setLocation("/")}
    return <h1>Settings</h1>;
}