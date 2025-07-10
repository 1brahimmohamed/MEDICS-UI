"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Heart, TrendingUp, TrendingDown } from "lucide-react"
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { useState, useEffect } from "react"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const SensorStatsCard = () => {
    const [signalData, setSignalData] = useState<number[]>([])
    const [currentValue, setCurrentValue] = useState(72)
    const [trend, setTrend] = useState<'up' | 'down' | 'stable'>('stable')
    const [lastValue, setLastValue] = useState(72)

    // Generate real-time signal data with walking pattern
    useEffect(() => {
        const interval = setInterval(() => {
            // Create walking pattern - small incremental changes
            const change = (Math.random() - 0.5) * 4 // Small change between -2 and +2
            const newValue = Math.max(60, Math.min(80, lastValue + change))
            setLastValue(newValue)
            setCurrentValue(Math.round(newValue))
            
            // Update signal data (keep last 20 points)
            setSignalData(prev => {
                const newData = [...prev, newValue]
                return newData.slice(-20)
            })

            // Update trend based on recent movement
            if (newValue > 75) setTrend('up')
            else if (newValue < 65) setTrend('down')
            else setTrend('stable')
        }, 200) // Update every second

        return () => clearInterval(interval)
    }, [lastValue])

    const getStatusColor = () => {
        if (currentValue > 75) return 'bg-red-500'
        if (currentValue < 65) return 'bg-yellow-500'
        return 'bg-green-500'
    }

    const getTrendIcon = () => {
        switch (trend) {
            case 'up':
                return <TrendingUp className="h-4 w-4 text-red-500" />
            case 'down':
                return <TrendingDown className="h-4 w-4 text-blue-500" />
            default:
                return <Activity className="h-4 w-4 text-green-500" />
        }
    }

    // Get primary color from CSS variables
    const getPrimaryColor = () => {
        if (typeof window !== 'undefined') {
            const style = getComputedStyle(document.documentElement)
            return style.getPropertyValue('--primary').trim()
        }
        return 'hsl(222.2 84% 4.9%)' // fallback color
    }

    const chartData = {
        labels: signalData.map((_, index) => index + 1),
        datasets: [
            {
                label: 'Heart Rate',
                data: signalData,
                borderColor: getPrimaryColor(),
                backgroundColor: getPrimaryColor(),
                borderWidth: 2,
                pointRadius: 0,
                pointHoverRadius: 4,
                tension: 0.4,
                fill: false
            }
        ]
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,
                mode: 'index' as const,
                intersect: false
            }
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        },
        interaction: {
            intersect: false,
            mode: 'index' as const
        }
    }

    return (
        <Card>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Heart Rate</CardTitle>
                    <Heart className="h-5 w-5 text-red-500" />
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Signal Visualization */}
                <div className="h-20">
                    <Line data={chartData} options={chartOptions} />
                </div>

                {/* Status Display */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor()}`} />
                        <span className="text-sm text-muted-foreground">Status</span>
                    </div>
                    <Badge
                        className={`text-xs ${
                            trend === 'up'
                                ? 'bg-red-100 text-red-700'
                                : trend === 'down'
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-green-100 text-green-700'
                        }`}
                    >
                        {trend === 'up' ? 'High' : trend === 'down' ? 'Low' : 'Normal'}
                    </Badge>
                </div>

                {/* Current Value */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        {getTrendIcon()}
                        <span className="text-2xl font-bold">{currentValue}</span>
                        <span className="text-sm text-muted-foreground">BPM</span>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">Last updated</p>
                        <p className="text-xs font-medium">Just now</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SensorStatsCard