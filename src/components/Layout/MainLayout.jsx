import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, theme, Drawer, Grid, AutoComplete, Input } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    HomeOutlined
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { categories } from '../../data/categories';
import { motion } from 'framer-motion';

const { Header, Sider, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const MainLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [options, setOptions] = useState([]);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const location = useLocation();
    const screens = useBreakpoint();

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

    // Prepare search data
    const allCalculators = categories.flatMap(cat =>
        cat.links.map(link => ({
            value: link.name,
            label: (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{link.name}</span>
                    <span style={{ color: '#aaa', fontSize: '12px' }}>{cat.title}</span>
                </div>
            ),
            path: link.path
        }))
    );

    const handleSearch = (value) => {
        if (!value) {
            setOptions([]);
            return;
        }
        const filtered = allCalculators.filter(calc =>
            calc.value.toLowerCase().includes(value.toLowerCase())
        );
        setOptions(filtered);
    };

    const onSelect = (value, option) => {
        navigate(option.path);
        if (!screens.md) {
            setMobileOpen(false);
        }
    };

    const handleMenuClick = (e) => {
        navigate(e.key);
        if (!screens.md) {
            setMobileOpen(false);
        }
    };

    // Find current open keys based on location
    const getOpenKeys = () => {
        const path = location.pathname;
        const category = categories.find(cat => path.startsWith(cat.path));
        return category ? [category.path] : [];
    };

    // Close mobile drawer on route change (handled in click, but good backup)
    useEffect(() => {
        if (!screens.md) {
            setMobileOpen(false);
        }
    }, [location]);

    const isMobile = !screens.md;

    const MenuContent = (
        <>
            <div className="demo-logo-vertical" style={{ height: 64, margin: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <h1 style={{ color: 'white', fontSize: collapsed && !isMobile ? '12px' : '20px', margin: 0, transition: 'all 0.3s' }}>
                    {collapsed && !isMobile ? 'Calc' : 'Calculator.net'}
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
        </>
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* Desktop Sider */}
            {!isMobile && (
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
                    {MenuContent}
                </Sider>
            )}

            {/* Mobile Drawer */}
            {isMobile && (
                <Drawer
                    placement="left"
                    onClose={() => setMobileOpen(false)}
                    open={mobileOpen}
                    styles={{ body: { padding: 0, background: '#001529' } }}
                    width={280}
                    closable={false}
                >
                    {MenuContent}
                </Drawer>
            )}

            <Layout style={{
                marginLeft: isMobile ? 0 : (collapsed ? 80 : 280),
                transition: 'all 0.2s'
            }}>
                <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingRight: 24 }}>
                    <Button
                        type="text"
                        icon={isMobile ? <MenuUnfoldOutlined /> : (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)}
                        onClick={() => isMobile ? setMobileOpen(true) : setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div style={{ width: isMobile ? 'auto' : 300, flex: isMobile ? 1 : 'none', marginRight: isMobile ? 16 : 0 }}>
                        <AutoComplete
                            style={{ width: '100%' }}
                            options={options}
                            onSelect={onSelect}
                            onSearch={handleSearch}
                        >
                            <Input prefix={<SearchOutlined />} placeholder="Search calculators..." />
                        </AutoComplete>
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
