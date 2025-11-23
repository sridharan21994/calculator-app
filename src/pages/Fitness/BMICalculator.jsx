import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Radio, Card, Row, Col, Typography, Progress, Alert } from 'antd';
import { useBMIStore } from '../../store/useBMIStore';

const { Title, Text } = Typography;

const BMICalculator = () => {
    const store = useBMIStore();
    const [bmi, setBmi] = useState(0);
    const [status, setStatus] = useState('');
    const [color, setColor] = useState('');

    const calculate = () => {
        let calculatedBmi = 0;
        if (store.unit === 'metric') {
            const heightM = store.heightCm / 100;
            calculatedBmi = store.weightKg / (heightM * heightM);
        } else {
            const heightInches = (store.heightFt * 12) + store.heightIn;
            calculatedBmi = 703 * store.weightLb / (heightInches * heightInches);
        }

        setBmi(calculatedBmi);

        if (calculatedBmi < 18.5) {
            setStatus('Underweight');
            setColor('#1890ff');
        } else if (calculatedBmi < 25) {
            setStatus('Normal');
            setColor('#52c41a');
        } else if (calculatedBmi < 30) {
            setStatus('Overweight');
            setColor('#faad14');
        } else {
            setStatus('Obese');
            setColor('#f5222d');
        }
    };

    useEffect(() => {
        calculate();
    }, [store]);

    return (
        <div>
            <Title level={2}>BMI Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} md={12}>
                    <Card title="Enter your details">
                        <Form layout="vertical">
                            <Form.Item label="Unit">
                                <Radio.Group value={store.unit} onChange={(e) => store.setUnit(e.target.value)}>
                                    <Radio.Button value="metric">Metric</Radio.Button>
                                    <Radio.Button value="us">US Units</Radio.Button>
                                </Radio.Group>
                            </Form.Item>

                            <Form.Item label="Age">
                                <InputNumber min={2} max={120} value={store.age} onChange={store.setAge} />
                            </Form.Item>

                            <Form.Item label="Gender">
                                <Radio.Group value={store.gender} onChange={(e) => store.setGender(e.target.value)}>
                                    <Radio value="male">Male</Radio>
                                    <Radio value="female">Female</Radio>
                                </Radio.Group>
                            </Form.Item>

                            {store.unit === 'metric' ? (
                                <>
                                    <Form.Item label="Height (cm)">
                                        <InputNumber min={0} value={store.heightCm} onChange={store.setHeightCm} style={{ width: '100%' }} />
                                    </Form.Item>
                                    <Form.Item label="Weight (kg)">
                                        <InputNumber min={0} value={store.weightKg} onChange={store.setWeightKg} style={{ width: '100%' }} />
                                    </Form.Item>
                                </>
                            ) : (
                                <>
                                    <Form.Item label="Height">
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <InputNumber min={0} addonAfter="ft" value={store.heightFt} onChange={store.setHeightFt} style={{ width: '100%' }} />
                                            </Col>
                                            <Col span={12}>
                                                <InputNumber min={0} addonAfter="in" value={store.heightIn} onChange={store.setHeightIn} style={{ width: '100%' }} />
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                    <Form.Item label="Weight (lb)">
                                        <InputNumber min={0} value={store.weightLb} onChange={store.setWeightLb} style={{ width: '100%' }} />
                                    </Form.Item>
                                </>
                            )}
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} md={12}>
                    <Card title="Result" style={{ textAlign: 'center', height: '100%' }}>
                        <Title level={1} style={{ color: color }}>{bmi.toFixed(1)}</Title>
                        <Title level={4}>BMI = {bmi.toFixed(1)} kg/m² ({status})</Title>

                        <div style={{ marginTop: 40 }}>
                            <Progress
                                percent={Math.min((bmi / 40) * 100, 100)}
                                showInfo={false}
                                strokeColor={color}
                                strokeWidth={20}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12, color: '#888' }}>
                                <span>Underweight</span>
                                <span>Normal</span>
                                <span>Overweight</span>
                                <span>Obese</span>
                            </div>
                        </div>

                        <div style={{ marginTop: 30, textAlign: 'left' }}>
                            <Alert
                                message="BMI Categories"
                                description={
                                    <ul>
                                        <li>Underweight = &lt;18.5</li>
                                        <li>Normal weight = 18.5–24.9</li>
                                        <li>Overweight = 25–29.9</li>
                                        <li>Obesity = BMI of 30 or greater</li>
                                    </ul>
                                }
                                type="info"
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default BMICalculator;
