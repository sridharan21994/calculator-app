import React, { useState } from 'react';
import { Card, Button, Row, Col, Typography, Input } from 'antd';
import { create, all } from 'mathjs';

const { Title } = Typography;

// Configure mathjs
const math = create(all);

const ScientificCalculator = () => {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('');

    const handlePress = (val) => {
        setExpression(prev => prev + val);
    };

    const handleClear = () => {
        setExpression('');
        setResult('');
    };

    const handleBackspace = () => {
        setExpression(prev => prev.slice(0, -1));
    };

    const handleCalculate = () => {
        try {
            // Replace visual symbols with mathjs compatible ones if needed
            // e.g. '×' -> '*', '÷' -> '/'
            // But I'll use standard symbols in buttons for simplicity or map them.
            const evalResult = math.evaluate(expression);
            setResult(evalResult.toString());
        } catch (error) {
            setResult('Error');
        }
    };

    const buttons = [
        ['(', ')', '%', 'AC'],
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['0', '.', '=', '+'],
        ['sin', 'cos', 'tan', '^'],
        ['sqrt', 'log', 'pi', 'e']
    ];

    return (
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
            <Title level={2} style={{ textAlign: 'center' }}>Scientific Calculator</Title>
            <Card>
                <div style={{ marginBottom: 20, textAlign: 'right' }}>
                    <div style={{ minHeight: 30, fontSize: 18, color: '#888' }}>{expression || '0'}</div>
                    <div style={{ fontSize: 32, fontWeight: 'bold', color: '#000' }}>{result || (expression ? '' : '0')}</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                    {buttons.flat().map((btn) => (
                        <Button
                            key={btn}
                            type={btn === '=' ? 'primary' : 'default'}
                            shape="round"
                            size="large"
                            onClick={() => {
                                if (btn === 'AC') handleClear();
                                else if (btn === '=') handleCalculate();
                                else if (btn === 'pi') handlePress('pi');
                                else if (btn === 'e') handlePress('e');
                                else if (['sin', 'cos', 'tan', 'sqrt', 'log'].includes(btn)) handlePress(btn + '(');
                                else handlePress(btn);
                            }}
                            style={{ height: 60, fontSize: 18 }}
                        >
                            {btn}
                        </Button>
                    ))}
                    <Button onClick={handleBackspace} size="large" style={{ height: 60, fontSize: 18 }} danger>DEL</Button>
                </div>
            </Card>
        </div>
    );
};

export default ScientificCalculator;
