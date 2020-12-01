import { Container } from '@material-ui/core';
import React from 'react';
const { tableau } = window;

const PolicyDashboard = () => {
    const ref = React.useRef(null);
    console.log(ref);
    const url = "https://public.tableau.com/shared/4N9GD6SYT?:display_count=y&:origin=viz_share_link";
    let options = {
        device: 'desktop'
    }
    const loadDashBoard = () => {
        return new tableau.Viz(ref.current, url, options)
    }

    React.useEffect(() => {
        loadDashBoard();
    }, []);
    return (
        <Container maxWidth="md">
            <div ref={ref}>
            </div>
        </Container>);
}
export default PolicyDashboard;