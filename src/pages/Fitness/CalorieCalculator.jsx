import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Radio, Select, Row, Col, Card, Typography, Statistic, Divider } from 'antd';
import { useFitnessStore } from '../../store/useFitnessStore';

const { Title, Text } = Typography;
const { Option } = Select;

const CalorieCalculator = () => {
    const store = useFitnessStore();
    const [calories, setCalories] = useState(0);

    const calculate = () => {
        const { age, gender, height, weight, activityLevel, unit } = store;

        let weightKg = weight;
        let heightCm = height;

        if (unit === 'imperial') {
            weightKg = weight * 0.453592;
            heightCm = height * 2.54;
        }

        // Mifflin-St Jeor Equation
        let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
        if (gender === 'male') {
            bmr += 5;
        } else {
            bmr -= 161;
        }

        let multiplier = 1.2;
        if (activityLevel === 'light') multiplier = 1.375;
        if (activityLevel === 'moderate') multiplier = 1.55;
        if (activityLevel === 'active') multiplier = 1.725;
        if (activityLevel === 'very_active') multiplier = 1.9;

        setCalories(Math.round(bmr * multiplier));
    };

    useEffect(() => {
        calculate();
    }, [store]);

    return (
        <div>
            <Title level={2}>Calorie Calculator</Title>
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

                            <Form.Item label="Activity Level">
                                <Select value={store.activityLevel} onChange={store.setActivityLevel}>
                                    <Option value="sedentary">Sedentary (little or no exercise)</Option>
                                    <Option value="light">Lightly active (light exercise/sports 1-3 days/week)</Option>
                                    <Option value="moderate">Moderately active (moderate exercise/sports 3-5 days/week)</Option>
                                    <Option value="active">Active (hard exercise/sports 6-7 days/week)</Option>
                                    <Option value="very_active">Very active (very hard exercise/sports & physical job)</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Result" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: 30 }}>
                            <Statistic title="Daily Calorie Needs to Maintain Weight" value={calories} suffix="kcal" valueStyle={{ color: '#3f8600', fontSize: '3rem' }} />
                        </div>

                        <Divider />

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text>Mild Weight Loss (0.25 kg/week)</Text>
                                <Text strong>{Math.round(calories * 0.9)} kcal</Text>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text>Weight Loss (0.5 kg/week)</Text>
                                <Text strong>{Math.round(calories * 0.8)} kcal</Text>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text>Extreme Weight Loss (1 kg/week)</Text>
                                <Text strong>{Math.round(calories * 0.6)} kcal</Text>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default CalorieCalculator;
