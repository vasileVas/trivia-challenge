import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    public render() {
        return (
            <div className="header">
                <nav>
                    <div className="nav-wrapper">
                        <Link to="/" className="brand-logo">
                            <h1>Trivia Challenge</h1>
                        </Link>
                        <ul
                            id="nav-mobile"
                            className="right hide-on-med-and-down"
                        >
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}
