import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Slider, Row, Col, Card, Typography, Statistic, Divider } from 'antd';
import { useAutoLoanStore } from '../../store/useAutoLoanStore';

const { Title } = Typography;

const AutoLoanCalculator = () => {
    const store = useAutoLoanStore();
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    const calculate = () => {
        const { autoPrice, loanTerm, interestRate, downPayment, tradeInValue, salesTax, fees } = store;

        const taxableAmount = autoPrice - tradeInValue;
        const taxAmount = taxableAmount * (salesTax / 100);
        const loanAmount = taxableAmount + taxAmount + fees - downPayment;

        if (loanAmount <= 0) {
            setMonthlyPayment(0);
            setTotalPayment(0);
            setTotalInterest(0);
            return;
        }

        const monthlyRate = interestRate / 100 / 12;

        let payment = 0;
        if (interestRate === 0) {
            payment = loanAmount / loanTerm;
        } else {
            payment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
        }

        const total = payment * loanTerm;
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
            <Title level={2}>Auto Loan Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Auto Loan Details">
                        <Form layout="vertical">
                            <Form.Item label="Auto Price">
                                <Row gutter={16}>
                                    <Col span={16}>
                                        <Slider
                                            min={1000} max={100000} step={500}
                                            value={store.autoPrice}
                                            onChange={store.setAutoPrice}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <InputNumber
                                            value={store.autoPrice}
                                            onChange={store.setAutoPrice}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            style={{ width: '100%' }}
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item label="Loan Term (Months)">
                                <Row gutter={16}>
                                    <Col span={16}>
                                        <Slider
                                            min={12} max={96} step={12}
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

                            <Form.Item label="Down Payment">
                                <InputNumber
                                    value={store.downPayment}
                                    onChange={store.setDownPayment}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Form.Item label="Trade-in Value">
                                <InputNumber
                                    value={store.tradeInValue}
                                    onChange={store.setTradeInValue}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>

                            <Row gutter={16}>
                                <Col span={12}>
                                    <Form.Item label="Sales Tax (%)">
                                        <InputNumber
                                            value={store.salesTax}
                                            onChange={store.setSalesTax}
                                            step={0.1}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item label="Fees ($)">
                                        <InputNumber
                                            value={store.fees}
                                            onChange={store.setFees}
                                            style={{ width: '100%' }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Payment Summary" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: 30 }}>
                            <Statistic title="Monthly Payment" value={monthlyPayment} precision={2} prefix="$" valueStyle={{ color: '#3f8600', fontSize: '3rem' }} />
                        </div>

                        <Divider />

                        <Row gutter={16} style={{ textAlign: 'center' }}>
                            <Col span={12}>
                                <Statistic title="Total Principal" value={totalPayment - totalInterest} precision={2} prefix="$" />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Total Interest" value={totalInterest} precision={2} prefix="$" valueStyle={{ color: '#cf1322' }} />
                            </Col>
                        </Row>

                        <div style={{ marginTop: 20, textAlign: 'center' }}>
                            <Statistic title="Total Cost of Car" value={totalPayment + store.downPayment + store.tradeInValue} precision={2} prefix="$" valueStyle={{ fontWeight: 'bold' }} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AutoLoanCalculator;
