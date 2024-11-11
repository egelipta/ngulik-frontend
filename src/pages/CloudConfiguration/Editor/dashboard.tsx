import { PageContainer, ProCard } from '@ant-design/pro-components';
import React, { memo, useEffect, useState } from 'react';
import { workfloweditorApiV1WorkfloweditorWorkfloweditorGetDataGet } from '@/services/pjvms/workflowEditor';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'antd';

import ChartGauge from '../Components/Charts/gauge';
import ProgressCircle from '../Components/Charts/progress-circle';
import ChartLiquid from '../Components/Charts/liquid';

// Define the valid node types as a union type
type NodeType = 'ChartGauge' | 'ProgressCircle' | 'ChartLiquid';

// Define the nodeTypes object with the correct types for each chart component
const nodeTypes: {
    [key in NodeType]: (node: any) => React.JSX.Element;
} = {
    ChartGauge: ChartGauge,
    ProgressCircle: ProgressCircle,
    ChartLiquid: ChartLiquid,
};

export default memo(() => {
    const { idParam } = useParams();
    const [datas, setDatas] = useState<any[]>([]);

    const getDataWorkflow = async () => {
        try {
            const result = await workfloweditorApiV1WorkfloweditorWorkfloweditorGetDataGet({ id: idParam });
            setDatas(result);
            console.log(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getDataWorkflow();
    }, []);

    const judul = datas.map((dataItem) => dataItem.name);

    return (
        <PageContainer extra={judul}>
            {datas.map((dataItem, index) => (
                <Row gutter={[5, 5]} key={index}>
                    {dataItem.nodesjson.map((node: any, nodeIndex: number) => {
                        // Make sure node.type is one of the keys in nodeTypes
                        const NodeComponent = nodeTypes[node.type as NodeType];

                        return (
                            <Col key={nodeIndex} span={6}>
                                {/* <ProCard style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}

                                {NodeComponent && (
                                    <NodeComponent
                                        // style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                        selected={false}
                                        data={node.data}
                                    />
                                )}
                                {/* </ProCard> */}
                            </Col>
                        );
                    })}
                </Row>
            ))}
        </PageContainer>
    );
});
