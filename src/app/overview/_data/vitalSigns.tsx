import { Brain, Heart, Droplets, Wind, Thermometer } from "lucide-react"

    // Vital signs data
    export const vitalSigns = [
        {
            icon: <Brain className="h-4 w-4" />,
            name: "Brain Activity",
            value: "Normal",
            status: "normal",
        },
        {
            icon: <Heart className="h-4 w-4" />,
            name: "Heart Rate",
            value: "72 BPM",
            status: "normal",
        },
        {
            icon: <Droplets className="h-4 w-4" />,
            name: "Blood Pressure",
            value: "120/80 mmHg",
            status: "warning",
        },
        {
            icon: <Wind className="h-4 w-4" />,
            name: "Breathing Rate",
            value: "16/min",
            status: "normal",
        },
        {
            icon: <Thermometer className="h-4 w-4" />,
            name: "Body Temperature",
            value: "98.6°C",
            status: "critical",
        }
    ]