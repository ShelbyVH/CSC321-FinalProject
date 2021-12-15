import Home from "./pages/Home";
import {Box, ChakraProvider} from "@chakra-ui/react";
import {Route} from "wouter";
import {invoke} from '@tauri-apps/api/tauri'
import Login from "./pages/Login";
import theme from "./components/theme";
import Welcome from "./pages/Welcome";
import {WindowBar} from "./components/WindowBar";
import {isPermissionGranted, requestPermission} from "@tauri-apps/api/notification";
import {SupabaseContextProvider} from "use-supabase";
import {supabase} from "./api/SupabaseClient";
import LogOut from "./pages/LogOut";
import PasswordGen from "./pages/user/PasswordGen";
import Security from "./pages/user/Security";
import Settings from "./pages/user/Settings";
import Passwords from "./components/Passwords";

document.addEventListener('DOMContentLoaded', () => {
    // This will wait for the window to load
    setTimeout(() => {
        invoke('close_splashscreen').catch(e => console.log(e));
    }, 2500)
})

async function setupNotifications() {
    if (!await isPermissionGranted()) {
        // Broken Might Fix
        const permissions = await requestPermission();
        console.log(permissions);
        return (permissions);
    }
}

function App() {
    // setupNotifications().then(res => console.log(res));
    // sendNotification("test");
    return (
        <SupabaseContextProvider client={supabase}>
            <ChakraProvider theme={theme}>
                <WindowBar/>
                <Box bgGradient="linear(to-tr, #283048, #859398)" width="100vw" height="100vh" paddingTop={"50px"}>
                    <Route path="/"><LogOut/></Route>
                    <Route path="/welcome"><Welcome/></Route>
                    <Route path="/login"><Login/></Route>
                    <Route path="/logout"><LogOut/></Route>
                    <Route path="/home"><Home child={<Passwords/>}/></Route>
                    <Route path="/home/passwordgen"><Home child={<PasswordGen/>}/></Route>
                    <Route path="/home/security"><Home child={<Security/>}/></Route>
                    <Route path="/home/settings"><Home child={<Settings/>}/></Route>
                </Box>
            </ChakraProvider>
        </SupabaseContextProvider>
    )
}

export default App
