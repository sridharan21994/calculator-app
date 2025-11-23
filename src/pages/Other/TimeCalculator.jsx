import React, { useState, useEffect } from 'react';
import { Form, TimePicker, Row, Col, Card, Typography, Statistic, Button, Radio } from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;

const TimeCalculator = () => {
    const [time1, setTime1] = useState(dayjs('12:00', 'HH:mm'));
    const [time2, setTime2] = useState(dayjs('13:30', 'HH:mm'));
    const [diff, setDiff] = useState('');

    const [baseTime, setBaseTime] = useState(dayjs('12:00', 'HH:mm'));
    const [addHours, setAddHours] = useState(0);
    const [addMinutes, setAddMinutes] = useState(0);
    const [addOperation, setAddOperation] = useState('add');
    const [resultTime, setResultTime] = useState(null);

    const calculateDiff = () => {
        if (!time1 || !time2) return;

        // Assume same day for simplicity unless crossing midnight logic is needed.
        // Or just diff in hours/minutes.

        let d1 = time1;
        let d2 = time2;

        // If d2 < d1, assume next day? Or just absolute diff?
        // Let's show absolute difference.

        let diffMs = d2.diff(d1);
        if (diffMs < 0) diffMs = -diffMs;

        const h = Math.floor(diffMs / 3600000);
        const m = Math.floor((diffMs % 3600000) / 60000);

        setDiff(`${h} hours ${m} minutes`);
    };

    const calculateAdd = () => {
        if (!baseTime) return;

        let res;
        if (addOperation === 'add') {
            res = baseTime.add(addHours, 'hour').add(addMinutes, 'minute');
        } else {
            res = baseTime.subtract(addHours, 'hour').subtract(addMinutes, 'minute');
        }
        setResultTime(res);
    };

    useEffect(() => {
        calculateDiff();
    }, [time1, time2]);

    return (
        <div>
            <Title level={2}>Time Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Time Difference">
                        <Form layout="vertical">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Start Time">
                                        <TimePicker value={time1} onChange={setTime1} format="HH:mm" style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="End Time">
                                        <TimePicker value={time2} onChange={setTime2} format="HH:mm" style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                            <Statistic title="Difference" value={diff} />
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Add/Subtract Time">
                        <Form layout="vertical">
                            <Form.Item label="Start Time">
                                <TimePicker value={baseTime} onChange={setBaseTime} format="HH:mm" style={{ width: '100%' }} />
                            </Form.Item>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Form.Item label="Operation">
                                        <Radio.Group value={addOperation} onChange={e => setAddOperation(e.target.value)}>
                                            <Radio.Button value="add">+</Radio.Button>
                                            <Radio.Button value="subtract">-</Radio.Button>
                                        </Radio.Group>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Hours">
                                        <InputNumber value={addHours} onChange={setAddHours} min={0} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Minutes">
                                        <InputNumber value={addMinutes} onChange={setAddMinutes} min={0} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Button type="primary" onClick={calculateAdd} block>Calculate New Time</Button>
                        </Form>
                        {resultTime && (
                            <div style={{ textAlign: 'center', marginTop: 20 }}>
                                <Statistic title="Result Time" value={resultTime.format('HH:mm')} valueStyle={{ color: '#3f8600' }} />
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

import { InputNumber } from 'antd';

export default TimeCalculator;
