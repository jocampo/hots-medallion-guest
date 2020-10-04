import { Container } from 'bloomer/lib/layout/Container';
import React from 'react';
import './home.scss';

class HomeComponent extends React.Component {
    render() {
        return (
            <Container className="home-wrapper">
                <div className="title-wrapper">
                    <span>HotS Medallion</span>
                    <span>Tracker</span>
                </div>
                <div className="form-wrapper">BattleTag/Name</div>
            </Container>
        );
    }
}

export default HomeComponent;
