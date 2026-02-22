"use client";

import { useEffect, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
    { year: "2020", retention: 75, avg: 65 },
    { year: "2021", retention: 82, avg: 68 },
    { year: "2022", retention: 86, avg: 72 },
    { year: "2023", retention: 91, avg: 74 },
    { year: "2024", retention: 94, avg: 75 },
    { year: "2025", retention: 96, avg: 75 },
];

export function ImpactAreaChart() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="h-64 w-full animate-pulse rounded-2xl bg-gradient-to-tr from-emerald-50/50 to-emerald-100/20 border border-emerald-100/50 flex flex-col justify-center gap-3 px-8">
                <div className="h-4 w-1/3 rounded bg-emerald-100/80"></div>
                <div className="h-40 w-full rounded bg-emerald-100/40"></div>
            </div>
        );
    }

    return (
        <div className="h-64 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={performanceData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#c8a96f" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#b89555" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1fae5" />
                    <XAxis
                        dataKey="year"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#064e3b', fontSize: 12, fontWeight: 500 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#064e3b', fontSize: 12 }}
                        domain={[40, 100]}
                        tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: '12px',
                            border: '1px solid rgba(16, 185, 129, 0.2)',
                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)',
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(8px)',
                            color: '#064e3b',
                            fontWeight: 600
                        }}
                        itemStyle={{ color: '#047857' }}
                    />
                    <Area
                        type="monotone"
                        dataKey="avg"
                        name="Industry Average"
                        stroke="#c8a96f"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorAvg)"
                        animationDuration={2000}
                    />
                    <Area
                        type="monotone"
                        dataKey="retention"
                        name="Retention KPI"
                        stroke="#10b981"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorRetention)"
                        animationDuration={2000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
