import { Content } from 'bloomer/lib/elements/Content';
import { Container } from 'bloomer/lib/layout/Container';
import { Footer } from 'bloomer/lib/layout/Footer';
import React from 'react';
import './footer.scss';

class FooterComponent extends React.Component {
    render() {
        return (
            <Container className="footer-wrapper">
                <Content>:D</Content>
            </Container>
        );
    }
}

export default FooterComponent;
