"use client"

import { Study } from "../_data/studies"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown, MoreHorizontal, ChevronDown, Users } from "lucide-react"
import { useState } from "react"

const StudyNameCell = ({ study }: { study: Study }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="h-6 w-6 p-0 hover:bg-muted"
        >
          <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>
        <span className="font-medium">{study.name}</span>
      </div>
      
      {isExpanded && (
        <div className="ml-6 space-y-2 border-l-2 border-muted pl-4">
          <div className="text-sm font-medium text-muted-foreground mb-2">
            Patients in this study:
          </div>
          {study.patients.map((patient) => (
            <div key={patient.id} className="flex items-center justify-between bg-muted/50 rounded-md p-2">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-background flex items-center justify-center text-xs font-medium border">
                  {patient.name.split(" ").map((n) => n[0]).join("").toUpperCase()}
                </div>
                <span className="font-medium text-sm">{patient.name}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                {patient.age} years, {patient.gender}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export const studiesColumns: ColumnDef<Study>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Study Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <StudyNameCell study={row.original} />,
  },
  {
    accessorKey: "patientCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Patients
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">{row.getValue("patientCount")}</span>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const getStatusColor = (status: string) => {
        switch (status) {
          case "Active":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
          case "Completed":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
          case "On Hold":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
          default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
        }
      }
      
      return (
        <Badge className={getStatusColor(status)}>
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return (
        <div className="text-sm text-muted-foreground">
          {date.toLocaleDateString()}
        </div>
      )
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const study = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(study.id)}
            >
              Copy study ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View study details</DropdownMenuItem>
            <DropdownMenuItem>Edit study</DropdownMenuItem>
            <DropdownMenuItem>Add patients</DropdownMenuItem>
            <DropdownMenuItem>Export data</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
] 