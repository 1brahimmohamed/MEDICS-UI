import { Patient } from "./patients"

export type Study = {
  id: string
  name: string
  patientCount: number
  patients: Patient[]
  createdAt: string
  status: "Active" | "Completed" | "On Hold"
}

export const studiesData: Study[] = [
  {
    id: "S001",
    name: "Cardiovascular Health Study",
    patientCount: 5,
    patients: [
      {
        id: "P001",
        name: "John Smith",
        gender: "Male",
        age: 45,
        lastSession: "2024-01-15 14:30",
      },
      {
        id: "P003",
        name: "Michael Brown",
        gender: "Male",
        age: 58,
        lastSession: "2024-01-13 16:45",
      },
      {
        id: "P005",
        name: "David Wilson",
        gender: "Male",
        age: 41,
        lastSession: "2024-01-11 13:10",
      },
      {
        id: "P007",
        name: "James Brown",
        gender: "Male",
        age: 52,
        lastSession: "2024-01-09 12:30",
      },
      {
        id: "P009",
        name: "William Green",
        gender: "Male",
        age: 49,
        lastSession: "2024-01-07 11:45",
      },
    ],
    createdAt: "2024-01-01",
    status: "Active",
  },
  {
    id: "S002",
    name: "Women's Health Initiative",
    patientCount: 4,
    patients: [
      {
        id: "P002",
        name: "Sarah Johnson",
        gender: "Female",
        age: 32,
        lastSession: "2024-01-14 09:15",
      },
      {
        id: "P004",
        name: "Emily Davis",
        gender: "Female",
        age: 29,
        lastSession: "2024-01-12 11:20",
      },
      {
        id: "P006",
        name: "Emma Johnson",
        gender: "Female",
        age: 35,
        lastSession: "2024-01-10 10:00",
      },
      {
        id: "P008",
        name: "Olivia White",
        gender: "Female",
        age: 28,
        lastSession: "2024-01-08 15:15",
      },
    ],
    createdAt: "2024-01-05",
    status: "Active",
  },
  {
    id: "S003",
    name: "Geriatric Care Study",
    patientCount: 3,
    patients: [
      {
        id: "P003",
        name: "Michael Brown",
        gender: "Male",
        age: 58,
        lastSession: "2024-01-13 16:45",
      },
      {
        id: "P007",
        name: "James Brown",
        gender: "Male",
        age: 52,
        lastSession: "2024-01-09 12:30",
      },
      {
        id: "P009",
        name: "William Green",
        gender: "Male",
        age: 49,
        lastSession: "2024-01-07 11:45",
      },
    ],
    createdAt: "2024-01-10",
    status: "On Hold",
  },
  {
    id: "S004",
    name: "Young Adults Health",
    patientCount: 2,
    patients: [
      {
        id: "P004",
        name: "Emily Davis",
        gender: "Female",
        age: 29,
        lastSession: "2024-01-12 11:20",
      },
      {
        id: "P008",
        name: "Olivia White",
        gender: "Female",
        age: 28,
        lastSession: "2024-01-08 15:15",
      },
    ],
    createdAt: "2024-01-15",
    status: "Completed",
  },
] 