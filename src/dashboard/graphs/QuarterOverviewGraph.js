import { useEffect, useState } from 'react';
import { BarChart, Bar, Label, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#ff0090", "#9a00c4", "#29ffb4", "#42ff7b", "#fa3c85", "#006fff", "#00c4b4", "#ffd129", "#ff9442", "#3c6bfa"];

export default function QuarterOverviewGraph() {
    const [data, setData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => { // fetch the data stored in local storage
        setData(JSON.parse(localStorage.getItem("aggregatedQuarterTotals")));
        setDataLoaded(true);
    }, []);

    if (dataLoaded) {
        return (
            <div className="w-full md:w-2/3 xl:w-3/5 px-4 ">
                <div className="relative flex flex-col min-w-128 break-words bg-white mb-6 shadow-lg border border-gray-400 rounded-lg hover:shadow-lg hover:border-opacity-0 transform hover:-translate-y-1 transition-all duration-200">
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={data[1]}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 0,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis>
                                    <Label
                                        style={{
                                            textAnchor: "middle",
                                            fontSize: "130%",
                                        }}
                                        angle={270}
                                        value={"Units"} />
                                </YAxis>
                                <Tooltip itemStyle={{}}/>
                                {(data[0]).map((entry, index) => (<Bar key={entry} dataKey={entry} stackId="a" animationBegin={0} animationDuration={800} fill={COLORS[index % COLORS.length]} />))}
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        );
    }
}
