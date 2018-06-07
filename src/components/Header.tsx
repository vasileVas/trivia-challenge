import * as React from 'react';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../stores/TriviaStore';

export default class Header extends React.Component {
    public render() {
        return (
            <div className="header">
                <nav>
                    <div className="nav-wrapper">
                        <Link to={HOME_ROUTE} className="brand-logo">
                            <h1>Trivia Challenge</h1>
                        </Link>
                    </div>
                </nav>
            </div>
        );
    }
}
