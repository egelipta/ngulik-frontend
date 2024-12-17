import ChartGauge from "./gauge";
import ChartLine from "./line";
import ChartLiquid from "./liquid";
import ChartRing from "./ring";
import ChartPie from "./pie";
import ChartMultiLine from "./multi-line";
import ChartArea from "./area";
import ChartColumn from "./column";
import ChartRadar from "./radar";

const TheComponent: Record<string, React.ElementType> = {
    ChartGauge,
    ChartLine,
    ChartLiquid,
    ChartRing,
    ChartPie,
    ChartMultiLine,
    ChartArea,
    ChartColumn,
    ChartRadar,
};

export default TheComponent;