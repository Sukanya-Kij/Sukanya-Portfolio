"use client";

import { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

const data = [
    { subject: "CRM & Retention", A: 95, fullMark: 100 },
    { subject: "Client Relations", A: 90, fullMark: 100 },
    { subject: "Automation", A: 85, fullMark: 100 },
    { subject: "Coordination", A: 90, fullMark: 100 },
    { subject: "Data Analytics", A: 80, fullMark: 100 },
    { subject: "Problem Solving", A: 95, fullMark: 100 },
];

export function SkillsRadarChart() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="h-64 w-full animate-pulse rounded-2xl bg-emerald-50/50 border border-emerald-100/50 flex items-center justify-center">
                <span className="text-emerald-800/40 text-sm font-medium">Loading metrics...</span>
            </div>
        );
    }

    return (
        <div className="h-64 w-full relative">
            {/* Decorative center glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/20 to-transparent rounded-full blur-3xl scale-75 z-0" />

            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data} className="z-10">
                    <PolarGrid stroke="#a7f3d0" strokeDasharray="3 3" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#064e3b', fontSize: 11, fontWeight: 600, dx: 0, dy: 0 }}
                    />
                    <Radar
                        name="Skills"
                        dataKey="A"
                        stroke="#10b981"
                        strokeWidth={2}
                        fill="url(#colorEmerald)"
                        fillOpacity={0.6}
                        animationDuration={1500}
                        animationEasing="ease-out"
                    />
                    <defs>
                        <linearGradient id="colorEmerald" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.2} />
                        </linearGradient>
                    </defs>
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
