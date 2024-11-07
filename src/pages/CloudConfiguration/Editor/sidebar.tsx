import { Col, Collapse, CollapseProps, Row } from 'antd';
import useStyles from '../css/styles';
import { ProCard } from '@ant-design/pro-components';
import { CaretRightOutlined } from '@ant-design/icons';

export default () => {
    const { styles } = useStyles();

    //fungsi drag node dari sidebar ke drop zone
    const onDragStart = (event: any, nodeType: any) => {
        event.dataTransfer.setData('application/reactflow', nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const cardStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 0px 2px',
        cursor: 'grab',
    };

    // const onChange = (key: string | string[]) => {
    //     console.log(key);
    // };

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Charts',
            children: (
                <Row gutter={[5, 5]}>
                    <Col xxl={6} md={6}>
                        <ProCard style={cardStyle}>
                            <div onDragStart={(event) => onDragStart(event, 'ChartGauge')} draggable>
                                <img src="/charts/gauge.png" alt="Gauge" height={50} />
                            </div>
                        </ProCard>
                    </Col>
                    <Col xxl={6} md={6}>
                        <ProCard style={cardStyle}>
                            <div onDragStart={(event) => onDragStart(event, 'ProgressCircle')} draggable>
                                <img src="/charts/progress-circle.png" alt="Progress Circle" height={50} />
                            </div>
                        </ProCard>
                    </Col>
                    <Col xxl={6} md={6}>
                        <ProCard style={cardStyle}>
                            <div onDragStart={(event) => onDragStart(event, 'ChartLiquid')} draggable>
                                <img src="/charts/liquid.png" alt="Liquid" height={50} />
                            </div>
                        </ProCard>
                    </Col>
                </Row >
            ),
        },
    ];

    return (
        <>
            <div className={styles.aside}>
                <h3><i><b>Components</b></i></h3>
                <Collapse
                    size="small"
                    items={items}
                    defaultActiveKey={['1']}
                    // onChange={onChange}
                    expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                />
            </div>
        </>
    );
};
