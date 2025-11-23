import React, { useState } from 'react';
import { Form, InputNumber, Row, Col, Card, Typography, Button } from 'antd';

const { Title, Text } = Typography;

const PercentageCalculator = () => {
    const [val1, setVal1] = useState(10);
    const [val2, setVal2] = useState(100);
    const [result1, setResult1] = useState(null);

    const [val3, setVal3] = useState(20);
    const [val4, setVal4] = useState(50);
    const [result2, setResult2] = useState(null);

    const [val5, setVal5] = useState(50);
    const [val6, setVal6] = useState(20);
    const [result3, setResult3] = useState(null);

    const calculate1 = () => {
        // What is X% of Y?
        setResult1((val1 / 100) * val2);
    };

    const calculate2 = () => {
        // X is what percent of Y?
        setResult2((val3 / val4) * 100);
    };

    const calculate3 = () => {
        // What is the percentage increase/decrease from X to Y?
        setResult3(((val6 - val5) / val5) * 100);
    };

    return (
        <div>
            <Title level={2}>Percentage Calculator</Title>
            <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                    <Card title="What is X% of Y?">
                        <Row gutter={8} align="middle">
                            <Col>What is</Col>
                            <Col><InputNumber value={val1} onChange={setVal1} /></Col>
                            <Col>% of</Col>
                            <Col><InputNumber value={val2} onChange={setVal2} /></Col>
                            <Col><Button type="primary" onClick={calculate1}>Calculate</Button></Col>
                        </Row>
                        {result1 !== null && <Title level={4} style={{ marginTop: 20 }}>Result: {result1}</Title>}
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="X is what percent of Y?">
                        <Row gutter={8} align="middle">
                            <Col><InputNumber value={val3} onChange={setVal3} /></Col>
                            <Col>is what percent of</Col>
                            <Col><InputNumber value={val4} onChange={setVal4} /></Col>
                            <Col><Button type="primary" onClick={calculate2}>Calculate</Button></Col>
                        </Row>
                        {result2 !== null && <Title level={4} style={{ marginTop: 20 }}>Result: {result2.toFixed(2)}%</Title>}
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Percentage Change">
                        <Row gutter={8} align="middle">
                            <Col>From</Col>
                            <Col><InputNumber value={val5} onChange={setVal5} /></Col>
                            <Col>to</Col>
                            <Col><InputNumber value={val6} onChange={setVal6} /></Col>
                            <Col><Button type="primary" onClick={calculate3}>Calculate</Button></Col>
                        </Row>
                        {result3 !== null && <Title level={4} style={{ marginTop: 20 }}>Result: {result3.toFixed(2)}%</Title>}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PercentageCalculator;
