import { Container } from '@material-ui/core';
import React from 'react';
const { tableau } = window;

const TierDashboard = () => {
    const ref = React.useRef(null);
    console.log(ref);
    const url = "https://public.tableau.com/views/Project_Nov_30/Dashboard2?:language=en&:display_count=y&:origin=viz_share_link";
    const loadDashBoard = () => {
        return new tableau.Viz(ref.current, url)
    }
    React.useEffect(() => {
        loadDashBoard();
    }, []);
    return (
        <Container maxWidth="md">
            <div ref={ref} className >
            </div>
        </Container>);
}
export default TierDashboard;