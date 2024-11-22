import { PageContainer, ProCard } from '@ant-design/pro-components';
import React, { memo, useEffect, useState } from 'react';
import { workfloweditorApiV1WorkfloweditorWorkfloweditorGetDataGet } from '@/services/pjvms/workflowEditor';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'antd';
import '../css/style.css';
import ChartGauge from '../Components/Charts/gauge';
import ProgressCircle from '../Components/Charts/progress-circle';
import ChartLiquid from '../Components/Charts/liquid';
import Masonry from 'react-masonry-css';

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

    // const judul = datas.map((dataItem) => dataItem.name);
    const breakpointColumns = {
        default: 4,
        1600: 3,
        1200: 2,
        700: 1,
    };

    return (
        <PageContainer>
            <Masonry
                breakpointCols={breakpointColumns}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {datas.map((d) =>
                    d.nodesjson.map((node: any) => {
                        const NodeComponent = nodeTypes[node.type as NodeType];
                        return NodeComponent ? (
                            <div key={node.id} className="masonry-item">
                                <NodeComponent data={node.data} />
                            </div>
                        ) : null;
                    })
                )}
            </Masonry>
        </PageContainer>
    );
});
