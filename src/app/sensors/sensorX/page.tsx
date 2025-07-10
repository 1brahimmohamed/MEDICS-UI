"use client"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { Line, Bar, Scatter } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'
import { 
    Heart, 
    TrendingUp, 
    TrendingDown, 
    Activity, 
    Clock,
    Workflow,
    MessageSquare,
    Zap,
    Target,
    Play,
    Pause
} from "lucide-react"
import Link from "next/link"

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

const SensorXPage = () => {
    const [timeFilter, setTimeFilter] = useState('1d')
    const [isLive, setIsLive] = useState(false)
    const [liveData, setLiveData] = useState<number[]>([])
    const [liveLabels, setLiveLabels] = useState<string[]>([])
    const animationRef = useRef<number | undefined>(undefined)

    // Preset annotations
    const presetAnnotations = [
        { id: 'artifact', label: 'Artifact' },
        { id: 'response', label: 'Response' },
        { id: 'session_start', label: 'Session Start' },
        { id: 'session_end', label: 'Session End' },
        { id: 'baseline', label: 'Baseline' },
        { id: 'abnormality', label: 'Abnormality' },
        { id: 'anxiety_spike', label: 'Anxiety Spike' },
        { id: 'relaxed_period', label: 'Relaxed Period' },
        { id: 'focused_attention', label: 'Focused Attention' },
        { id: 'emotional_reaction', label: 'Emotional Reaction' },
        { id: 'mindfulness_cue', label: 'Mindfulness Cue' }
    ]

    const handleAnnotationSelect = (annotationId: string) => {
        console.log('Selected annotation:', annotationId)
        // Here you would typically open a modal or form to add the annotation
        // For now, we'll just log the selection
    }

    // Live data animation
    useEffect(() => {
        if (isLive) {
            const animate = () => {
                const now = new Date()
                const newLabel = now.toLocaleTimeString('en-US', { 
                    hour12: false, 
                    hour: '2-digit', 
                    minute: '2-digit',
                    second: '2-digit'
                })
                
                // Generate realistic live heart rate data
                const baseRate = 1000
                const variation = Math.sin(Date.now() * 0.01) * 15 + Math.random() * 10
                const newValue = Math.max(60, Math.min(100, baseRate + variation))
                
                setLiveData(prev => {
                    const newData = [...prev, newValue]
                    // Keep only last 50 points for smooth animation
                    return newData.slice(-50)
                })
                
                setLiveLabels(prev => {
                    const newLabels = [...prev, newLabel]
                    return newLabels.slice(-50)
                })
                
                animationRef.current = requestAnimationFrame(animate)
            }
            
            animate()
        } else {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
        
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isLive])

    // Generate heart rate data based on time filter
    const generateHeartRateData = (filter: string) => {
        const now = new Date()
        const data = []
        const labels = []
        
        let points = 24 // 1 day
        let interval = 60 * 60 * 1000 // 1 hour
        
        switch(filter) {
            case '1w':
                points = 168 // 7 days
                interval = 60 * 60 * 1000 // 1 hour
                break
            case '1m':
                points = 30 // 30 days
                interval = 24 * 60 * 60 * 1000 // 1 day
                break
            case '6m':
                points = 26 // 26 weeks
                interval = 7 * 24 * 60 * 60 * 1000 // 1 week
                break
            case '1y':
                points = 12 // 12 months
                interval = 30 * 24 * 60 * 60 * 1000 // 1 month
                break
        }
        
        for (let i = points - 1; i >= 0; i--) {
            const timestamp = new Date(now.getTime() - i * interval)
            
            if (filter === '1d') {
                labels.push(timestamp.toLocaleTimeString('en-US', { 
                    hour12: false, 
                    hour: '2-digit', 
                    minute: '2-digit' 
                }))
            } else if (filter === '1w') {
                labels.push(timestamp.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit'
                }))
            } else if (filter === '1m') {
                labels.push(timestamp.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric'
                }))
            } else {
                labels.push(timestamp.toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: '2-digit'
                }))
            }
            
            // Generate realistic heart rate data (60-100 BPM with some variation)
            const baseRate = 75
            const variation = Math.sin(i * 0.5) * 15 + Math.random() * 10
            data.push(Math.max(60, Math.min(100, baseRate + variation)))
        }
        
        return { data, labels }
    }

    const { data: heartRateData, labels: heartRateLabels } = generateHeartRateData(timeFilter)

    // Use live data if live mode is enabled, otherwise use static data
    const displayData = isLive ? liveData : heartRateData
    const displayLabels = isLive ? liveLabels : heartRateLabels

    // Main heart rate chart data
    const mainChartData = {
        labels: displayLabels,
        datasets: [
            {
                label: 'Heart Rate (BPM)',
                data: displayData,
                borderColor: '#38608F',
                backgroundColor: 'rgba(56, 96, 143, 0.05)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointHoverRadius: 6,
            }
        ]
    }

    const mainChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: isLive ? 0 : 1000, // Disable animation in live mode for smooth updates
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                backgroundColor: 'hsl(var(--card))',
                titleColor: 'hsl(var(--card-foreground))',
                bodyColor: 'hsl(var(--card-foreground))',
                borderColor: 'hsl(var(--border))',
                borderWidth: 1,
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(195, 198, 207, 0.1)',
                    drawBorder: false,
                },
                ticks: {
                    maxTicksLimit: 8,
                    font: {
                        size: 11
                    }
                }
            },
            y: {
                grid: {
                    color: 'rgba(195, 198, 207, 0.1)',
                    drawBorder: false,
                },
                ticks: {
                    font: {
                        size: 11
                    }
                },
                min: 50,
                max: 110
            }
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false
        }
    }

    // Calculate metrics from heart rate data
    const currentHR = displayData[displayData.length - 1] || 75
    const avgHR = Math.round(displayData.reduce((a, b) => a + b, 0) / displayData.length) || 75
    const minHR = Math.min(...displayData) || 60
    const maxHR = Math.max(...displayData) || 100
    const hrVariability = Math.round((maxHR - minHR) * 10) / 10

    // Additional charts data
    const hourlyData = {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        datasets: [{
            label: 'Average HR by Hour',
            data: [68, 65, 72, 78, 82, 75],
            backgroundColor: '#38608F',
            borderColor: '#38608F',
            borderWidth: 2,
        }]
    }

    const weeklyData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Weekly Average',
            data: [74, 76, 73, 78, 75, 72, 70],
            backgroundColor: '#38608F',
            borderColor: '#38608F',
            borderWidth: 2,
        }]
    }

    const hrTrendData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'HR Trend',
            data: [72, 74, 71, 76, 73, 75],
            borderColor: '#38608F',
            backgroundColor: 'rgba(56, 96, 143, 0.05)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
        }]
    }

    const scatterData = {
        datasets: [{
            label: 'HR vs Activity',
            data: displayData.map((hr, i) => ({
                x: i * 10 + Math.random() * 20,
                y: hr
            })),
            backgroundColor: '#38608F',
            borderColor: '#38608F',
            borderWidth: 2,
        }]
    }

    const timeFilters = [
        { key: '1d', label: '1 Day' },
        { key: '1w', label: '1 Week' },
        { key: '1m', label: '1 Month' },
        { key: '6m', label: '6 Months' },
        { key: '1y', label: '1 Year' },
    ]

    return (
        <div className="space-y-6">
            {/* Header with title and buttons */}
            <div className="h-1/5 flex items-center justify-between items-end mt-15">
                <h1 className="text-6xl font-bold">
                    Heart Rate
                </h1>

               
            </div>

            {/* Time Filters and Live Toggle */}
            <div className="flex gap-2 justify-between">
                <div className="flex gap-2">

 {/* Live Toggle */}
 <Button
                        variant={isLive ? "default" : "outline"}
                        size="sm"
                        onClick={() => setIsLive(!isLive)}
                        className="flex items-center gap-2"
                    >
                        {isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        {isLive ? 'Live' : 'Live'}
                    </Button>
                    
                {timeFilters.map((filter) => (
                    <Button
                        key={filter.key}
                        variant={timeFilter === filter.key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setTimeFilter(filter.key)}
                        className="flex items-center gap-2"
                        disabled={isLive}
                    >
                        <Clock className="h-4 w-4" />
                        {filter.label}
                    </Button>
                ))}

                

                </div>
                <div className="flex gap-3">
                   
                    
                    <Link href="/workspace">
                        <Button variant="outline" className="flex items-center gap-2">
                            <Workflow className="h-4 w-4" />
                            Go to Workspace
                        </Button>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Add Annotation
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {presetAnnotations.map((annotation) => (
                                <DropdownMenuItem 
                                    key={annotation.id}
                                    onClick={() => handleAnnotationSelect(annotation.id)}
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    <span>{annotation.label}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Main Heart Rate Chart */}
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <Activity className="h-6 w-6" />
                        Heart Rate Signal {isLive && <span className="text-sm text-green-500">● LIVE</span>}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-96">
                        <Line data={mainChartData} options={mainChartOptions} />
                    </div>
                </CardContent>
            </Card>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Current HR</CardTitle>
                        <Heart className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{currentHR.toFixed(0)} BPM</div>
                        <p className="text-xs text-muted-foreground">
                            {currentHR > avgHR ? (
                                <span className="flex items-center gap-1 text-red-600">
                                    <TrendingUp className="h-3 w-3" />
                                    Above average
                                </span>
                            ) : (
                                <span className="flex items-center gap-1 text-green-600">
                                    <TrendingDown className="h-3 w-3" />
                                    Below average
                                </span>
                            )}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Average HR</CardTitle>
                        <Target className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{avgHR} BPM</div>
                        <p className="text-xs text-muted-foreground">
                            {isLive ? 'Live session' : 
                             timeFilter === '1d' ? 'Last 24 hours' : 
                             timeFilter === '1w' ? 'Last 7 days' :
                             timeFilter === '1m' ? 'Last 30 days' :
                             timeFilter === '6m' ? 'Last 6 months' : 'Last year'}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">HR Range</CardTitle>
                        <Zap className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{minHR.toFixed(0)}-{maxHR.toFixed(0)} BPM</div>
                        <p className="text-xs text-muted-foreground">
                            Variability: {hrVariability} BPM
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Status</CardTitle>
                        <Activity className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Normal</div>
                        <p className="text-xs text-muted-foreground">
                            Within healthy range
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hourly Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Hourly Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <Bar 
                                data={hourlyData} 
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: {
                                        y: { beginAtZero: true, grid: { color: 'rgba(195, 198, 207, 0.1)' } },
                                        x: { grid: { color: 'rgba(195, 198, 207, 0.1)' } }
                                    }
                                }} 
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Weekly Pattern */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Weekly Pattern</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <Bar 
                                data={weeklyData} 
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: {
                                        y: { beginAtZero: true, grid: { color: 'rgba(195, 198, 207, 0.1)' } },
                                        x: { grid: { color: 'rgba(195, 198, 207, 0.1)' } }
                                    }
                                }} 
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Heart Rate Trend */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Heart Rate Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <Line 
                                data={hrTrendData} 
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: {
                                        y: { 
                                            beginAtZero: false,
                                            grid: { color: 'rgba(195, 198, 207, 0.1)' } 
                                        },
                                        x: { 
                                            grid: { color: 'rgba(195, 198, 207, 0.1)' } 
                                        }
                                    }
                                }} 
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* HR vs Activity Scatter */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">HR vs Activity Correlation</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-64">
                            <Scatter 
                                data={scatterData} 
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: {
                                        y: { 
                                            title: { display: true, text: 'Heart Rate (BPM)' },
                                            grid: { color: 'rgba(195, 198, 207, 0.1)' } 
                                        },
                                        x: { 
                                            title: { display: true, text: 'Activity Level' },
                                            grid: { color: 'rgba(195, 198, 207, 0.1)' } 
                                        }
                                    }
                                }} 
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SensorXPage