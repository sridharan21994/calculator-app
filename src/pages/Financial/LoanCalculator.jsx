import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Slider, Row, Col, Card, Typography, Statistic, Divider } from 'antd';
import { useLoanStore } from '../../store/useLoanStore';

const { Title, Text } = Typography;

const LoanCalculator = () => {
    const store = useLoanStore();
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    const calculate = () => {
        const { loanAmount, loanTerm, interestRate } = store;

        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;

        let payment = 0;
        if (interestRate === 0) {
            payment = loanAmount / numberOfPayments;
        } else {
            payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }

        const total = payment * numberOfPayments;
        const interest = total - loanAmount;

        setMonthlyPayment(payment);
        setTotalPayment(total);
        setTotalInterest(interest);
    };

    useEffect(() => {
        calculate();
    }, [store]);

    return (
        <div>
            <Title level={2}>Loan Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Loan Details">
                        <Form layout="vertical">
                            <Form.Item label="Loan Amount">
                                <Row gutter={16}>
                                    <Col span={16}>
                                        <Slider
                                            min={1000} max={500000} step={500}
                                            value={store.loanAmount}
                                            onChange={store.setLoanAmount}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <InputNumber
                                            value={store.loanAmount}
                                            onChange={store.setLoanAmount}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            style={{ width: '100%' }}
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item label="Loan Term (Years)">
                                <Row gutter={16}>
                                    <Col span={16}>
                                        <Slider
                                            min={1} max={30} step={1}
                                            value={store.loanTerm}
                                            onChange={store.setLoanTerm}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <InputNumber
                                            value={store.loanTerm}
                                            onChange={store.setLoanTerm}
                                            style={{ width: '100%' }}
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item label="Interest Rate (%)">
                                <Row gutter={16}>
                                    <Col span={16}>
                                        <Slider
                                            min={0} max={20} step={0.1}
                                            value={store.interestRate}
                                            onChange={store.setInterestRate}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <InputNumber
                                            value={store.interestRate}
                                            onChange={store.setInterestRate}
                                            step={0.1}
                                            style={{ width: '100%' }}
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Repayment Summary" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: 30 }}>
                            <Statistic title="Monthly Payment" value={monthlyPayment} precision={2} prefix="$" valueStyle={{ color: '#3f8600', fontSize: '3rem' }} />
                        </div>

                        <Divider />

                        <Row gutter={16} style={{ textAlign: 'center' }}>
                            <Col span={12}>
                                <Statistic title="Total Principal" value={store.loanAmount} precision={2} prefix="$" />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Total Interest" value={totalInterest} precision={2} prefix="$" valueStyle={{ color: '#cf1322' }} />
                            </Col>
                        </Row>

                        <div style={{ marginTop: 20, textAlign: 'center' }}>
                            <Statistic title="Total Payment" value={totalPayment} precision={2} prefix="$" valueStyle={{ fontWeight: 'bold' }} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default LoanCalculator;
