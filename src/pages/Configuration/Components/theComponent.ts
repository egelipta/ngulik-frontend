import ChartGauge from "./gauge";
import ChartLine from "./line";
import ChartLiquid from "./liquid";
import ChartRing from "./ring";
import ChartPie from "./pie";

const TheComponent: Record<string, React.ElementType> = {
    ChartGauge,
    ChartLine,
    ChartLiquid,
    ChartRing,
    ChartPie,
};

export default TheComponent;