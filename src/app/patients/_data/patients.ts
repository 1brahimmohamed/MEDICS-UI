export type Patient = {
    id: string
    name: string
    gender: "Male" | "Female" | "Other"
    age: number
    lastSession: string
  }

export const patientsData: Patient[] = [
    {
      id: "P001",
      name: "John Smith",
      gender: "Male",
      age: 45,
      lastSession: "2024-01-15 14:30",
    },
    {
      id: "P002",
      name: "Sarah Johnson",
      gender: "Female",
      age: 32,
      lastSession: "2024-01-14 09:15",
    },
    {
      id: "P003",
      name: "Michael Brown",
      gender: "Male",
      age: 58,
      lastSession: "2024-01-13 16:45",
    },
    {
      id: "P004",
      name: "Emily Davis",
      gender: "Female",
      age: 29,
      lastSession: "2024-01-12 11:20",
    },
    {
      id: "P005",
      name: "David Wilson",
      gender: "Male",
      age: 41,
      lastSession: "2024-01-11 13:10",
    },
    {
      id: "P006",
      name: "Emma Johnson",
      gender: "Female",
      age: 35,
      lastSession: "2024-01-10 10:00",
    },
    {
      id: "P007",
      name: "James Brown",
      gender: "Male",
      age: 52,
      lastSession: "2024-01-09 12:30",
    },
    {
      id: "P008",
      name: "Olivia White",
      gender: "Female",
      age: 28,
      lastSession: "2024-01-08 15:15",
    },
    {
      id: "P009",
      name: "William Green",
      gender: "Male",
      age: 49,
      lastSession: "2024-01-07 11:45",
    },
    {
      id: "P010",
      name: "Sophia Black",
      gender: "Female",
      age: 31,
      lastSession: "2024-01-06 14:20",
    },
    {
      id: "P011",
      name: "James Green",
      gender: "Female",
      age: 52,
      lastSession: "2024-01-05 12:30",
    },
    {
      id: "P012",
      name: "James Green",
      gender: "Male",
      age: 52,
      lastSession: "2024-01-05 12:30",
    },
    {
      id: "P013",
      name: "James Green",
      gender: "Female",
      age: 52,
      lastSession: "2024-01-05 12:30",
    },
  ]
  