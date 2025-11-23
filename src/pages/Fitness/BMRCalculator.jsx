import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Radio, Row, Col, Card, Typography, Statistic, Divider } from 'antd';
import { useFitnessStore } from '../../store/useFitnessStore';

const { Title, Text } = Typography;

const BMRCalculator = () => {
    const store = useFitnessStore();
    const [bmr, setBmr] = useState(0);

    const calculate = () => {
        const { age, gender, height, weight, unit } = store;

        let weightKg = weight;
        let heightCm = height;

        if (unit === 'imperial') {
            weightKg = weight * 0.453592;
            heightCm = height * 2.54;
        }

        // Mifflin-St Jeor Equation
        let result = 10 * weightKg + 6.25 * heightCm - 5 * age;
        if (gender === 'male') {
            result += 5;
        } else {
            result -= 161;
        }

        setBmr(Math.round(result));
    };

    useEffect(() => {
        calculate();
    }, [store]);

    return (
        <div>
            <Title level={2}>BMR Calculator</Title>
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
                                    <Form.Item label="Age">
                                        <InputNumber value={store.age} onChange={store.setAge} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Gender">
                                        <Radio.Group value={store.gender} onChange={e => store.setGender(e.target.value)}>
                                            <Radio value="male">Male</Radio>
                                            <Radio value="female">Female</Radio>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label={`Height (${store.unit === 'metric' ? 'cm' : 'in'})`}>
                                        <InputNumber value={store.height} onChange={store.setHeight} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label={`Weight (${store.unit === 'metric' ? 'kg' : 'lbs'})`}>
                                        <InputNumber value={store.weight} onChange={store.setWeight} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Result" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: 30 }}>
                            <Statistic title="Basal Metabolic Rate (BMR)" value={bmr} suffix="kcal/day" valueStyle={{ color: '#3f8600', fontSize: '3rem' }} />
                        </div>

                        <Divider />

                        <div style={{ textAlign: 'center' }}>
                            <Text>This is the number of calories your body burns at rest.</Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default BMRCalculator;
