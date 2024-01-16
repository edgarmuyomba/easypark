import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';

function CustomTooltip({ payload, label, active }) {
    if (active && payload && payload.length) {
        return (
            <div style={{ backgroundColor: 'white', padding: '0.5rem', border: '1px solid lightgrey'}}>
                <p style={{ fontSize: '0.9rem', fontWeight: 'bold'}}>
                    {label}
                </p>
                <p style={{ fontSize: '0.7rem'}}>
                    {payload[0].value} Active Sessions
                </p>
            </div>
        );
    }
    return null;
}

export default function SessionsChart({ data }) {

    const renderAreaChart = (
        <AreaChart width={1500} height={300} data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
                <linearGradient id="carCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="green" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="white" stopOpacity={0} />
                </linearGradient>

            </defs>
            <XAxis dataKey="time" fontSize="20px" />
            <YAxis fontSize="20px" />
            <Tooltip content={<CustomTooltip />} />
            <Area type="natural" dot={{ stroke: 'green', fill: 'white'}} dataKey="count" stroke="green" fillOpacity={1} fill="url(#carCount)" />
        </AreaChart>
    );

    return (
        <>
            {renderAreaChart}
        </>
    )
}