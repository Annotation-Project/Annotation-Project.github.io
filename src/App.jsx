import React from 'react';
import './App.css';
import { Header } from './components/Header';
import { Main } from './components/Main';

export const App = () => {
    const mainComponentRef = React.useRef(null);

    return (
        <div className="screen">
            <Header reset={() => mainComponentRef.current.reset()} downloadJSON={() => mainComponentRef.current.downloadJSON()} downloadTXT={() => mainComponentRef.current.downloadTXT()} />
            <Main ref={mainComponentRef} />
        </div>
    )
}

