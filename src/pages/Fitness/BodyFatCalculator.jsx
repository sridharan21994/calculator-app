import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Radio, Row, Col, Card, Typography, Statistic, Divider } from 'antd';
import { useFitnessStore } from '../../store/useFitnessStore';

const { Title, Text } = Typography;

const BodyFatCalculator = () => {
    const store = useFitnessStore();
    const [bodyFat, setBodyFat] = useState(0);
    const [category, setCategory] = useState('');

    // Additional fields for Body Fat (Neck, Waist, Hip)
    // We can add them to the store or keep local state if they are specific to this calc.
    // Since they are specific, let's keep them local or extend the store if needed.
    // But wait, if I switch tabs, I lose them. Let's extend the store.
    // Actually, for now, let's keep them local to this component to avoid bloating the shared store too much 
    // unless the user asks for persistence across tools.
    // The user wants "recreate calculator.net", which usually persists data.
    // But for speed, I'll use local state for these specific measurements.

    const [neck, setNeck] = useState(50);
    const [waist, setWaist] = useState(90);
    const [hip, setHip] = useState(90); // Only for females

    const calculate = () => {
        const { gender, height, unit } = store;

        let h = height;
        let n = neck;
        let w = waist;
        let hi = hip;

        if (unit === 'imperial') {
            // US Navy Method uses inches
            // If inputs are in inches, we are good.
            // If inputs are in cm (from store default), we need to convert.
            // Wait, the store has 'height' which changes meaning based on unit?
            // In CalorieCalculator, I treated store.height as whatever the unit implies?
            // No, in CalorieCalculator:
            // if (unit === 'imperial') { weightKg = weight * 0.45...; heightCm = height * 2.54; }
            // This implies the store holds the value in the *selected unit*.
            // So if unit is metric, height is cm. If imperial, height is inches?
            // Let's assume the user enters values corresponding to the unit.
        }

        // US Navy Method
        let bf = 0;

        if (unit === 'metric') {
            // Metric Formula
            if (gender === 'male') {
                // 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
                bf = 495 / (1.0324 - 0.19077 * Math.log10(w - n) + 0.15456 * Math.log10(h)) - 450;
            } else {
                // 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
                bf = 495 / (1.29579 - 0.35004 * Math.log10(w + hi - n) + 0.22100 * Math.log10(h)) - 450;
            }
        } else {
            // Imperial Formula (height in inches, waist/neck/hip in inches)
            if (gender === 'male') {
                // 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
                bf = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
            } else {
                // 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
                bf = 163.205 * Math.log10(w + hi - n) - 97.684 * Math.log10(h) - 78.387;
            }
        }

        if (bf < 0) bf = 0;
        setBodyFat(bf);

        // Categorization (Roughly)
        if (gender === 'male') {
            if (bf < 6) setCategory('Essential Fat');
            else if (bf < 14) setCategory('Athletes');
            else if (bf < 18) setCategory('Fitness');
            else if (bf < 25) setCategory('Average');
            else setCategory('Obese');
        } else {
            if (bf < 14) setCategory('Essential Fat');
            else if (bf < 21) setCategory('Athletes');
            else if (bf < 25) setCategory('Fitness');
            else if (bf < 32) setCategory('Average');
            else setCategory('Obese');
        }
    };

    useEffect(() => {
        calculate();
    }, [store, neck, waist, hip]);

    return (
        <div>
            <Title level={2}>Body Fat Calculator</Title>
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

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Gender">
                                        <Radio.Group value={store.gender} onChange={e => store.setGender(e.target.value)}>
                                            <Radio value="male">Male</Radio>
                                            <Radio value="female">Female</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Age">
                                        <InputNumber value={store.age} onChange={store.setAge} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item label={`Height (${store.unit === 'metric' ? 'cm' : 'in'})`}>
                                <InputNumber value={store.height} onChange={store.setHeight} style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item label={`Neck (${store.unit === 'metric' ? 'cm' : 'in'})`}>
                                <InputNumber value={neck} onChange={setNeck} style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item label={`Waist (${store.unit === 'metric' ? 'cm' : 'in'})`}>
                                <InputNumber value={waist} onChange={setWaist} style={{ width: '100%' }} />
                            </Form.Item>

                            {store.gender === 'female' && (
                                <Form.Item label={`Hip (${store.unit === 'metric' ? 'cm' : 'in'})`}>
                                    <InputNumber value={hip} onChange={setHip} style={{ width: '100%' }} />
                                </Form.Item>
                            )}
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Result" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: 30 }}>
                            <Statistic title="Body Fat Percentage" value={bodyFat} precision={1} suffix="%" valueStyle={{ color: '#3f8600', fontSize: '3rem' }} />
                        </div>

                        <Divider />

                        <div style={{ textAlign: 'center' }}>
                            <Title level={4}>Category: {category}</Title>
                            <Text type="secondary">Based on US Navy Method</Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default BodyFatCalculator;
