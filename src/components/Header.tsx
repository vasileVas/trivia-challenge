import * as React from 'react';
import { Link } from 'react-router-dom';
import { HOME_ROUTE } from '../stores/TriviaStore';
import styled from 'styled-components';

const Nav = styled.nav`
    h1 {
        font-size: 35px;
        line-height: 10px;
    }
`;

export default class Header extends React.Component {
    public render() {
        return (
            <div className="header">
                <Nav>
                    <div className="nav-wrapper">
                        <Link to={HOME_ROUTE} className="brand-logo center">
                            <h1>Trivia Challenge</h1>
                        </Link>
                    </div>
                </Nav>
            </div>
        );
    }
}
