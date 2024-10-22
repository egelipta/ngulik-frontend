import { Col, Collapse, CollapseProps, Row } from 'antd';
import useStyles from '../css/styles';
import { ProCard } from '@ant-design/pro-components';
import { HighlightOutlined, CopyOutlined, CaretRightOutlined } from '@ant-design/icons';
import ChartGauge from '../Components/Charts/gauge';

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
      label: 'Icons 1',
      children: (
        <Row gutter={[5, 5]}>
          <Col xxl={6} md={6}>
            <ProCard style={cardStyle}>
              <div onDragStart={(event) => onDragStart(event, 'IkonSatu')} draggable>
                <HighlightOutlined style={{ fontSize: 50 }} />
              </div>
            </ProCard>
          </Col>
          <Col xxl={6} md={6}>
            <ProCard style={cardStyle}>
              <div onDragStart={(event) => onDragStart(event, 'IkonDua')} draggable>
                <CopyOutlined style={{ fontSize: 50 }} />
              </div>
            </ProCard>
          </Col>
        </Row>
      ),
    },
    {
      key: '2',
      label: 'Icons 2',
      children: (
        <Row gutter={[5, 5]}>
          <Col xxl={6} md={6}>
            <ProCard style={cardStyle}>
              <div onDragStart={(event) => onDragStart(event, 'Server')} draggable>
                <img src="/icons2/server.png" alt="Server" height={50} />
              </div>
            </ProCard>
          </Col>
          <Col xxl={6} md={6}>
            <ProCard style={cardStyle}>
              <div onDragStart={(event) => onDragStart(event, 'RackServer')} draggable>
                <img src="/icons2/rack-server.png" alt="Rack Server" height={50} />
              </div>
            </ProCard>
          </Col>
          <Col xxl={6} md={6}>
            <ProCard style={cardStyle}>
              <div onDragStart={(event) => onDragStart(event, 'Cloud')} draggable>
                <img src="/icons2/cloud.png" alt="Cloud Server" height={50} />
              </div>
            </ProCard>
          </Col>
          <Col xxl={6} md={6}>
            <ProCard style={cardStyle}>
              <div onDragStart={(event) => onDragStart(event, 'Pc')} draggable>
                <img src="/icons2/pc.png" alt="Personal COmputer" height={50} />
              </div>
            </ProCard>
          </Col>
        </Row>
      ),
    },
    {
      key: '3',
      label: 'Icons 3',
      children: (
        <Row gutter={[5, 5]}>
          <Col xxl={6} md={6}>
            <ProCard style={cardStyle}>
              <div onDragStart={(event) => onDragStart(event, 'Tree')} draggable>
                <img src="/icons3/tree.png" alt="Tree" height={50} />
              </div>
            </ProCard>
          </Col>
          <Col xxl={6} md={6}>
            <ProCard style={cardStyle}>
              <div onDragStart={(event) => onDragStart(event, 'Car')} draggable>
                <img src="/icons3/car.png" alt="Car" height={50} />
              </div>
            </ProCard>
          </Col>
          <Col xxl={6} md={6}>
            <ProCard style={cardStyle}>
              <div onDragStart={(event) => onDragStart(event, 'Electricity')} draggable>
                <img src="/icons3/electricity.png" alt="Electricity" height={50} />
              </div>
            </ProCard>
          </Col>
          <Col xxl={6} md={6}>
            <ProCard style={cardStyle}>
              <div onDragStart={(event) => onDragStart(event, 'Generator')} draggable>
                <img src="/icons3/generator.png" alt="Generator" height={50} />
              </div>
            </ProCard>
          </Col>
          <Col xxl={6} md={6}>
            <ProCard style={cardStyle}>
              <div onDragStart={(event) => onDragStart(event, 'Building')} draggable>
                <img src="/icons3/building.png" alt="Building" height={50} />
              </div>
            </ProCard>
          </Col>
        </Row>
      ),
    },
    {
      key: '4',
      label: 'Icons 4',
      children: (
        <Row gutter={[5, 5]}>
          <Col xxl={6} md={6}>
            <ProCard style={cardStyle}>
              <div onDragStart={(event) => onDragStart(event, 'Circle1')} draggable>
                <img src="/icons4/circle-1.png" alt="Circle 1" height={50} />
              </div>
            </ProCard>
          </Col>
          <Col xxl={6} md={6}>
            <ProCard style={cardStyle}>
              <div onDragStart={(event) => onDragStart(event, 'Circle2')} draggable>
                <img src="/icons4/circle-2.png" alt="Circle 2" height={50} />
              </div>
            </ProCard>
          </Col>
          <Col xxl={6} md={6}>
            <ProCard style={cardStyle}>
              <div onDragStart={(event) => onDragStart(event, 'Circle3')} draggable>
                <img src="/icons4/circle-3.png" alt="Circle 3" height={50} />
              </div>
            </ProCard>
          </Col>
        </Row>
      ),
    },
    {
      key: '5',
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
                <img src="/charts/progress-circle.png" alt="Gauge" height={50} />
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
          defaultActiveKey={['5']}
          // onChange={onChange}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        />
      </div>
    </>
  );
};
