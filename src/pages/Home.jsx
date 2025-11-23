import React from 'react';
import { Typography, Row, Col, Card, List } from 'antd';
import { Link } from 'react-router-dom';
import { categories } from '../data/categories';
import { motion } from 'framer-motion';

const { Title } = Typography;

const Home = () => {
    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
                <Title level={2}>Welcome to Calculator.net</Title>
                <p>Free online calculators for everything.</p>
            </div>

            <Row gutter={[24, 24]}>
                {categories.map((category, index) => (
                    <Col xs={24} md={12} lg={12} xl={6} key={category.title}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card
                                title={<span><category.icon /> {category.title}</span>}
                                hoverable
                                style={{ height: '100%' }}
                            >
                                <List
                                    size="small"
                                    dataSource={category.links}
                                    renderItem={(item) => (
                                        <List.Item>
                                            <Link to={item.path}>{item.name}</Link>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </motion.div>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default Home;
