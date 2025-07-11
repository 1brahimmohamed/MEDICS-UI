"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
    LayoutGrid, 
    Grid3X3, 
    Square, 
    Activity, 
    Heart, 
    Brain, 
    Droplets, 
    Wind, 
    Thermometer,
    Settings,
    Play,
    Pause,
    RotateCcw,
    Download,
    Share2,
    Filter,
    Search,
    Plus,
    Minus,
    Maximize2,
    Minimize2,
    ChevronDown,
    Clock,
    MessageSquare
} from "lucide-react"
import {
    HeartRateSignal,
    BrainActivitySignal,
    BloodPressureSignal,
    BreathingRateSignal,
    TemperatureSignal,
    ActivityLevelSignal,
    OxygenSaturationSignal,
    HeartRateVariabilitySignal,
    EDASignal,
    FacialExpressionSignal,
    EyeExpressionSignal
} from "./_signals"
import TerminalUI from "./_components/TerminalUI"

// Available signals data
const availableSignals = [
    { id: 'heart_rate', name: 'Heart Rate (ECG)', icon: <Heart className="h-4 w-4 text-red-500" />, type: 'ECG', status: 'active' },
    { id: 'brain_activity', name: 'Brain Activity (EEG)', icon: <Brain className="h-4 w-4 text-purple-500" />, type: 'EEG', status: 'active' },
    { id: 'blood_pressure', name: 'Blood Pressure', icon: <Droplets className="h-4 w-4 text-red-500" />, type: 'BP', status: 'active' },
    { id: 'breathing_rate', name: 'Breathing Rate', icon: <Wind className="h-4 w-4 text-green-500" />, type: 'RESP', status: 'active' },
    { id: 'temperature', name: 'Body Temperature', icon: <Thermometer className="h-4 w-4 text-orange-500" />, type: 'TEMP', status: 'active' },
    { id: 'activity', name: 'Activity Level', icon: <Activity className="h-4 w-4 text-cyan-500" />, type: 'ACC', status: 'active' },
    { id: 'oxygen_saturation', name: 'O₂ Saturation', icon: <Activity className="h-4 w-4 text-lime-500" />, type: 'SPO2', status: 'active' },
    { id: 'heart_rate_variability', name: 'HRV', icon: <Heart className="h-4 w-4 text-pink-500" />, type: 'HRV', status: 'active' },
    { id: 'eda', name: 'EDA', icon: <Activity className="h-4 w-4 text-amber-500" />, type: 'EDA', status: 'active' },
    { id: 'facial_expression', name: 'Facial Expression', icon: <Activity className="h-4 w-4 text-purple-500" />, type: 'FACE', status: 'active' },
    { id: 'eye_expression', name: 'Eye Expression', icon: <Activity className="h-4 w-4 text-cyan-500" />, type: 'EYE', status: 'active' },
]

// Preset annotations
const presetAnnotations = [
    { id: 'artifact', label: 'Artifact' },
    { id: 'response', label: 'Response' },
    { id: 'session_start', label: 'Session Start' },
    { id: 'session_end', label: 'Session End' },
    { id: 'baseline', label: 'Baseline' },
    { id: 'abnormality', label: 'Abnormality' },
    { id: 'anxiety_spike', label: 'Anxiety Spike' },
    { id: 'relaxed_period', label: 'Relaxed Period' },
    { id: 'focused_attention', label: 'Focused Attention' },
    { id: 'emotional_reaction', label: 'Emotional Reaction' },
    { id: 'mindfulness_cue', label: 'Mindfulness Cue' }
]

// Time filters
const timeFilters = [
    { key: '1d', label: '1 Day' },
    { key: '1w', label: '1 Week' },
    { key: '1m', label: '1 Month' },
    { key: '6m', label: '6 Months' },
    { key: '1y', label: '1 Year' },
]

// Grid configurations
const gridConfigs = {
    '1x1': { cols: 1, rows: 1, className: 'grid-cols-1 grid-rows-1', icon: <Square className="h-4 w-4" /> },
    '2x1': { cols: 1, rows: 2, className: 'grid-cols-1 grid-rows-2', icon: <Square className="h-4 w-4" /> },
    '3x1': { cols: 1, rows: 3, className: 'grid-cols-1 grid-rows-3', icon: <Grid3X3 className="h-4 w-4" /> },
    '2x2': { cols: 2, rows: 2, className: 'grid-cols-2 grid-rows-2', icon: <LayoutGrid className="h-4 w-4" /> },
    '3x3': { cols: 3, rows: 3, className: 'grid-cols-3 grid-rows-3', icon: <Grid3X3 className="h-4 w-4" /> },
}

const WorkspacePage = () => {
    const [currentGrid, setCurrentGrid] = useState<'1x1' | '2x1' | '3x1' | '2x2' | '3x3'>('2x2')
    const [isPlaying, setIsPlaying] = useState(false)
    const [timeFilter, setTimeFilter] = useState('1d')
    const [selectedSignals, setSelectedSignals] = useState<string[]>(['heart_rate', 'brain_activity'])
    const [gridItems, setGridItems] = useState<Array<{ id: string; signalId: string | null }>>([
        { id: '1', signalId: 'heart_rate' },
        { id: '2', signalId: 'brain_activity' },
        { id: '3', signalId: null },
        { id: '4', signalId: null },
    ])
    const [showTerminal, setShowTerminal] = useState(false)

    const handleAnnotationSelect = (annotationId: string) => {
        console.log('Selected annotation:', annotationId)
        // Here you would typically open a modal or form to add the annotation
    }

    const handleGridChange = (gridType: '1x1' | '2x1' | '3x1' | '2x2' | '3x3') => {
        setCurrentGrid(gridType)
        const config = gridConfigs[gridType]
        const totalCells = config.cols * config.rows
        
        // Reset grid items array with existing signals or null
        const newGridItems = Array.from({ length: totalCells }, (_, index) => {
            const existingItem = gridItems[index]
            return existingItem || { id: String(index + 1), signalId: null }
        })
        setGridItems(newGridItems)
        
        // Force a small delay to ensure DOM updates before chart re-rendering
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'))
        }, 100)
    }

    const handleSignalSelect = (signalId: string) => {
        if (selectedSignals.includes(signalId)) {
            setSelectedSignals(selectedSignals.filter(id => id !== signalId))
        } else {
            setSelectedSignals([...selectedSignals, signalId])
        }
    }

    const getSignalById = (signalId: string) => {
        return availableSignals.find(signal => signal.id === signalId)
    }

    return (
        <TooltipProvider>
            <div className="h-screen flex flex-col bg-background">
                {/* Top Toolbar */}
                <div className="h-12 border-b bg-card flex items-center gap-3 px-4">
                    <h1 className="text-lg px-12 font-semibold">Workspace</h1>
                    
                    {/* Grid Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                                {gridConfigs[currentGrid].icon}
                                {currentGrid}
                                <ChevronDown className="h-3 w-3" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start">
                            {Object.entries(gridConfigs).map(([gridType, config]) => (
                                <DropdownMenuItem 
                                    key={gridType}
                                    onClick={() => handleGridChange(gridType as '1x1' | '2x1' | '3x1' | '2x2' | '3x3')}
                                    className="flex items-center gap-2"
                                >
                                    {config.icon}
                                    {gridType}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Time Filters */}
                    {timeFilters.map((filter) => (
                        <Button
                            key={filter.key}
                            variant={timeFilter === filter.key ? "default" : "outline"}
                            size="sm"
                            onClick={() => setTimeFilter(filter.key)}
                            className="flex items-center gap-2"
                        >
                            <Clock className="h-4 w-4" />
                            {filter.label}
                        </Button>
                    ))}

                    {/* Preset Annotations */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Add Annotation
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {presetAnnotations.map((annotation) => (
                                <DropdownMenuItem 
                                    key={annotation.id}
                                    onClick={() => handleAnnotationSelect(annotation.id)}
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    <span>{annotation.label}</span>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Playback Controls */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsPlaying(!isPlaying)}
                            >
                                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{isPlaying ? 'Pause' : 'Play'}</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                                <RotateCcw className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Reset</p>
                        </TooltipContent>
                    </Tooltip>

                    {/* Action Buttons */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Download</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Share</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Settings className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Settings</p>
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant={showTerminal ? "default" : "outline"}
                                size="sm"
                                onClick={() => setShowTerminal(v => !v)}
                            >
                                <span className="flex items-center gap-2">
                                    <span className="material-symbols-outlined">terminal</span>
                                    Terminal
                                </span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Toggle Terminal</p>
                        </TooltipContent>
                    </Tooltip>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex">
                    {/* Left Sidebar - Thin Toolbar */}
                    <div className="w-12 border-r bg-card flex flex-col items-center py-4 gap-4">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                                    <Search className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Search</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Filter</p>
                            </TooltipContent>
                        </Tooltip>

                        <Separator className="w-6" />

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Add Signal</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                                    <Minus className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Remove Signal</p>
                            </TooltipContent>
                        </Tooltip>

                        <Separator className="w-6" />

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                                    <Maximize2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Fullscreen</p>
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                                    <Minimize2 className="h-4 w-4" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                <p>Minimize</p>
                            </TooltipContent>
                        </Tooltip>
                    </div>

                    {/* Main Grid Area */}
                    <div className="flex-1 flex flex-col">
                        {/* Signal Grid */}
                        <div className="flex-1 p-4 overflow-auto">
                            <div className={`grid gap-4 min-h-full ${gridConfigs[currentGrid].className}`}>
                                {gridItems.map((item) => (
                                    <div key={`${currentGrid}-${item.id}`} className="relative bg-card rounded-lg border h-full">
                                        {item.signalId ? (
                                            <div className="h-full w-full">
                                                {item.signalId === 'heart_rate' && <HeartRateSignal key={`${currentGrid}-heart_rate`} timeFilter={timeFilter} />}
                                                {item.signalId === 'brain_activity' && <BrainActivitySignal key={`${currentGrid}-brain_activity`} timeFilter={timeFilter} />}
                                                {item.signalId === 'blood_pressure' && <BloodPressureSignal key={`${currentGrid}-blood_pressure`} timeFilter={timeFilter} />}
                                                {item.signalId === 'breathing_rate' && <BreathingRateSignal key={`${currentGrid}-breathing_rate`} timeFilter={timeFilter} />}
                                                {item.signalId === 'temperature' && <TemperatureSignal key={`${currentGrid}-temperature`} timeFilter={timeFilter} />}
                                                {item.signalId === 'activity' && <ActivityLevelSignal key={`${currentGrid}-activity`} timeFilter={timeFilter} />}
                                                {item.signalId === 'oxygen_saturation' && <OxygenSaturationSignal key={`${currentGrid}-oxygen_saturation`} timeFilter={timeFilter} />}
                                                {item.signalId === 'heart_rate_variability' && <HeartRateVariabilitySignal key={`${currentGrid}-heart_rate_variability`} timeFilter={timeFilter} />}
                                                {item.signalId === 'eda' && <EDASignal key={`${currentGrid}-eda`} timeFilter={timeFilter} />}
                                                {item.signalId === 'facial_expression' && <FacialExpressionSignal key={`${currentGrid}-facial_expression`} timeFilter={timeFilter} />}
                                                {item.signalId === 'eye_expression' && <EyeExpressionSignal key={`${currentGrid}-eye_expression`} timeFilter={timeFilter} />}
                                            </div>
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-md">
                                                <div className="text-center">
                                                    <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                                    <p className="text-sm text-muted-foreground">Drop signal here</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {showTerminal && (
                            <div className="border-t bg-black text-white h-full w-full" style={{ height: 350, minHeight: 350, maxHeight: 350 }}>
                                <TerminalUI />
                            </div>
                        )}
                    </div>

                    {/* Right Sidebar - Signals Panel */}
                    <div className="w-80 border-l bg-card p-4">
                        <div className="space-y-6">
                            {/* Available Signals */}
                            <div>
                                <h3 className="text-sm font-medium mb-3">Available Signals</h3>
                                <div className="space-y-2">
                                    {availableSignals.map((signal) => (
                                        <Button
                                            key={signal.id}
                                            variant={selectedSignals.includes(signal.id) ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => handleSignalSelect(signal.id)}
                                            className="w-full justify-start"
                                        >
                                            <div className="flex items-center gap-2 w-full">
                                                {signal.icon}
                                                <span className="flex-1 text-left">{signal.name}</span>
                                                <Badge 
                                                    variant={signal.status === 'active' ? 'default' : 'secondary'}
                                                    className="text-xs"
                                                >
                                                    {signal.status}
                                                </Badge>
                                            </div>
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <Separator />

                            {/* Selected Signals */}
                            <div>
                                <h3 className="text-sm font-medium mb-3">Selected Signals</h3>
                                <div className="space-y-2">
                                    {selectedSignals.map(signalId => {
                                        const signal = getSignalById(signalId)
                                        return signal ? (
                                            <div key={signalId} className="flex items-center gap-2 p-2 bg-muted rounded-md">
                                                {signal.icon}
                                                <span className="text-sm flex-1">{signal.name}</span>
                                                <Badge variant="outline" className="text-xs">
                                                    {signal.type}
                                                </Badge>
                                            </div>
                                        ) : null
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}

export default WorkspacePage