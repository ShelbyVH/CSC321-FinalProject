import '../styles/WindowBar.css'
import {appWindow} from '@tauri-apps/api/window'
import {FaRegWindowMaximize, FaRegWindowRestore, FaTimes, FaWindowMinimize} from "react-icons/fa";
import {useEffect, useState} from "react";


export function WindowBar(){
    const [isMax, setMax] = useState(true);

    useEffect(() => {
        async function getMaximized() {
            const windowStatus = await appWindow.isMaximized()
            setMax(windowStatus);
        }
        getMaximized().catch(e => console.log(e));
    }, []);

    return (
        <div data-tauri-drag-region="true" className="titlebar">
            {/*<Text>Password Manager</Text>*/}
            <div className="titlebar-button" id="titlebar-minimize">
                <FaWindowMinimize
                    onClick={() => {
                        appWindow.minimize().catch(e => console.log(e));
                    }}
                />
            </div>
            <div className="titlebar-button" id="titlebar-maximize">
                {isMax ?
                    <FaRegWindowRestore
                        onClick={() => {
                            appWindow.toggleMaximize().catch(e => console.log(e));
                            setMax(false);
                        }}
                    />
                    :
                    <FaRegWindowMaximize
                        onClick={() => {
                            appWindow.toggleMaximize().catch(e => console.log(e));
                            setMax(true);
                        }}
                    />
                }

            </div>
            <div className="titlebar-button" id="titlebar-close">
                <FaTimes
                    onClick={() => {
                        appWindow.close().catch(e => console.log(e));
                    }}
                />
            </div>
        </div>
    )
}