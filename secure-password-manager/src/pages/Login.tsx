import {useUser} from 'use-supabase'
import LoginForm from "../components/LoginForm";
import {useLocation} from "wouter";

export default function Login() {
    const [location, setLocation] = useLocation();
    if (useUser()) {
        setLocation("/home")
        // return <Home child={null}/>
    }
    return <LoginForm/>;
}
