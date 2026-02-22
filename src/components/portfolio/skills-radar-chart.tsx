"use client";

import { useEffect, useRef, useState } from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

const data = [
    { subject: "CRM & Retention", A: 95, fullMark: 100 },
    { subject: "Client Relations", A: 90, fullMark: 100 },
    { subject: "Automation", A: 85, fullMark: 100 },
    { subject: "Coordination", A: 90, fullMark: 100 },
    { subject: "Data Analytics", A: 80, fullMark: 100 },
    { subject: "Problem Solving", A: 95, fullMark: 100 },
];

export function SkillsRadarChart() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [chartWidth, setChartWidth] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const syncWidth = () => {
            const nextWidth = Math.floor(container.getBoundingClientRect().width);
            if (nextWidth > 0) {
                setChartWidth(nextWidth);
            }
        };

        syncWidth();

        if (typeof ResizeObserver === "undefined") {
            window.addEventListener("resize", syncWidth);
            return () => window.removeEventListener("resize", syncWidth);
        }

        const observer = new ResizeObserver(syncWidth);
        observer.observe(container);
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", syncWidth);
        };
    }, []);

    if (chartWidth === 0) {
        return (
            <div ref={containerRef} className="h-64 w-full min-w-0 animate-pulse rounded-2xl border border-emerald-100/50 bg-emerald-50/50 flex items-center justify-center">
                <span className="text-sm font-medium text-emerald-800/40">Loading metrics...</span>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="relative h-64 w-full min-w-0">
            <div className="absolute inset-0 z-0 scale-75 rounded-full bg-gradient-to-tr from-emerald-100/20 to-transparent blur-3xl" />

            <RadarChart width={chartWidth} height={256} cx="50%" cy="50%" outerRadius="75%" data={data} className="z-10">
                <PolarGrid stroke="#a7f3d0" strokeDasharray="3 3" />
                <PolarAngleAxis
                    dataKey="subject"
                    tick={{ fill: "#064e3b", fontSize: 11, fontWeight: 600, dx: 0, dy: 0 }}
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
        </div>
    );
}
