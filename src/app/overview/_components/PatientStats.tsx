"use client"
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card"
import { Doughnut } from "react-chartjs-2"
import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend,
    CategoryScale,
    LinearScale
} from "chart.js"
import { vitalSigns } from "../_data/vitalSigns"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale)


    // Donut chart data - showing patient condition distribution
    const donutData = {
        labels: ['Normal', 'Mild Alert', 'Critical', 'Recovering'],
        datasets: [
            {
                data: [65, 20, 10, 5],
                backgroundColor: [
                    '#10b981', // Green for normal
                    '#f59e0b', // Amber for mild alert
                    '#ef4444', // Red for critical
                    '#3b82f6', // Blue for recovering
                ],
                borderWidth: 0,
                cutout: '70%',
            },
        ],
    }

    const donutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    usePointStyle: true,
                    padding: 15,
                    font: {
                        size: 12,
                    },
                },
            },
            tooltip: {
                callbacks: {
                    label: function(context: { label: string; parsed: number }) {
                        return `${context.label}: ${context.parsed}%`
                    }
                }
            }
        },
    }

const PatientStats = () => {


    const getStatusColor = (status: string) => {
        switch (status) {
            case 'normal':
                return 'text-green-600 bg-green-50'
            case 'warning':
                return 'text-yellow-600 bg-yellow-50'
            case 'critical':
                return 'text-red-600 bg-red-50'
            default:
                return 'text-gray-600 bg-gray-50'
        }
    }

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Patient Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {/* Donut Chart */}
                <div className="h-48">
                    <Doughnut data={donutData} options={donutOptions} />
                </div>
                
                {/* Vital Signs */}
                <div className="space-y-3">
                    {vitalSigns.map((vital, index) => (
                        <div key={index} className="flex items-center justify-between rounded-lg border">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full flex items-center justify-center">
                                    {vital.icon}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        {vital.name}
                                    </p>
                        
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vital.status)}`}>
                                    {vital.status.charAt(0).toUpperCase() + vital.status.slice(1)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export default PatientStats