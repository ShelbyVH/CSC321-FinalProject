import {supabase} from "../api/SupabaseClient";
import {useLocation} from "wouter";

export default function LogOut() {
    const [location, setLocation] = useLocation();
    const SignOut = async function () {
        try {
            let {error} = await supabase.auth.signOut()
            if (error) throw error
        } catch (error: any) {
            //alert(error.error_description || error.message)
        } finally {
            setLocation("/welcome")
        }
    }
    SignOut();

    return null;
}