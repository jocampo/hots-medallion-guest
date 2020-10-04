import { Container } from 'bloomer/lib/layout/Container';
import React from 'react';
import '../styles/home.scss';

class HomeComponent extends React.Component {
    render() {
        return (
            <Container className="home-wrapper">
                <div className="title-wrapper">
                    <div className="title">
                        <span className="text large">HotS Medallion</span>
                        <span className="text xlarge">Tracker</span>
                    </div>
                </div>
                <div className="form-wrapper">BattleTag/Name</div>
            </Container>
        );
    }
}

export default HomeComponent;
