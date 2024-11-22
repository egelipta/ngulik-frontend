import React, { memo } from 'react';
import ProCard from '@ant-design/pro-card';
interface ChartTextsProps {
    texts?: string;
}

const Texts = memo(({ texts = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, reprehenderit.' }: ChartTextsProps) => {

    return (
        <ProCard
            bordered
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}
        >
            {texts}
        </ProCard>
    );
});

export default Texts;
