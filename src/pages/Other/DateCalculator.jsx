import React, { useState, useEffect } from 'react';
import { Form, DatePicker, Row, Col, Card, Typography, Statistic, Button, Radio } from 'antd';
import dayjs from 'dayjs';

const { Title } = Typography;

const DateCalculator = () => {
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs().add(1, 'month'));
    const [diff, setDiff] = useState({ days: 0, weeks: 0, months: 0, years: 0 });

    const [addDate, setAddDate] = useState(dayjs());
    const [addAmount, setAddAmount] = useState(0);
    const [addUnit, setAddUnit] = useState('day'); // day, week, month, year
    const [addOperation, setAddOperation] = useState('add'); // add, subtract
    const [newDate, setNewDate] = useState(null);

    const calculateDiff = () => {
        if (!startDate || !endDate) return;

        const d1 = startDate;
        const d2 = endDate;

        const days = Math.abs(d2.diff(d1, 'day'));
        const weeks = (days / 7).toFixed(1);
        const months = Math.abs(d2.diff(d1, 'month'));
        const years = Math.abs(d2.diff(d1, 'year'));

        setDiff({ days, weeks, months, years });
    };

    const calculateAdd = () => {
        if (!addDate) return;

        let res;
        if (addOperation === 'add') {
            res = addDate.add(addAmount, addUnit);
        } else {
            res = addDate.subtract(addAmount, addUnit);
        }
        setNewDate(res);
    };

    useEffect(() => {
        calculateDiff();
    }, [startDate, endDate]);

    return (
        <div>
            <Title level={2}>Date Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Date Difference">
                        <Form layout="vertical">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Start Date">
                                        <DatePicker value={startDate} onChange={setStartDate} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="End Date">
                                        <DatePicker value={endDate} onChange={setEndDate} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                        <Row gutter={16} style={{ textAlign: 'center', marginTop: 20 }}>
                            <Col span={6}><Statistic title="Days" value={diff.days} /></Col>
                            <Col span={6}><Statistic title="Weeks" value={diff.weeks} /></Col>
                            <Col span={6}><Statistic title="Months" value={diff.months} /></Col>
                            <Col span={6}><Statistic title="Years" value={diff.years} /></Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Add/Subtract Days">
                        <Form layout="vertical">
                            <Form.Item label="Start Date">
                                <DatePicker value={addDate} onChange={setAddDate} style={{ width: '100%' }} />
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
                                    <Form.Item label="Amount">
                                        <InputNumber value={addAmount} onChange={setAddAmount} min={0} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label="Unit">
                                        <Select value={addUnit} onChange={setAddUnit} style={{ width: '100%' }}>
                                            <Option value="day">Days</Option>
                                            <Option value="week">Weeks</Option>
                                            <Option value="month">Months</Option>
                                            <Option value="year">Years</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Button type="primary" onClick={calculateAdd} block>Calculate New Date</Button>
                        </Form>
                        {newDate && (
                            <div style={{ textAlign: 'center', marginTop: 20 }}>
                                <Statistic title="Result Date" value={newDate.format('dddd, MMMM D, YYYY')} valueStyle={{ color: '#3f8600' }} />
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

import { InputNumber, Select } from 'antd';
const { Option } = Select;

export default DateCalculator;
