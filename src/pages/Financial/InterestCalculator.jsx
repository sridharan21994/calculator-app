import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Select, Row, Col, Card, Typography, Statistic, Divider } from 'antd';
import { useInterestStore } from '../../store/useInterestStore';

const { Title } = Typography;
const { Option } = Select;

const InterestCalculator = () => {
    const store = useInterestStore();
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);

    const calculate = () => {
        const { principal, rate, time, compoundingFrequency, contribution } = store;

        const r = rate / 100;
        let n = 1;
        if (compoundingFrequency === 'Semiannually') n = 2;
        if (compoundingFrequency === 'Quarterly') n = 4;
        if (compoundingFrequency === 'Monthly') n = 12;
        if (compoundingFrequency === 'Daily') n = 365;

        // Compound Interest Formula with Monthly Contributions
        // A = P(1 + r/n)^(nt) + PMT * (((1 + r/n)^(nt) - 1) / (r/n))
        // Note: This assumes contributions are made at the end of each compounding period if n=12, 
        // but usually contributions are monthly. If n != 12, it gets complicated.
        // For simplicity, let's assume contributions are made at the same frequency as compounding for now, 
        // or just stick to standard compound interest formula for principal if contribution is 0.

        // Let's refine: If contribution > 0, we assume monthly contributions and monthly compounding for the contribution part roughly,
        // or we align n.

        // Standard Formula for Principal:
        const amountFromPrincipal = principal * Math.pow(1 + r / n, n * time);

        // Future Value of a Series (Contributions)
        // FV = PMT * (((1 + r/n)^(nt) - 1) / (r/n))
        // This formula works if PMT is per compounding period.
        // If PMT is monthly but compounding is Annually, it's different.
        // To keep it simple and accurate enough for a basic calc:
        // We will treat contributions as being added at the end of each compounding period (adjusted).
        // If user selects "Monthly" compounding, it works perfectly with monthly contributions.

        let amountFromContributions = 0;
        if (contribution > 0) {
            // If n is not 12, we need to adjust PMT or rate. 
            // Let's force n=12 for contribution part or just simplify to:
            // We'll assume contributions happen 'n' times a year for simplicity in this version 
            // OR strictly follow the frequency.
            // If I select "Annually", contribution is treated as Annual contribution? No, usually monthly.

            // Let's stick to: Compounding Frequency affects everything.
            // If Monthly contribution is entered, we convert it to the compounding period equivalent?
            // No, let's just assume Monthly Compounding for the contribution part if it's not matching, 
            // OR simpler: Just use Monthly compounding for everything if contribution is present?

            // Let's try to be somewhat accurate.
            // If n=12 (Monthly), PMT is monthly.
            // FV_contributions = contribution * ( (Math.pow(1 + r/n, n*time) - 1) / (r/n) )

            if (n === 12) {
                amountFromContributions = contribution * ((Math.pow(1 + r / n, n * time) - 1) / (r / n));
            } else {
                // Approximation or just ignore contribution if not monthly for now?
                // Better: Calculate simple future value of series.
                // Let's just use n=12 for the contribution part regardless of main compounding, 
                // effectively compounding contributions monthly.
                const r_monthly = r / 12;
                const n_monthly = 12;
                amountFromContributions = contribution * ((Math.pow(1 + r_monthly, n_monthly * time) - 1) / (r_monthly));
            }
        }

        const total = amountFromPrincipal + amountFromContributions;
        const totalInvested = principal + (contribution * 12 * time);
        const interest = total - totalInvested;

        setTotalAmount(total);
        setTotalInterest(interest);
    };

    useEffect(() => {
        calculate();
    }, [store]);

    return (
        <div>
            <Title level={2}>Interest Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Investment Details">
                        <Form layout="vertical">
                            <Form.Item label="Starting Principal ($)">
                                <InputNumber
                                    value={store.principal}
                                    onChange={store.setPrincipal}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item label="Annual Contribution ($ / month)">
                                <InputNumber
                                    value={store.contribution}
                                    onChange={store.setContribution}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item label="Annual Interest Rate (%)">
                                <InputNumber
                                    value={store.rate}
                                    onChange={store.setRate}
                                    step={0.1}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item label="Time (Years)">
                                <InputNumber
                                    value={store.time}
                                    onChange={store.setTime}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item label="Compounding Frequency">
                                <Select value={store.compoundingFrequency} onChange={store.setCompoundingFrequency}>
                                    <Option value="Annually">Annually</Option>
                                    <Option value="Semiannually">Semiannually</Option>
                                    <Option value="Quarterly">Quarterly</Option>
                                    <Option value="Monthly">Monthly</Option>
                                    <Option value="Daily">Daily</Option>
                                </Select>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Result" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: 30 }}>
                            <Statistic title="Total Balance" value={totalAmount} precision={2} prefix="$" valueStyle={{ color: '#3f8600', fontSize: '3rem' }} />
                        </div>

                        <Divider />

                        <Row gutter={16} style={{ textAlign: 'center' }}>
                            <Col span={12}>
                                <Statistic title="Total Principal" value={store.principal + (store.contribution * 12 * store.time)} precision={2} prefix="$" />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Total Interest" value={totalInterest} precision={2} prefix="$" valueStyle={{ color: '#cf1322' }} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default InterestCalculator;
