import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Row, Col, Card, Typography, Statistic, Divider } from 'antd';

const { Title, Text } = Typography;

const TriangleCalculator = () => {
    // Sides a, b, c
    const [a, setA] = useState(3);
    const [b, setB] = useState(4);
    const [c, setC] = useState(5);

    const [area, setArea] = useState(0);
    const [perimeter, setPerimeter] = useState(0);
    const [angles, setAngles] = useState([0, 0, 0]);
    const [isValid, setIsValid] = useState(true);

    const calculate = () => {
        if (a + b <= c || a + c <= b || b + c <= a) {
            setIsValid(false);
            return;
        }
        setIsValid(true);

        // Perimeter
        const p = a + b + c;
        setPerimeter(p);

        // Area using Heron's formula
        const s = p / 2;
        const areaVal = Math.sqrt(s * (s - a) * (s - b) * (s - c));
        setArea(areaVal);

        // Angles using Law of Cosines
        // c^2 = a^2 + b^2 - 2ab cos(C) -> cos(C) = (a^2 + b^2 - c^2) / 2ab
        const angC = Math.acos((a * a + b * b - c * c) / (2 * a * b)) * (180 / Math.PI);
        const angA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
        const angB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);

        setAngles([angA, angB, angC]);
    };

    useEffect(() => {
        calculate();
    }, [a, b, c]);

    return (
        <div>
            <Title level={2}>Triangle Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Triangle Sides">
                        <Form layout="vertical">
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Form.Item label="Side a">
                                        <InputNumber value={a} onChange={setA} min={0} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Side b">
                                        <InputNumber value={b} onChange={setB} min={0} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Side c">
                                        <InputNumber value={c} onChange={setC} min={0} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        {!isValid && <Text type="danger">Invalid Triangle: Sum of two sides must be greater than the third.</Text>}
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Properties" style={{ height: '100%' }}>
                        {isValid ? (
                            <>
                                <Row gutter={16} style={{ textAlign: 'center' }}>
                                    <Col span={12}>
                                        <Statistic title="Area" value={area} precision={2} />
                                    </Col>
                                    <Col span={12}>
                                        <Statistic title="Perimeter" value={perimeter} precision={2} />
                                    </Col>
                                </Row>
                                <Divider />
                                <div style={{ textAlign: 'center' }}>
                                    <Text strong>Angles</Text>
                                    <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: 10 }}>
                                        <Statistic title="∠A" value={angles[0]} precision={1} suffix="°" valueStyle={{ fontSize: 16 }} />
                                        <Statistic title="∠B" value={angles[1]} precision={1} suffix="°" valueStyle={{ fontSize: 16 }} />
                                        <Statistic title="∠C" value={angles[2]} precision={1} suffix="°" valueStyle={{ fontSize: 16 }} />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', color: '#ccc' }}>Enter valid side lengths</div>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default TriangleCalculator;
