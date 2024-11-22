import React, { memo } from 'react';
import { Statistic, StatisticCard } from '@ant-design/pro-card';
import { Typography } from 'antd';

interface ChartStatisticProps {
    percent?: number;
    unit?: string;
}

const ChartStatistic = memo(({ percent = 15, unit = '%' }: ChartStatisticProps) => {
    const { Text, Link, Title } = Typography;
    const tot = percent * 1250;
    const formattedCurrency = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(tot);

    return (
        <StatisticCard bordered title={[
            <b>Total</b>
        ]}>
            <Title style={{ color: '#30bf78' }} level={4}>{percent}{unit}</Title>
            <Text strong title='Estimation'>{formattedCurrency}</Text>
        </StatisticCard>
    );
});

export default ChartStatistic;
