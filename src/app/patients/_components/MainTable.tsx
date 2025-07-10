"use client"

import React, {useState} from "react"

import {
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table"

import {
    IconChevronDown,
    IconLayoutColumns,
  } from "@tabler/icons-react"

import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { patientsData } from "../_data/patients"
import { patientColumns } from "./PatientsColumns"
import { studiesData } from "../_data/studies"
import { studiesColumns } from "./StudiesColumns"
import { flexRender } from "@tanstack/react-table"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import DataTable from "./DataTable"



const MainTable = ({ onTabChange }: { onTabChange: (tab: string) => void }) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })


    const patientTable = useReactTable({
        data: patientsData,
        columns: patientColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    })

    const studyTable = useReactTable({
        data: studiesData,
        columns: studiesColumns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    })

    return (
        <Tabs
        defaultValue="patients"
        className="w-full flex-col justify-start gap-6"
        onValueChange={(value) => {
            if (value === "patients") {
                onTabChange("patients")
            } else if (value === "studies") {
                onTabChange("studies")
            }
        }}
      >
        <div className="flex items-center justify-between">
        
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
          <TabsTrigger value="patients">Patients</TabsTrigger>
          <TabsTrigger value="studies"> Studies</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {patientTable
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <TabsContent
        value="patients"
        className="relative flex flex-col gap-4 overflow-auto"
      >
      <DataTable />
    </TabsContent>  

    <TabsContent
        value="studies"
        className="relative flex flex-col gap-4 overflow-auto"
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="rounded-md border">
            <Table className="w-full">
              <TableHeader className="bg-gray-100 dark:bg-secondary sticky top-0 z-10">
                {studyTable.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} className="px-4">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {studyTable.getRowModel().rows?.length ? (
                  studyTable.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="px-4">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={studiesColumns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination Controls */}
          <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">Rows per page</p>
                <select
                  value={studyTable.getState().pagination.pageSize}
                  onChange={(e) => {
                    studyTable.setPageSize(Number(e.target.value))
                  }}
                  className="h-8 w-[70px] rounded border border-input bg-background px-3 py-1 text-sm"
                >
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>
            <div className="flex items-center space-x-6 lg:space-x-8">
              
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Page {studyTable.getState().pagination.pageIndex + 1} of{" "}
                {studyTable.getPageCount()}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="h-8 w-8 rounded border border-input bg-background p-0 hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => studyTable.previousPage()}
                  disabled={!studyTable.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  className="h-8 w-8 rounded border border-input bg-background p-0 hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  onClick={() => studyTable.nextPage()}
                  disabled={!studyTable.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
    )
}

export default MainTable;