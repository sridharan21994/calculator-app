import React, { useState, useEffect } from 'react';
import { Form, TimePicker, Row, Col, Card, Typography, Statistic, Button, InputNumber } from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;

const HoursCalculator = () => {
    const [startTime, setStartTime] = useState(dayjs('09:00', 'HH:mm'));
    const [endTime, setEndTime] = useState(dayjs('17:00', 'HH:mm'));
    const [breakTime, setBreakTime] = useState(0); // minutes
    const [totalHours, setTotalHours] = useState('');
    const [decimalHours, setDecimalHours] = useState(0);

    const calculate = () => {
        if (!startTime || !endTime) return;

        let diffMs = endTime.diff(startTime);
        // Handle overnight shifts
        if (diffMs < 0) {
            diffMs += 24 * 3600000;
        }

        // Subtract break
        diffMs -= breakTime * 60000;
        if (diffMs < 0) diffMs = 0;

        const h = Math.floor(diffMs / 3600000);
        const m = Math.floor((diffMs % 3600000) / 60000);

        setTotalHours(`${h} hours ${m} minutes`);
        setDecimalHours((diffMs / 3600000));
    };

    useEffect(() => {
        calculate();
    }, [startTime, endTime, breakTime]);

    return (
        <div>
            <Title level={2}>Hours Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Work Hours">
                        <Form layout="vertical">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Start Time">
                                        <TimePicker value={startTime} onChange={setStartTime} format="HH:mm" style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="End Time">
                                        <TimePicker value={endTime} onChange={setEndTime} format="HH:mm" style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Form.Item label="Break Deduction (minutes)">
                                <InputNumber value={breakTime} onChange={setBreakTime} min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Result" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: 20 }}>
                            <Statistic title="Total Hours" value={totalHours} valueStyle={{ color: '#1890ff', fontSize: '2.5rem' }} />
                        </div>
                        <Divider />
                        <div style={{ textAlign: 'center' }}>
                            <Statistic title="Decimal Hours" value={decimalHours} precision={2} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

import { Divider } from 'antd';

export default HoursCalculator;
