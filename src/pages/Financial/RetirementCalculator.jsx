import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Slider, Row, Col, Card, Typography, Statistic, Divider } from 'antd';
import { useRetirementStore } from '../../store/useRetirementStore';

const { Title, Text } = Typography;

const RetirementCalculator = () => {
    const store = useRetirementStore();
    const [retirementSavings, setRetirementSavings] = useState(0);
    const [monthlyIncome, setMonthlyIncome] = useState(0);

    const calculate = () => {
        const {
            currentAge, retirementAge, lifeExpectancy, currentSavings,
            annualContribution, preRetirementReturn, postRetirementReturn, inflationRate
        } = store;

        const yearsToRetirement = retirementAge - currentAge;
        const yearsInRetirement = lifeExpectancy - retirementAge;

        if (yearsToRetirement <= 0) {
            setRetirementSavings(currentSavings);
            setMonthlyIncome(0);
            return;
        }

        // Calculate Future Value of Current Savings
        const r_pre = preRetirementReturn / 100;
        const fv_current = currentSavings * Math.pow(1 + r_pre, yearsToRetirement);

        // Calculate Future Value of Annual Contributions (End of Period)
        const fv_contributions = annualContribution * ((Math.pow(1 + r_pre, yearsToRetirement) - 1) / r_pre);

        const totalAtRetirement = fv_current + fv_contributions;

        // Calculate Sustainable Withdrawal Rate (PMT)
        // We want to deplete the fund over yearsInRetirement
        // Using postRetirementReturn
        // PV = PMT * (1 - (1+r)^-n) / r
        // PMT = PV * r / (1 - (1+r)^-n)

        const r_post = postRetirementReturn / 100;
        let annualIncome = 0;

        if (r_post === 0) {
            annualIncome = totalAtRetirement / yearsInRetirement;
        } else {
            annualIncome = totalAtRetirement * r_post / (1 - Math.pow(1 + r_post, -yearsInRetirement));
        }

        // Adjust for inflation? 
        // The above is nominal. If we want real purchasing power, we should use real rates.
        // Real Rate = (1 + Nominal) / (1 + Inflation) - 1
        // Let's keep it simple (Nominal) for now, or maybe show "in today's dollars" if requested.
        // The user didn't specify. Standard calc usually shows nominal future value.

        setRetirementSavings(totalAtRetirement);
        setMonthlyIncome(annualIncome / 12);
    };

    useEffect(() => {
        calculate();
    }, [store]);

    return (
        <div>
            <Title level={2}>Retirement Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Retirement Plan">
                        <Form layout="vertical">
                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Current Age">
                                        <InputNumber value={store.currentAge} onChange={store.setCurrentAge} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Retirement Age">
                                        <InputNumber value={store.retirementAge} onChange={store.setRetirementAge} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item label="Life Expectancy">
                                <InputNumber value={store.lifeExpectancy} onChange={store.setLifeExpectancy} style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item label="Current Savings ($)">
                                <InputNumber
                                    value={store.currentSavings}
                                    onChange={store.setCurrentSavings}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item label="Annual Contribution ($)">
                                <InputNumber
                                    value={store.annualContribution}
                                    onChange={store.setAnnualContribution}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Pre-Retirement Return (%)">
                                        <InputNumber value={store.preRetirementReturn} onChange={store.setPreRetirementReturn} step={0.1} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Post-Retirement Return (%)">
                                        <InputNumber value={store.postRetirementReturn} onChange={store.setPostRetirementReturn} step={0.1} style={{ width: '100%' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Retirement Projection" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: 30 }}>
                            <Statistic title="Projected Savings at Retirement" value={retirementSavings} precision={0} prefix="$" valueStyle={{ color: '#3f8600', fontSize: '2.5rem' }} />
                        </div>

                        <Divider />

                        <div style={{ textAlign: 'center' }}>
                            <Statistic title="Estimated Monthly Income in Retirement" value={monthlyIncome} precision={0} prefix="$" valueStyle={{ color: '#1890ff', fontSize: '2rem' }} />
                            <Text type="secondary">(Nominal value, not adjusted for inflation)</Text>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default RetirementCalculator;
