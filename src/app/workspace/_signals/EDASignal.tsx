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

interface EDASignalProps {
    timeFilter: string
}

const EDASignal = ({ timeFilter }: EDASignalProps) => {
    const generateEDAData = (filter: string) => {
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
            
            const baseEDA = 2.5
            const variation = Math.sin(i * 0.5) * 1.2 + Math.random() * 0.8
            data.push(Math.max(0.5, Math.min(5.0, baseEDA + variation)))
        }
        
        return { data, labels }
    }

    const { data, labels } = generateEDAData(timeFilter)

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'EDA (μS)',
            data: data,
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.05)',
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
                min: 0,
                max: 6
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

export default EDASignal 