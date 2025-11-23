import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Slider, Row, Col, Card, Typography, Divider, Statistic } from 'antd';
import { useMortgageStore } from '../../store/useMortgageStore';

// Actually, for simplicity and to avoid extra heavy deps if not installed, I'll use a simple CSS based visualization or just text first.
// Wait, I didn't install @ant-design/plots. I'll stick to text and maybe a simple CSS bar.
// Or I can install it. The user said "really good UI". Charts are good.
// Let's stick to standard Ant Design components for now to avoid install errors if I miss it.
// I'll use a simple custom SVG or CSS pie chart if needed, or just the numbers.

const { Title, Text } = Typography;

const MortgageCalculator = () => {
    const store = useMortgageStore();
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [breakdown, setBreakdown] = useState({});

    const calculate = () => {
        const { homePrice, downPayment, loanTerm, interestRate, propertyTax, homeInsurance, hoa } = store;

        const principal = homePrice - downPayment;
        const monthlyRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;

        // Mortgage Principal & Interest
        let pi = 0;
        if (interestRate === 0) {
            pi = principal / numberOfPayments;
        } else {
            pi = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
        }

        const monthlyPropertyTax = (homePrice * (propertyTax / 100)) / 12;
        const monthlyHomeInsurance = homeInsurance / 12;
        const totalMonthly = pi + monthlyPropertyTax + monthlyHomeInsurance + hoa;

        setMonthlyPayment(totalMonthly);
        setBreakdown({
            pi,
            propertyTax: monthlyPropertyTax,
            homeInsurance: monthlyHomeInsurance,
            hoa
        });
    };

    useEffect(() => {
        calculate();
    }, [store]);

    return (
        <div>
            <Title level={2}>Mortgage Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Loan Details">
                        <Form layout="vertical">
                            <Form.Item label="Home Price">
                                <Row gutter={16}>
                                    <Col span={16}>
                                        <Slider
                                            min={50000} max={2000000} step={1000}
                                            value={store.homePrice}
                                            onChange={store.setHomePrice}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <InputNumber
                                            value={store.homePrice}
                                            onChange={store.setHomePrice}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            style={{ width: '100%' }}
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item label="Down Payment">
                                <Row gutter={16}>
                                    <Col span={16}>
                                        <Slider
                                            min={0} max={store.homePrice} step={1000}
                                            value={store.downPayment}
                                            onChange={store.setDownPayment}
                                        />
                                    </Col>
                                    <Col span={8}>
                                        <InputNumber
                                            value={store.downPayment}
                                            onChange={store.setDownPayment}
                                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            style={{ width: '100%' }}
                                        />
                                    </Col>
                                </Row>
                            </Form.Item>

                            <Form.Item label="Loan Term (Years)">
                                <InputNumber value={store.loanTerm} onChange={store.setLoanTerm} style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item label="Interest Rate (%)">
                                <InputNumber value={store.interestRate} onChange={store.setInterestRate} step={0.1} style={{ width: '100%' }} />
                            </Form.Item>

                            <Divider>Additional Costs</Divider>

                            <Form.Item label="Property Tax (% per year)">
                                <InputNumber value={store.propertyTax} onChange={store.setPropertyTax} step={0.1} style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item label="Home Insurance ($ per year)">
                                <InputNumber value={store.homeInsurance} onChange={store.setHomeInsurance} style={{ width: '100%' }} />
                            </Form.Item>

                            <Form.Item label="HOA Fees ($ per month)">
                                <InputNumber value={store.hoa} onChange={store.setHoa} style={{ width: '100%' }} />
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Monthly Payment Breakdown" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: 30 }}>
                            <Statistic title="Total Monthly Payment" value={monthlyPayment} precision={2} prefix="$" valueStyle={{ color: '#3f8600', fontSize: '3rem' }} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text>Principal & Interest</Text>
                                <Text strong>${breakdown.pi?.toFixed(2)}</Text>
                            </div>
                            <div style={{ height: 10, background: '#f0f0f0', borderRadius: 5, overflow: 'hidden' }}>
                                <div style={{ width: `${(breakdown.pi / monthlyPayment) * 100}%`, background: '#1890ff', height: '100%' }} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text>Property Tax</Text>
                                <Text strong>${breakdown.propertyTax?.toFixed(2)}</Text>
                            </div>
                            <div style={{ height: 10, background: '#f0f0f0', borderRadius: 5, overflow: 'hidden' }}>
                                <div style={{ width: `${(breakdown.propertyTax / monthlyPayment) * 100}%`, background: '#52c41a', height: '100%' }} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text>Home Insurance</Text>
                                <Text strong>${breakdown.homeInsurance?.toFixed(2)}</Text>
                            </div>
                            <div style={{ height: 10, background: '#f0f0f0', borderRadius: 5, overflow: 'hidden' }}>
                                <div style={{ width: `${(breakdown.homeInsurance / monthlyPayment) * 100}%`, background: '#faad14', height: '100%' }} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Text>HOA</Text>
                                <Text strong>${breakdown.hoa?.toFixed(2)}</Text>
                            </div>
                            <div style={{ height: 10, background: '#f0f0f0', borderRadius: 5, overflow: 'hidden' }}>
                                <div style={{ width: `${(breakdown.hoa / monthlyPayment) * 100}%`, background: '#f5222d', height: '100%' }} />
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default MortgageCalculator;
