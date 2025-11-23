import React, { useState } from 'react';
import { Form, InputNumber, Button, Card, Typography, Statistic, Row, Col } from 'antd';

const { Title } = Typography;

const RandomNumberGenerator = () => {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [count, setCount] = useState(1);
    const [results, setResults] = useState([]);

    const generate = () => {
        const newResults = [];
        for (let i = 0; i < count; i++) {
            const random = Math.floor(Math.random() * (max - min + 1)) + min;
            newResults.push(random);
        }
        setResults(newResults);
    };

    return (
        <div>
            <Title level={2}>Random Number Generator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Settings">
                        <Form layout="vertical">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Lower Limit">
                                        <InputNumber value={min} onChange={setMin} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Upper Limit">
                                        <InputNumber value={max} onChange={setMax} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item label="Quantity">
                                <InputNumber value={count} onChange={setCount} min={1} max={100} style={{ width: '100%' }} />
                            </Form.Item>
                            <Button type="primary" onClick={generate} block size="large">Generate</Button>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Results" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center' }}>
                            {results.length > 0 ? (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
                                    {results.map((num, idx) => (
                                        <div key={idx} style={{
                                            background: '#f0f2f5',
                                            padding: '10px 20px',
                                            borderRadius: 8,
                                            fontSize: 24,
                                            fontWeight: 'bold',
                                            color: '#1890ff'
                                        }}>
                                            {num}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div style={{ color: '#ccc', padding: 20 }}>Click Generate</div>
                            )}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default RandomNumberGenerator;
