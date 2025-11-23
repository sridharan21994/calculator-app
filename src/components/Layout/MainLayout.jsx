import React, { useState } from 'react';
import { Layout, Menu, Button, theme, Input } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { motion } from 'framer-motion';

const { Header, Sider, Content, Footer } = Layout;

const MainLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const location = useLocation();

    // Flatten categories for menu items
    const items = [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: 'Home',
        },
        ...categories.map(cat => ({
            key: cat.path,
            icon: React.createElement(cat.icon),
            label: cat.title,
            children: cat.links.map(link => ({
                key: link.path,
                label: link.name,
            })),
        }))
    ];

    const handleMenuClick = (e) => {
        navigate(e.key);
    };

    // Find current open keys based on location
    const getOpenKeys = () => {
        const path = location.pathname;
        const category = categories.find(cat => path.startsWith(cat.path));
        return category ? [category.path] : [];
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} width={280}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    zIndex: 100,
                    background: '#001529'
                }}
            >
                <div className="demo-logo-vertical" style={{ height: 64, margin: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ color: 'white', fontSize: collapsed ? '12px' : '20px', margin: 0, transition: 'all 0.3s' }}>
                        {collapsed ? 'Calc' : 'Calculator.net'}
                    </h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    defaultOpenKeys={getOpenKeys()}
                    items={items}
                    onClick={handleMenuClick}
                />
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 280, transition: 'all 0.2s' }}>
                <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 24 }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div style={{ width: 300 }}>
                        <Input prefix={<SearchOutlined />} placeholder="Search calculators..." />
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        overflow: 'initial'
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        key={location.pathname}
                    >
                        {children}
                    </motion.div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Calculator.net Clone ©{new Date().getFullYear()} Created with Ant Design
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
