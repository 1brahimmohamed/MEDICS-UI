"use client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { useState } from "react"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const SignalBar = () => {
    const [currentIndex, setCurrentIndex] = useState(0)
    
    // Get primary color from CSS variables
    const getPrimaryColor = () => {
        if (typeof window !== 'undefined') {
            const style = getComputedStyle(document.documentElement)
            return style.getPropertyValue('--primary').trim()
        }
        return 'hsl(222.2 84% 4.9%)' // fallback color
    }
    
    // Generate sample data - you can replace this with your actual data
    const generateData = (startIndex: number) => {
        const data = []
        const labels = []
        
        for (let i = 0; i < 10; i++) {
            const timeIndex = startIndex + i
            const timestamp = new Date(Date.now() - (100 - timeIndex) * 60000) // 1 minute intervals
            labels.push(timestamp.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit' 
            }))
            data.push(Math.random() * 100 + 50) // Random values between 50-150
        }
        
        return { data, labels }
    }

    const { data, labels } = generateData(currentIndex)

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Signal',
                data: data,
                backgroundColor: getPrimaryColor(),
                borderColor: getPrimaryColor(),
                borderWidth: 0,
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 12,
                maxBarThickness: 15,
            }
        ]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 10
                    }
                }
            },
            y: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 10
                    }
                }
            }
        }
    }

    const handlePrevious = () => {
        setCurrentIndex(Math.max(0, currentIndex - 10))
    }

    const handleNext = () => {
        setCurrentIndex(currentIndex + 10)
    }

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Signal Bar</CardTitle>
            </CardHeader>
            <CardContent className="p-1 h-full flex flex-col">
                <div className="flex-1 min-h-0">
                    <Bar data={chartData} options={options} />
                </div>
                <div className="flex justify-between p-4">
                    <div>
                        <p>Signal X</p>
                    </div>
                    <div className="flex justify-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handlePrevious}
                            disabled={currentIndex === 0}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleNext}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SignalBar