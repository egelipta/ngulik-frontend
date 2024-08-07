import { PageContainer } from '@ant-design/pro-components';
import { Card, Col, Row } from 'antd';
import { memo } from 'react';
import { Gauge } from '@ant-design/plots';

export default memo(() => {

    const config = {
        percent: 0.75,
        range: {
            ticks: [0, 1 / 4, 2 / 3, 1],
            color: ['#F4664A', '#FAAD14', '#30BF78'],
        },
        indicator: {
            pointer: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
            pin: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
        },
        axis: {
            label: {
                formatter: (v: any) => {
                    // Mengubah nilai dari 0-1 menjadi 0-100
                    return (v * 100).toFixed(0);
                },
            },
        },
        statistic: {
            content: {
                style: {
                    fontSize: '36px',
                    lineHeight: '36px',
                },
                formatter: (datum: any) => {
                    return datum?.percent !== undefined
                        ? `${(datum.percent * 100).toFixed(0)}%`
                        : '0%';
                },
            },
        },
    };

    return (
        <PageContainer>
            <Card
                style={{
                    borderRadius: 10,
                }}
            >
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Labore, harum qui. Nam ratione dolorem magni voluptas quasi, accusamus quisquam sunt maxime veniam sapiente dignissimos iste aliquid officiis assumenda, mollitia at.
                <Row gutter={[10, 10]} style={{ marginTop: 50, marginBottom: 25 }}>
                    <Col xxl={6}>
                        <Card
                            title="Gauge"
                            style={{
                                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <Gauge {...config} />
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card
                            style={{
                                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis nostrum veniam optio? Quis iure qui animi eos minus eveniet explicabo, sint maiores. Sint ratione obcaecati blanditiis ipsum magni voluptas eveniet.
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card
                            style={{
                                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis nostrum veniam optio? Quis iure qui animi eos minus eveniet explicabo, sint maiores. Sint ratione obcaecati blanditiis ipsum magni voluptas eveniet.
                        </Card>
                    </Col>
                    <Col xxl={6}>
                        <Card
                            style={{
                                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis nostrum veniam optio? Quis iure qui animi eos minus eveniet explicabo, sint maiores. Sint ratione obcaecati blanditiis ipsum magni voluptas eveniet.
                        </Card>
                    </Col>
                </Row>
            </Card>
        </PageContainer>
    );
});
