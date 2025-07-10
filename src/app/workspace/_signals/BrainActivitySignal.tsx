"use client"
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js'

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

interface BrainActivitySignalProps {
    timeFilter: string
}

const BrainActivitySignal = ({ timeFilter }: BrainActivitySignalProps) => {
    // Generate brain activity data based on time filter
    const generateBrainActivityData = (filter: string) => {
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
            
            // Generate realistic brain activity data (EEG-like patterns)
            const baseActivity = 50
            const alphaWave = Math.sin(i * 0.3) * 20
            const betaWave = Math.sin(i * 0.7) * 15
            const thetaWave = Math.sin(i * 0.2) * 10
            const noise = (Math.random() - 0.5) * 8
            data.push(Math.max(0, Math.min(100, baseActivity + alphaWave + betaWave + thetaWave + noise)))
        }
        
        return { data, labels }
    }

    const { data: brainActivityData, labels: brainActivityLabels } = generateBrainActivityData(timeFilter)

    const chartData = {
        labels: brainActivityLabels,
        datasets: [
            {
                label: 'Brain Activity',
                data: brainActivityData,
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.05)',
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 2,
                pointHoverRadius: 4,
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
                    maxTicksLimit: 6,
                    font: {
                        size: 10
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
                        size: 10
                    }
                },
                min: 0,
                max: 100
            }
        },
        interaction: {
            mode: 'nearest' as const,
            axis: 'x' as const,
            intersect: false
        }
    }

    return (
        <div className="h-full w-full">
            <Line data={chartData} options={chartOptions} />
        </div>
    )
}

export default BrainActivitySignal 