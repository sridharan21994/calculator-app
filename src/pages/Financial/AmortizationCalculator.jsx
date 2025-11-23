import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Slider, Row, Col, Card, Typography, Table, Statistic } from 'antd';
import { useAmortizationStore } from '../../store/useAmortizationStore';

const { Title } = Typography;

const AmortizationCalculator = () => {
    const store = useAmortizationStore();
    const [schedule, setSchedule] = useState([]);
    const [monthlyPayment, setMonthlyPayment] = useState(0);

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

        setMonthlyPayment(payment);

        let balance = loanAmount;
        const newSchedule = [];

        for (let i = 1; i <= numberOfPayments; i++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = payment - interestPayment;
            balance -= principalPayment;

            if (balance < 0) balance = 0;

            if (i <= 60 || i % 12 === 0 || i === numberOfPayments) { // Show first 5 years monthly, then yearly, or just limit for performance if needed. 
                // Actually, let's show yearly summary or just first few years?
                // For a table, showing 360 rows is fine in React but maybe paginated.
                // Let's just generate all and let Ant Design Table handle pagination.
                newSchedule.push({
                    key: i,
                    month: i,
                    payment: payment,
                    principal: principalPayment,
                    interest: interestPayment,
                    balance: balance
                });
            }
        }
        // Actually, let's just generate all of them for accuracy in the table.
        // Re-running loop to capture all for table data source.

        const fullSchedule = [];
        balance = loanAmount;
        for (let i = 1; i <= numberOfPayments; i++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = payment - interestPayment;
            balance -= principalPayment;
            if (balance < 0) balance = 0;

            fullSchedule.push({
                key: i,
                month: i,
                payment: payment,
                principal: principalPayment,
                interest: interestPayment,
                balance: balance
            });
        }

        setSchedule(fullSchedule);
    };

    useEffect(() => {
        calculate();
    }, [store]);

    const columns = [
        { title: 'Month', dataIndex: 'month', key: 'month' },
        { title: 'Payment', dataIndex: 'payment', key: 'payment', render: val => `$${val.toFixed(2)}` },
        { title: 'Principal', dataIndex: 'principal', key: 'principal', render: val => `$${val.toFixed(2)}` },
        { title: 'Interest', dataIndex: 'interest', key: 'interest', render: val => `$${val.toFixed(2)}` },
        { title: 'Balance', dataIndex: 'balance', key: 'balance', render: val => `$${val.toFixed(2)}` },
    ];

    return (
        <div>
            <Title level={2}>Amortization Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={8}>
                    <Card title="Loan Settings">
                        <Form layout="vertical">
                            <Form.Item label="Loan Amount">
                                <InputNumber
                                    value={store.loanAmount}
                                    onChange={store.setLoanAmount}
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item label="Loan Term (Years)">
                                <InputNumber value={store.loanTerm} onChange={store.setLoanTerm} style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item label="Interest Rate (%)">
                                <InputNumber value={store.interestRate} onChange={store.setInterestRate} step={0.1} style={{ width: '100%' }} />
                            </Form.Item>
                        </Form>
                        <div style={{ marginTop: 20, textAlign: 'center' }}>
                            <Statistic title="Monthly Payment" value={monthlyPayment} precision={2} prefix="$" valueStyle={{ color: '#3f8600' }} />
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={16}>
                    <Card title="Amortization Schedule">
                        <Table
                            dataSource={schedule}
                            columns={columns}
                            pagination={{ pageSize: 12 }}
                            size="small"
                            scroll={{ y: 400 }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AmortizationCalculator;
