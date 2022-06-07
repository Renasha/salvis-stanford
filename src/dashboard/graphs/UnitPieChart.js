import { useCallback, useState, useEffect } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

const renderActiveShape = (props) => {
    const {
        cx,
        cy,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
    } = props;
    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
        </g>
    );
};

function UnitPieChart() {
    const [data, setData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => { // fetch the data stored in local storage
        setData(JSON.parse(localStorage.getItem("aggregatedSubjectTotals")));
        setDataLoaded(true);
    }, []);

    const [activeIndex, setActiveIndex] = useState(-1);
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );
    const onPieLeave = useCallback(
        (_, index) => {
            setActiveIndex(-1);
        },
        [setActiveIndex]
    );

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#ff0090", "#9a00c4", "#29ffb4", "#42ff7b", "#fa3c85", "#006fff", "#00c4b4", "#ffd129", "#ff9442", "#3c6bfa"];
    const cx = "50%";
    const cy = "50%";
    const innerRadius = "60%";
    const outerRadius = "80%";

    if (dataLoaded) {
        return (
            <div className="w-full md:w-1/3 xl:w-1/5 px-4 min-w-128">
                <div className="relative flex flex-col min-w-128 break-words bg-white mb-6 shadow-lg border border-gray-400 rounded-lg hover:shadow-lg hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
                    <div className="h-72">
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    activeIndex={activeIndex}
                                    activeShape={renderActiveShape}
                                    data={data[0]}
                                    innerRadius={innerRadius}
                                    outerRadius={outerRadius}
                                    cx={cx}
                                    cy={cy}
                                    paddingAngle={1}
                                    fill="#8884d8"
                                    onMouseEnter={onPieEnter}
                                    onMouseLeave={onPieLeave}
                                    dataKey='value'
                                    animationBegin={0}
                                    animationDuration={800}
                                >
                                    {(data[0]).map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
                                </Pie>
                            </PieChart>

                        </ResponsiveContainer>
                        <div className="absolute text-sm md:text-lg top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            {(activeIndex === -1) ? "Total" : data[0][activeIndex].name}
                        </div>
                        <div className="absolute text-4xl md:text-5xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            {(activeIndex === -1) ? data[1].toString() : data[0][activeIndex].value}
                        </div>
                        <div className="absolute text-sm md:text-lg top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            Units
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default UnitPieChart;
