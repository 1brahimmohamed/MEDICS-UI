"use client"

import { Button } from "@/components/ui/button"
import MainTable from "./_components/MainTable"
import { IconPlus } from "@tabler/icons-react"
import { useState } from "react"

const PatientsPage = () => {
    const [activeTab, setActiveTab] = useState("patients")

    const getTitle = () => {
        switch (activeTab) {
            case "studies":
                return "Studies"
            case "patients":
            default:
                return "Patients"
        }
    }

    const getButtonText = () => {
        switch (activeTab) {
            case "studies":
                return "Add Study"
            case "patients":
            default:
                return "Add Patient"
        }
    }

    return (
        <section className="w-full flex flex-col gap-10 p-6">

            <div className="h-1/5 flex items-center justify-between items-end mt-15">
                <h1 className="text-6xl font-bold">
                    {getTitle()}
                </h1>

                <Button variant="default" size="sm">
                    <IconPlus />
                    <span className="hidden lg:inline">{getButtonText()}</span>
                </Button>
            </div>

            {/* Data Table */}
            <div className="flex-1 w-full">
                <MainTable onTabChange={setActiveTab} />
            </div>

        </section>
    )
}

export default PatientsPage