import React, { useState } from 'react';
import { Form, InputNumber, Select, Row, Col, Card, Typography, Statistic, Button, Radio } from 'antd';
import { create, all } from 'mathjs';

const { Title } = Typography;
const { Option } = Select;
const math = create(all);

const FractionCalculator = () => {
    const [num1, setNum1] = useState(1);
    const [den1, setDen1] = useState(2);
    const [num2, setNum2] = useState(1);
    const [den2, setDen2] = useState(3);
    const [operation, setOperation] = useState('add');
    const [result, setResult] = useState('');

    const calculate = () => {
        try {
            const f1 = math.fraction(num1, den1);
            const f2 = math.fraction(num2, den2);
            let res;

            if (operation === 'add') res = math.add(f1, f2);
            if (operation === 'subtract') res = math.subtract(f1, f2);
            if (operation === 'multiply') res = math.multiply(f1, f2);
            if (operation === 'divide') res = math.divide(f1, f2);

            setResult(`${res.n}/${res.d}`);
        } catch (e) {
            setResult('Error');
        }
    };

    return (
        <div>
            <Title level={2}>Fraction Calculator</Title>
            <Card>
                <Row gutter={16} align="middle" justify="center">
                    <Col>
                        <InputNumber value={num1} onChange={setNum1} style={{ width: 60, textAlign: 'center' }} />
                        <div style={{ borderTop: '2px solid #000', margin: '5px 0' }}></div>
                        <InputNumber value={den1} onChange={setDen1} style={{ width: 60, textAlign: 'center' }} />
                    </Col>
                    <Col>
                        <Select value={operation} onChange={setOperation} style={{ width: 60 }}>
                            <Option value="add">+</Option>
                            <Option value="subtract">-</Option>
                            <Option value="multiply">×</Option>
                            <Option value="divide">÷</Option>
                        </Select>
                    </Col>
                    <Col>
                        <InputNumber value={num2} onChange={setNum2} style={{ width: 60, textAlign: 'center' }} />
                        <div style={{ borderTop: '2px solid #000', margin: '5px 0' }}></div>
                        <InputNumber value={den2} onChange={setDen2} style={{ width: 60, textAlign: 'center' }} />
                    </Col>
                    <Col>
                        <Button type="primary" onClick={calculate}>=</Button>
                    </Col>
                    <Col>
                        <Title level={3}>{result}</Title>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default FractionCalculator;
