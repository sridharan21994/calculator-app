import React from 'react';
import { Typography, Result, Button } from 'antd';
import { Link, useParams } from 'react-router-dom';

const { Title } = Typography;

const CalculatorPlaceholder = ({ name }) => {
    const { type, calc } = useParams();
    const displayTitle = name || (calc ? calc.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Calculator');

    return (
        <div style={{ padding: 50, textAlign: 'center' }}>
            <Result
                status="info"
                title={`${displayTitle}`}
                subTitle="This calculator is currently under construction. Please check back later!"
                extra={[
                    <Link to="/" key="home">
                        <Button type="primary">Back Home</Button>
                    </Link>
                ]}
            />
        </div>
    );
};

export default CalculatorPlaceholder;
