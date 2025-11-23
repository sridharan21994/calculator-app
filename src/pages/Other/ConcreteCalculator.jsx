import React, { useState, useEffect } from 'react';
import { Form, InputNumber, Select, Row, Col, Card, Typography, Statistic, Divider } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

const ConcreteCalculator = () => {
    // Slab/Footing
    const [length, setLength] = useState(10);
    const [width, setWidth] = useState(10);
    const [thickness, setThickness] = useState(4);

    const [unit, setUnit] = useState('feet'); // feet/inches
    const [volume, setVolume] = useState({ cubicFeet: 0, cubicYards: 0, bags60: 0, bags80: 0 });

    const calculate = () => {
        // Convert everything to feet
        let l = length;
        let w = width;
        let t = thickness / 12; // thickness usually in inches

        if (unit === 'meters') {
            // Convert to feet for standard US bags calculation or just show cubic meters
            // Let's stick to US units as default for "Concrete Calculator" usually implies bags of 60/80lb
            // But if metric, we show cubic meters.
            // Let's keep it simple: US Customary for now as default.
        }

        const volCubicFeet = l * w * t;
        const volCubicYards = volCubicFeet / 27;

        // Bags
        // 60lb bag yields ~0.45 cubic feet
        // 80lb bag yields ~0.60 cubic feet
        const bags60 = volCubicFeet / 0.45;
        const bags80 = volCubicFeet / 0.60;

        setVolume({
            cubicFeet: volCubicFeet,
            cubicYards: volCubicYards,
            bags60: Math.ceil(bags60),
            bags80: Math.ceil(bags80)
        });
    };

    useEffect(() => {
        calculate();
    }, [length, width, thickness]);

    return (
        <div>
            <Title level={2}>Concrete Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={12}>
                    <Card title="Slab / Footing Dimensions">
                        <Form layout="vertical">
                            <Form.Item label="Length (feet)">
                                <InputNumber value={length} onChange={setLength} style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item label="Width (feet)">
                                <InputNumber value={width} onChange={setWidth} style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item label="Thickness (inches)">
                                <InputNumber value={thickness} onChange={setThickness} style={{ width: '100%' }} />
                            </Form.Item>
                        </Form>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title="Required Concrete" style={{ height: '100%' }}>
                        <Row gutter={16} style={{ textAlign: 'center' }}>
                            <Col span={12}>
                                <Statistic title="Volume (Cubic Yards)" value={volume.cubicYards} precision={2} />
                            </Col>
                            <Col span={12}>
                                <Statistic title="Volume (Cubic Feet)" value={volume.cubicFeet} precision={2} />
                            </Col>
                        </Row>
                        <Divider />
                        <div style={{ textAlign: 'center' }}>
                            <Title level={4}>Pre-mixed Bags Needed</Title>
                            <Row gutter={16} style={{ marginTop: 20 }}>
                                <Col span={12}>
                                    <Statistic title="60lb Bags" value={volume.bags60} valueStyle={{ color: '#1890ff' }} />
                                </Col>
                                <Col span={12}>
                                    <Statistic title="80lb Bags" value={volume.bags80} valueStyle={{ color: '#1890ff' }} />
                                </Col>
                            </Row>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ConcreteCalculator;
