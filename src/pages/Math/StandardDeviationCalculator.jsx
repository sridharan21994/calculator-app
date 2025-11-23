import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Statistic, Row, Col, Divider } from 'antd';
import { create, all } from 'mathjs';

const { Title, Text } = Typography;
const math = create(all);

const StandardDeviationCalculator = () => {
    const [inputData, setInputData] = useState('10, 12, 23, 23, 16, 23, 21, 16');
    const [result, setResult] = useState({
        count: 0,
        sum: 0,
        mean: 0,
        variance: 0,
        stdDev: 0,
        populationStdDev: 0
    });

    const calculate = () => {
        try {
            // Parse input
            const numbers = inputData.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));

            if (numbers.length === 0) return;

            const count = numbers.length;
            const sum = math.sum(numbers);
            const mean = math.mean(numbers);
            const variance = math.variance(numbers); // Sample variance by default
            const stdDev = math.std(numbers); // Sample std dev by default

            // Population std dev (uncorrected)
            // math.std(data, 'uncorrected')
            const populationStdDev = math.std(numbers, 'uncorrected');

            setResult({
                count,
                sum,
                mean,
                variance,
                stdDev,
                populationStdDev
            });
        } catch (e) {
            // Error handling
        }
    };

    return (
        <div>
            <Title level={2}>Standard Deviation Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Data Input">
                        <Form layout="vertical">
                            <Form.Item label="Enter numbers separated by comma or space">
                                <Input.TextArea
                                    rows={6}
                                    value={inputData}
                                    onChange={e => setInputData(e.target.value)}
                                    placeholder="e.g. 10, 20, 30..."
                                />
                            </Form.Item>
                            <Button type="primary" onClick={calculate} block>Calculate</Button>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Statistics" style={{ height: '100%' }}>
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Statistic title="Count (N)" value={result.count} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Sum" value={result.sum} precision={2} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Mean (Average)" value={result.mean} precision={4} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Variance (Sample)" value={result.variance} precision={4} />
                            </Col>
                        </Row>
                        <Divider />
                        <Statistic title="Standard Deviation (Sample)" value={result.stdDev} precision={4} valueStyle={{ color: '#1890ff' }} />
                        <div style={{ marginTop: 10 }}>
                            <Statistic title="Standard Deviation (Population)" value={result.populationStdDev} precision={4} valueStyle={{ fontSize: 16, color: '#888' }} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default StandardDeviationCalculator;
