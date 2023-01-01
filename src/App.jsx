import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Main } from './components/Main';

export const App = () => {
    const mainComponentRef = React.useRef(null);
    const [sidebarOpen, setSidebarOpen] = React.useState(true);

    return (
        <div className="screen">
            <Header
                sidebar={sidebarOpen}
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                reset={() => mainComponentRef.current.reset()}
                downloadJSON={() => mainComponentRef.current.downloadJSON()}
                downloadTXT={() => mainComponentRef.current.downloadTXT()} />
            <Main sidebarOpen={sidebarOpen} ref={mainComponentRef} />
        </div>
    )
}

