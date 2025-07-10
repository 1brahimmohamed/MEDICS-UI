"use client"
import PatientData from "./_components/PatientData"
import PatientStats from "./_components/PatientStats"
import SignalBar from "./_components/SignalBar"
import SensorStatsCard from "./_components/SensorStatsCard"
import HumanModel from "./_components/HumanModel"
import { useState } from "react"

const OverviewPage = () => {
    const [showSensorStats, setShowSensorStats] = useState(false)

    return (
        <section className="w-full flex gap-10 p-6 h-screen">
            <div className="w-4/12 flex flex-col gap-5">
                <div className="h-5/12">
                <PatientData />
                </div>
               <div className="h-7/12">
               <PatientStats />
               </div>
            </div>

            <div 
                className="w-4/12 flex flex-col gap-10"
                onMouseEnter={() => setShowSensorStats(true)}
                onMouseLeave={() => setShowSensorStats(false)}
            >
                <HumanModel />
            </div>

            <div className="w-4/12 flex flex-col gap-10">
                <div className="h-7/12">
                    {showSensorStats && <SensorStatsCard />}
                </div>
                <div className="h-5/12">
                <SignalBar />
                </div>
            </div>
        </section>
    )
}

export default OverviewPage