import React, { useState, useEffect } from 'react';
import { Form, DatePicker, Row, Col, Card, Typography, Statistic, Divider } from 'antd';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const { Title, Text } = Typography;

const AgeCalculator = () => {
    const [birthDate, setBirthDate] = useState(dayjs('1990-01-01'));
    const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
    const [nextBirthday, setNextBirthday] = useState({ months: 0, days: 0 });

    const calculate = () => {
        if (!birthDate) return;

        const now = dayjs();
        const diff = dayjs.duration(now.diff(birthDate));

        // Exact calculation can be tricky with dayjs duration sometimes, 
        // let's do it manually for precision similar to standard age calcs.

        let years = now.year() - birthDate.year();
        let months = now.month() - birthDate.month();
        let days = now.date() - birthDate.date();

        if (days < 0) {
            months -= 1;
            // Days in previous month
            const prevMonth = now.subtract(1, 'month');
            days += prevMonth.daysInMonth();
        }
        if (months < 0) {
            years -= 1;
            months += 12;
        }

        setAge({ years, months, days });

        // Next Birthday
        const currentYearBirthday = birthDate.year(now.year());
        let nextBday = currentYearBirthday;
        if (currentYearBirthday.isBefore(now, 'day')) {
            nextBday = birthDate.year(now.year() + 1);
        }

        const diffNext = dayjs.duration(nextBday.diff(now));
        // Approximation for next birthday countdown
        // Or calculate manually again

        let nextMonths = nextBday.month() - now.month();
        let nextDays = nextBday.date() - now.date();

        if (nextDays < 0) {
            nextMonths -= 1;
            const prevMonth = nextBday.subtract(1, 'month'); // relative to nextBday? No, relative to now's perspective of month end?
            // Actually, let's use diff in ms and convert? No, months vary.

            // Let's use the diff we computed
            // setNextBirthday({ months: diffNext.months(), days: diffNext.days() }); 
            // dayjs duration isn't always perfect for "X months Y days" countdown without plugin config, but let's try.
        }

        // Simpler approach for next birthday:
        const diffDaysTotal = nextBday.diff(now, 'day');
        setNextBirthday({ totalDays: diffDaysTotal });
    };

    useEffect(() => {
        calculate();
    }, [birthDate]);

    return (
        <div>
            <Title level={2}>Age Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Date of Birth">
                        <Form layout="vertical">
                            <Form.Item label="Select Date">
                                <DatePicker
                                    value={birthDate}
                                    onChange={setBirthDate}
                                    style={{ width: '100%' }}
                                    format="YYYY-MM-DD"
                                />
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Result" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Title level={3} style={{ color: '#1890ff' }}>
                                {age.years} years {age.months} months {age.days} days
                            </Title>
                            <Text type="secondary">or {age.years * 12 + age.months} months {age.days} days</Text>
                        </div>

                        <Divider />

                        <div style={{ textAlign: 'center' }}>
                            <Statistic title="Next Birthday In" value={nextBirthday.totalDays} suffix="days" />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AgeCalculator;
