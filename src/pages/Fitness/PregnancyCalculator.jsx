import React, { useState, useEffect } from 'react';
import { Form, DatePicker, Select, Row, Col, Card, Typography, Statistic, Divider } from 'antd';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

const PregnancyCalculator = () => {
    const [lastPeriod, setLastPeriod] = useState(dayjs());
    const [cycleLength, setCycleLength] = useState(28);
    const [dueDate, setDueDate] = useState(null);
    const [conceptionDate, setConceptionDate] = useState(null);

    const calculate = () => {
        if (!lastPeriod) return;

        // Naegele's Rule: LMP + 1 year - 3 months + 7 days
        // Adjusted for cycle length: + (Cycle Length - 28) days

        const cycleAdjustment = cycleLength - 28;
        const due = lastPeriod.add(1, 'year').subtract(3, 'month').add(7 + cycleAdjustment, 'day');
        const conception = lastPeriod.add(14 + cycleAdjustment, 'day');

        setDueDate(due);
        setConceptionDate(conception);
    };

    useEffect(() => {
        calculate();
    }, [lastPeriod, cycleLength]);

    return (
        <div>
            <Title level={2}>Pregnancy Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Your Details">
                        <Form layout="vertical">
                            <Form.Item label="First Day of Last Period">
                                <DatePicker
                                    value={lastPeriod}
                                    onChange={setLastPeriod}
                                    style={{ width: '100%' }}
                                    format="YYYY-MM-DD"
                                />
                            </Form.Item>

                            <Form.Item label="Average Cycle Length (Days)">
                                <Select value={cycleLength} onChange={setCycleLength}>
                                    {[...Array(21).keys()].map(i => (
                                        <Option key={i} value={20 + i}>{20 + i} days</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Estimated Dates" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: 30 }}>
                            <Statistic
                                title="Estimated Due Date"
                                value={dueDate ? dueDate.format('MMMM D, YYYY') : '-'}
                                valueStyle={{ color: '#eb2f96', fontSize: '2.5rem' }}
                            />
                        </div>

                        <Divider />

                        <div style={{ textAlign: 'center' }}>
                            <Statistic
                                title="Estimated Conception Date"
                                value={conceptionDate ? conceptionDate.format('MMMM D, YYYY') : '-'}
                                valueStyle={{ fontSize: '1.5rem' }}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default PregnancyCalculator;
