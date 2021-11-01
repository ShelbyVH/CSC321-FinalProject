import Home from "./pages/Home";
import {ChakraProvider} from "@chakra-ui/react";
import {Route} from "wouter";
import {invoke} from '@tauri-apps/api/tauri'
import Login from "./pages/Login";
import theme from "./components/theme";
import Welcome from "./pages/Welcome";
import {WindowBar} from "./components/WindowBar";

document.addEventListener('DOMContentLoaded', () => {
    // This will wait for the window to load
    setTimeout(() => {
        invoke('close_splashscreen').catch(e => console.log(e));
    }, 1000)
})


function App() {
    return (
        <ChakraProvider theme={theme}>
            <WindowBar />
            <Route path="/" component={Login}/>
            <Route path="/home" component={Home}/>
            <Route path="/welcome" component={Welcome} />
        </ChakraProvider>
    )
}

export default App
