"use client"

import { useState } from "react"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  type SortingState,
  getSortedRowModel,
  type ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface DiseaseCase {
  id: string
  name?: string
  age?: number
  gender?: string
  region: string
  date: string
  status: string
  severity: string
  symptoms?: string[]
}

interface DataTableProps {
  data: DiseaseCase[]
  isLoading: boolean
}

export default function DataTable({ data, isLoading }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<DiseaseCase>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: "Nome",
    },
    {
      accessorKey: "age",
      header: "Idade",
    },
    {
      accessorKey: "gender",
      header: "Gênero",
    },
    {
      accessorKey: "region",
      header: "Região",
    },
    {
      accessorKey: "date",
      header: "Data",
      cell: ({ row }) => {
        const date = row.getValue("date") as string
        return date ? new Date(date).toLocaleDateString("pt-BR") : "-"
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <div
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium w-fit",
              status === "active"
                ? "bg-yellow-100 text-yellow-800"
                : status === "recovered"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800",
            )}
          >
            {status === "active"
              ? "Ativo"
              : status === "recovered"
                ? "Recuperado"
                : status === "deceased"
                  ? "Óbito"
                  : status}
          </div>
        )
      },
    },
    {
      accessorKey: "severity",
      header: "Gravidade",
      cell: ({ row }) => {
        const severity = row.getValue("severity") as string
        return (
          <div
            className={cn(
              "px-2 py-1 rounded-full text-xs font-medium w-fit",
              severity === "mild"
                ? "bg-blue-100 text-blue-800"
                : severity === "moderate"
                  ? "bg-yellow-100 text-yellow-800"
                  : severity === "severe"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800",
            )}
          >
            {severity === "mild"
              ? "Leve"
              : severity === "moderate"
                ? "Moderado"
                : severity === "severe"
                  ? "Grave"
                  : severity}
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-8 w-[100px] ml-auto" />
        </div>
        <div className="border rounded-lg">
          <div className="h-10 border-b bg-muted/50 px-4">
            <div className="flex items-center h-full">
              {Array(8)
                .fill(null)
                .map((_, i) => (
                  <Skeleton key={i} className="h-4 w-[100px] mx-2" />
                ))}
            </div>
          </div>
          <div className="divide-y">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <div key={i} className="h-16 px-4">
                  <div className="flex items-center h-full">
                    {Array(8)
                      .fill(null)
                      .map((_, j) => (
                        <Skeleton key={j} className="h-4 w-[100px] mx-2" />
                      ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-[70px]" />
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Filtrar por região..."
          value={(table.getColumn("region")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("region")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <Select
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onValueChange={(value) => table.getColumn("status")?.setFilterValue(value)}
        >
          <SelectTrigger className="w-[180px] ml-auto">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="recovered">Recuperados</SelectItem>
            <SelectItem value="deceased">Óbitos</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-gray-100">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-gray-700 font-semibold">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50 border-gray-200"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-gray-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2">
        <div className="text-sm text-gray-600">
          Mostrando {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} a{" "}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length,
          )}{" "}
          de {table.getFilteredRowModel().rows.length} registros
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="border-gray-300 text-gray-700"
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="border-gray-300 text-gray-700"
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}

