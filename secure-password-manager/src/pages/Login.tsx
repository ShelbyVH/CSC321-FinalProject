import {useUser} from 'use-supabase'
import LoginForm from "../components/LoginForm";
import Home from "./Home";

export default function Login() {
    const user = useUser()

    if (user) {
        return <Home/>
    }

    return <LoginForm/>;
}
