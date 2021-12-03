import '../styles/WindowBar.css'
import {appWindow} from '@tauri-apps/api/window'
import {
    FaRegWindowMaximize,
    FaRegWindowRestore,
    FaTimes,
    FaWindowMinimize,
    FaEdit,
    FaMemory,
    FaPaw, FaRobot
} from "react-icons/fa";
import {useEffect, useState} from "react";
import Lock from "../images/Lock.svg";
import {Box, IconButton, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';
import {useLocation} from 'wouter';


export function WindowBar() {
    const [isMax, setMax] = useState(false);
    let isMaxTimer: NodeJS.Timer;
    useEffect(() => {
        async function getMaximized() {
            const windowStatus = await appWindow.isMaximized()
            setMax(windowStatus);
        }

        isMaxTimer = setInterval(getMaximized, 250);
    }, []);

    const [location, setLocation] = useLocation();

    return (
        <div data-tauri-drag-region="true" className="titlebar">
            <Box p={1}>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        aria-label='Options'
                        bg={"#1A202C"}
                        icon={<img src={Lock} alt="logo" className="titlebar-logo"/>}
                        variant='outline'
                    />
                    <MenuList>
                        <MenuItem icon={<FaRobot/>} command='⌘T' onClick={() => setLocation("/home")}>
                            New Tab
                        </MenuItem>
                        <MenuItem icon={<FaPaw/>} command='⌘N' onClick={() => setLocation("/welcome")}>
                            New Window
                        </MenuItem>
                        <MenuItem icon={<FaMemory/>} command='⌘⇧N' onClick={() => setLocation("/login")}>
                            Open Closed Tab
                        </MenuItem>
                        <MenuItem icon={<FaEdit/>} command='⌘O' onClick={() => setLocation("/passwords")}>
                            Open File...
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Box>
            <div className="titlebar-buttons">
                <div className="titlebar-button" id="titlebar-minimize" onClick={() => {
                    appWindow.minimize().catch(e => console.log(e));
                }}>
                    <FaWindowMinimize/>
                </div>
                <div className="titlebar-button" id="titlebar-maximize" onClick={() => {
                    appWindow.toggleMaximize().catch(e => console.log(e));
                }}>
                    {isMax ?
                        <FaRegWindowRestore/>
                        : <FaRegWindowMaximize/>
                    }

                </div>
                <div className="titlebar-button" id="titlebar-close" onClick={() => {
                    clearInterval(isMaxTimer);
                    appWindow.close().catch(e => console.log(e));
                }}>
                    <FaTimes/>
                </div>
            </div>
        </div>
    )
}