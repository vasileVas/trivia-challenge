import * as React from 'react';
import './App.css';

import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import HomeScreen from './components/HomeScreen';
import PlayScreen from './components/PlayScreen';
import ScoreScreen from './components/ScoreScreen';

class App extends React.Component {
    public render() {
        return (
            <Router>
                <div className="App">
                    <header className="App-header">
                        <Link to="/">Home</Link> |
                        <Link to="/play">Play</Link> |
                        <Link to="/score">Score</Link>
                    </header>

                    <Route exact path="/" component={HomeScreen} />
                    <Route path="/play" component={PlayScreen} />
                    <Route path="/score" component={ScoreScreen} />
                </div>
            </Router>
        );
    }
}

export default App;
