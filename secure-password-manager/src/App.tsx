import Home from "./pages/Home";
import {Box, ChakraProvider} from "@chakra-ui/react";
import {Route} from "wouter";
import {invoke} from '@tauri-apps/api/tauri'
import Login from "./pages/Login";
import theme from "./components/theme";
import Welcome from "./pages/Welcome";
import {WindowBar} from "./components/WindowBar";
import Passwords from "./pages/Passwords";
import {isPermissionGranted, requestPermission} from "@tauri-apps/api/notification";

document.addEventListener('DOMContentLoaded', () => {
    // This will wait for the window to load
    setTimeout(() => {
        invoke('close_splashscreen').catch(e => console.log(e));
    }, 100)
})

async function setupNotifications() {
    if (!await isPermissionGranted()) {
        // Broken Might Fix
        const permissions = await requestPermission();
        console.log(permissions);
        return(permissions);
    }
}

function App() {
    // setupNotifications().then(res => console.log(res));
    // sendNotification("test");
    return (
        <ChakraProvider theme={theme}>
            <WindowBar/>
            <Box bgGradient="linear(to-tr, #283048, #859398)" width="100vw" height="100vh" paddingTop={"50px"}>
                <Route path="/" component={Passwords}/>
                <Route path="/home" component={Home}/>
                <Route path="/welcome" component={Welcome}/>
                <Route path="/passwords" component={Passwords}/>
                <Route path="/login" component={Login}/>
            </Box>
        </ChakraProvider>
    )
}

export default App
