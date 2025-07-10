import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card"
import { patientsData } from "@/app/patients/_data/patients"
import { User, Hash, Calendar, Clock, VenusAndMars } from "lucide-react"

const PatientData = () => {
    const patient = patientsData[0] // First patient: John Smith

    const patientInfo = [
        {
            icon: <User className="h-4 w-4 text-muted-foreground" />,
            title: "Name",
            value: patient.name
        },
        {
            icon: <Hash className="h-4 w-4 text-muted-foreground" />,
            title: "ID",
            value: patient.id
        },
        {
            icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
            title: "Age",
            value: `${patient.age} years`
        },
        {
            icon: <VenusAndMars className="h-4 w-4 text-muted-foreground" />,
            title: "Gender",
            value: patient.gender
        },
        {
            icon: <Clock className="h-4 w-4 text-muted-foreground" />,
            title: "Last Session",
            value: patient.lastSession
        }
    ]

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Patient Data</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                {patientInfo.map((info, index) => (
                    <div key={index} className="px-6">
                        <div className="flex items-center space-x-3 py-2">
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                    {info.icon}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0 flex items-center justify-between">
                                <p className="text-sm font-medium text-muted-foreground">
                                    {info.title}
                                </p>
                                <p className="text-base font-semibold text-foreground">
                                    {info.value}
                                </p>
                            </div>
                        </div>
                        {index < patientInfo.length - 1 && (
                            <div className="border-b border-border -mx-6" />
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

export default PatientData