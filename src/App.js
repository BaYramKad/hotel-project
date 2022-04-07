import React, { useContext } from 'react';
import './App.css';
import {Context} from './index'

function App(){
    const value = useContext(Context)
    console.log('db: ', value);
    return (
        <div className="App">
            3213
        </div>
    );
}

export default App;
