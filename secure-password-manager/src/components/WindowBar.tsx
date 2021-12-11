import '../styles/WindowBar.css'
import {appWindow} from '@tauri-apps/api/window'
import {
    FaRegWindowMaximize,
    FaRegWindowRestore,
    FaTimes,
    FaWindowMinimize,
    FaEdit,
    FaMemory,
    FaRobot, FaSignOutAlt
} from "react-icons/fa";
import {useEffect, useState} from "react";
import Lock from "../images/Lock.svg";
import {Box, IconButton, Menu, MenuButton, MenuItem, MenuList} from '@chakra-ui/react';
import {useLocation} from 'wouter';
import {supabase} from "../api/SupabaseClient";
import {useUser} from "use-supabase";


export function WindowBar() {
    const [location, setLocation] = useLocation();
    const [isMax, setMax] = useState(false);
    let isMaxTimer: NodeJS.Timer;
    useEffect(() => {
        async function getMaximized() {
            const windowStatus = await appWindow.isMaximized()
            setMax(windowStatus);
        }

        isMaxTimer = setInterval(getMaximized, 250);
    }, []);

    const SignOut = async function () {
        try {
            let {error} = await supabase.auth.signOut()
            if (error) throw error
        } catch (error: any) {
            alert(error.error_description || error.message)
        }
    }
    const user = useUser()


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
                        <MenuItem icon={<FaEdit/>} command='⌘N' onClick={() => setLocation("/welcome")}>
                            New Window
                        </MenuItem>
                        <MenuItem icon={<FaMemory/>} command='⌘⇧N' onClick={() => setLocation("/login")}>
                            Open Closed Tab
                        </MenuItem>
                        {user ?
                            <MenuItem icon={<FaSignOutAlt/>} onClick={() => {
                                SignOut()
                                setLocation("/")
                            }}>
                                Sign Out
                            </MenuItem> : null}
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