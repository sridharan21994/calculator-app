import React, { useState } from 'react';
import { Form, InputNumber, Select, Row, Col, Card, Typography, Statistic, Button, Input } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const GPACalculator = () => {
    const [courses, setCourses] = useState([
        { name: 'Course 1', credits: 3, grade: 4.0 },
        { name: 'Course 2', credits: 3, grade: 3.7 },
        { name: 'Course 3', credits: 3, grade: 3.3 },
    ]);
    const [gpa, setGpa] = useState(0);

    const gradePoints = {
        'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7,
        'D+': 1.3, 'D': 1.0, 'F': 0.0
    };

    const calculate = () => {
        let totalPoints = 0;
        let totalCredits = 0;

        courses.forEach(c => {
            if (c.credits > 0) {
                totalPoints += c.grade * c.credits;
                totalCredits += c.credits;
            }
        });

        if (totalCredits === 0) setGpa(0);
        else setGpa(totalPoints / totalCredits);
    };

    const addCourse = () => {
        setCourses([...courses, { name: `Course ${courses.length + 1}`, credits: 3, grade: 4.0 }]);
    };

    const removeCourse = (index) => {
        const newCourses = [...courses];
        newCourses.splice(index, 1);
        setCourses(newCourses);
    };

    const updateCourse = (index, field, value) => {
        const newCourses = [...courses];
        newCourses[index][field] = value;
        setCourses(newCourses);
    };

    // Auto calc on change
    React.useEffect(() => {
        calculate();
    }, [courses]);

    return (
        <div>
            <Title level={2}>GPA Calculator</Title>
            <Row gutter={24}>
                <Col xs={24} lg={16}>
                    <Card title="Courses">
                        {courses.map((course, index) => (
                            <Row key={index} gutter={8} style={{ marginBottom: 10 }} align="middle">
                                <Col span={8}>
                                    <Input
                                        placeholder="Course Name"
                                        value={course.name}
                                        onChange={e => updateCourse(index, 'name', e.target.value)}
                                    />
                                </Col>
                                <Col span={6}>
                                    <InputNumber
                                        placeholder="Credits"
                                        value={course.credits}
                                        onChange={val => updateCourse(index, 'credits', val)}
                                        min={0}
                                        style={{ width: '100%' }}
                                    />
                                </Col>
                                <Col span={6}>
                                    <Select
                                        value={course.grade}
                                        onChange={val => updateCourse(index, 'grade', val)}
                                        style={{ width: '100%' }}
                                    >
                                        {Object.entries(gradePoints).map(([letter, point]) => (
                                            <Option key={letter} value={point}>{letter} ({point})</Option>
                                        ))}
                                        {/* Allow manual numeric entry? Maybe later. For now standard scale. */}
                                    </Select>
                                </Col>
                                <Col span={4}>
                                    <Button danger icon={<DeleteOutlined />} onClick={() => removeCourse(index)} />
                                </Col>
                            </Row>
                        ))}
                        <Button type="dashed" onClick={addCourse} block icon={<PlusOutlined />}>
                            Add Course
                        </Button>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card title="Result" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Statistic title="GPA" value={gpa} precision={2} valueStyle={{ color: '#3f8600', fontSize: '4rem' }} />
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default GPACalculator;
