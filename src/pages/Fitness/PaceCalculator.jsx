import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Select, Row, Col, Card, Typography, Statistic, Divider } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

const PaceCalculator = () => {
    const [timeHours, setTimeHours] = useState(0);
    const [timeMinutes, setTimeMinutes] = useState(30);
    const [timeSeconds, setTimeSeconds] = useState(0);
    const [distance, setDistance] = useState(5);
    const [distanceUnit, setDistanceUnit] = useState('km'); // km, miles, meters

    const [pace, setPace] = useState('');
    const [speed, setSpeed] = useState(0);

    const calculate = () => {
        const totalMinutes = timeHours * 60 + timeMinutes + timeSeconds / 60;

        let distKm = distance;
        if (distanceUnit === 'miles') distKm = distance * 1.60934;
        if (distanceUnit === 'meters') distKm = distance / 1000;

        if (totalMinutes <= 0 || distKm <= 0) return;

        // Pace = Time / Distance
        // Pace in min/km
        const paceMinPerKm = totalMinutes / distKm;
        const paceMin = Math.floor(paceMinPerKm);
        const paceSec = Math.round((paceMinPerKm - paceMin) * 60);

        // Speed = Distance / Time
        // Speed in km/h
        const speedKmh = distKm / (totalMinutes / 60);

        setPace(`${paceMin}:${paceSec < 10 ? '0' : ''}${paceSec} min/km`);
        setSpeed(speedKmh);
    };

    useEffect(() => {
        calculate();
    }, [timeHours, timeMinutes, timeSeconds, distance, distanceUnit]);

    return (
        <div>
            <Title level={2}>Pace Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Run Details">
                        <Form layout="vertical">
                            <Form.Item label="Time">
                                <Row gutter={8}>
                                    <Col span={8}>
                                        <InputNumber value={timeHours} onChange={setTimeHours} min={0} placeholder="Hrs" style={{ width: '100%' }} />
                                    </Col>
                                    <Col span={8}>
                                        <InputNumber value={timeMinutes} onChange={setTimeMinutes} min={0} max={59} placeholder="Mins" style={{ width: '100%' }} />
                                    </Col>
                                    <Col span={8}>
                                        <InputNumber value={timeSeconds} onChange={setTimeSeconds} min={0} max={59} placeholder="Secs" style={{ width: '100%' }} />
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item label="Distance">
                                <Row gutter={8}>
                                    <Col span={16}>
                                        <InputNumber value={distance} onChange={setDistance} style={{ width: '100%' }} />
                                    </Col>
                                    <Col span={8}>
                                        <Select value={distanceUnit} onChange={setDistanceUnit}>
                                            <Option value="km">Kilometers</Option>
                                            <Option value="miles">Miles</Option>
                                            <Option value="meters">Meters</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Result" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: 30 }}>
                            <Statistic title="Pace" value={pace} valueStyle={{ color: '#3f8600', fontSize: '3rem' }} />
                        </div>

                        <Divider />

                        <div style={{ textAlign: 'center' }}>
                            <Statistic title="Speed" value={speed} precision={2} suffix="km/h" />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PaceCalculator;
