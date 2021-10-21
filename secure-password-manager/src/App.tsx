import Home from "./pages/Home";
import {ChakraProvider} from "@chakra-ui/react";
import {Route} from "wouter";
import {invoke} from '@tauri-apps/api/tauri'

document.addEventListener('DOMContentLoaded', () => {
    // This will wait for the window to load
    setTimeout(() => {
        invoke('close_splashscreen')
    }, 5000)
})


function App() {
    return (
        <ChakraProvider>
            <Route path="/" component={Home}/>
        </ChakraProvider>
    )
}

export default App
