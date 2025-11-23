import React, { useState } from 'react';
import { Form, InputNumber, Row, Col, Card, Typography, Statistic, Button, Table } from 'antd';

const { Title } = Typography;

const GradeCalculator = () => {
    const [currentGrade, setCurrentGrade] = useState(85);
    const [targetGrade, setTargetGrade] = useState(90);
    const [finalWeight, setFinalWeight] = useState(20); // percentage
    const [needed, setNeeded] = useState(0);

    const calculate = () => {
        // Current grade is based on (100 - finalWeight)%
        // Target = (Current * (1 - w)) + (Final * w)
        // Final * w = Target - (Current * (1 - w))
        // Final = (Target - (Current * (1 - w))) / w

        const w = finalWeight / 100;
        const currentPart = currentGrade * (1 - w);
        const required = (targetGrade - currentPart) / w;

        setNeeded(required);
    };

    React.useEffect(() => {
        calculate();
    }, [currentGrade, targetGrade, finalWeight]);

    return (
        <div>
            <Title level={2}>Grade Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Final Grade Calculator">
                        <Form layout="vertical">
                            <Form.Item label="Current Grade (%)">
                                <InputNumber value={currentGrade} onChange={setCurrentGrade} style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item label="Target Grade (%)">
                                <InputNumber value={targetGrade} onChange={setTargetGrade} style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item label="Final Exam Weight (%)">
                                <InputNumber value={finalWeight} onChange={setFinalWeight} style={{ width: '100%' }} />
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Result" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Statistic
                                title="Grade Needed on Final Exam"
                                value={needed}
                                precision={2}
                                suffix="%"
                                valueStyle={{ color: needed > 100 ? '#cf1322' : '#3f8600', fontSize: '3rem' }}
                            />
                            {needed > 100 && <div style={{ color: 'red', marginTop: 10 }}>Impossible without extra credit!</div>}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default GradeCalculator;
