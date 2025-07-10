"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"
import { Plus, Minus } from "lucide-react"

const HumanBodyParts = [
    'Free',
    'Head',
    'Chest',
    'Abdomen',
    'Back',
]

const HumanModel = () => {
    const [selectedPart, setSelectedPart] = useState('Free')

    return (
        <div className="flex flex-col h-full ">
            <div className="flex-1 flex justify-center items-center relative">
                <Image src="/images/human.png" alt="Human Model" width={400} height={500} />
                
                {/* Zoom buttons positioned to the right */}
                <div className="absolute right-4 top-4 flex flex-col gap-2">
                    <Button
                        size="sm"
                        variant="default"
                        className="w-8 h-8 p-0 backdrop-blur-sm"
                        onClick={() => console.log('Zoom in')}
                    >
                        <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                        size="sm"
                        variant="outline"
                        className="w-8 h-8 p-0 bg-background/80 backdrop-blur-sm"
                        onClick={() => console.log('Zoom out')}
                    >
                        <Minus className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div className="flex justify-between p-4">
                {HumanBodyParts.map((part) => (
                    <Button
                        key={part}
                        variant={selectedPart === part ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedPart(part)}
                        className={`flex-1 mx-1 ${
                            selectedPart === part 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-background hover:bg-muted'
                        }`}
                    >
                        {part}
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default HumanModel