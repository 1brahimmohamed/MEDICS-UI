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

interface BreathingRateSignalProps {
    timeFilter: string
}

const BreathingRateSignal = ({ timeFilter }: BreathingRateSignalProps) => {
    const generateBreathingData = (filter: string) => {
        const now = new Date()
        const data = []
        const labels = []
        
        let points = 24
        let interval = 60 * 60 * 1000
        
        switch(filter) {
            case '1w': points = 168; break
            case '1m': points = 30; interval = 24 * 60 * 60 * 1000; break
            case '6m': points = 26; interval = 7 * 24 * 60 * 60 * 1000; break
            case '1y': points = 12; interval = 30 * 24 * 60 * 60 * 1000; break
        }
        
        for (let i = points - 1; i >= 0; i--) {
            const timestamp = new Date(now.getTime() - i * interval)
            
            if (filter === '1d') {
                labels.push(timestamp.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }))
            } else if (filter === '1w') {
                labels.push(timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit' }))
            } else if (filter === '1m') {
                labels.push(timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
            } else {
                labels.push(timestamp.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }))
            }
            
            const baseRate = 16
            const variation = Math.sin(i * 0.6) * 4 + Math.random() * 3
            data.push(Math.max(10, Math.min(25, baseRate + variation)))
        }
        
        return { data, labels }
    }

    const { data, labels } = generateBreathingData(timeFilter)

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Breathing Rate',
            data: data,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 2,
            pointHoverRadius: 4,
        }]
    }

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: {
                grid: { color: 'rgba(195, 198, 207, 0.1)', drawBorder: false },
                ticks: { maxTicksLimit: 6, font: { size: 10 } }
            },
            y: {
                grid: { color: 'rgba(195, 198, 207, 0.1)', drawBorder: false },
                ticks: { font: { size: 10 } },
                min: 8,
                max: 28
            }
        },
        interaction: { mode: 'nearest' as const, axis: 'x' as const, intersect: false }
    }

    return (
        <div className="h-full w-full">
            <Line data={chartData} options={chartOptions} />
        </div>
    )
}

export default BreathingRateSignal 