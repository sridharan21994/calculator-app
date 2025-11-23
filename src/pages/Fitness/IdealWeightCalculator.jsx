import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Radio, Row, Col, Card, Typography, Statistic, Divider } from 'antd';
import { useFitnessStore } from '../../store/useFitnessStore';

const { Title, Text } = Typography;

const IdealWeightCalculator = () => {
    const store = useFitnessStore();
    const [idealWeightRange, setIdealWeightRange] = useState([0, 0]);

    const calculate = () => {
        const { height, unit } = store;

        let heightCm = height;
        if (unit === 'imperial') {
            heightCm = height * 2.54;
        }

        // BMI Method (18.5 - 25)
        // Weight = BMI * (Height in m)^2
        const heightM = heightCm / 100;
        const minWeightKg = 18.5 * heightM * heightM;
        const maxWeightKg = 25 * heightM * heightM;

        let minWeight = minWeightKg;
        let maxWeight = maxWeightKg;

        if (unit === 'imperial') {
            minWeight = minWeightKg * 2.20462;
            maxWeight = maxWeightKg * 2.20462;
        }

        setIdealWeightRange([minWeight, maxWeight]);
    };

    useEffect(() => {
        calculate();
    }, [store]);

    return (
        <div>
            <Title level={2}>Ideal Weight Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Your Details">
                        <Form layout="vertical">
                            <Form.Item label="Unit">
                                <Radio.Group value={store.unit} onChange={e => store.setUnit(e.target.value)}>
                                    <Radio.Button value="metric">Metric</Radio.Button>
                                    <Radio.Button value="imperial">Imperial</Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item label={`Height (${store.unit === 'metric' ? 'cm' : 'in'})`}>
                                <InputNumber value={store.height} onChange={store.setHeight} style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item label="Gender">
                                <Radio.Group value={store.gender} onChange={e => store.setGender(e.target.value)}>
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Result" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: 30 }}>
                            <Statistic
                                title="Ideal Weight Range (Based on BMI)"
                                value={`${idealWeightRange[0].toFixed(1)} - ${idealWeightRange[1].toFixed(1)}`}
                                suffix={store.unit === 'metric' ? 'kg' : 'lbs'}
                                valueStyle={{ color: '#3f8600', fontSize: '2.5rem' }}
                            />
                        </div>

                        <Divider />

                        <div style={{ textAlign: 'center' }}>
                            <Text>Based on a healthy BMI range of 18.5 to 25.</Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default IdealWeightCalculator;
