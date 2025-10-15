"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type Entity = {
  id: number;
  name: string;
  email?: string;
  age?: number;
};

const mockData: Record<string, Entity[]> = {
  users: [
    { id: 1, name: "Иван Иванов", email: "ivan@example.com" },
    { id: 2, name: "Пётр Петров", email: "petr@example.com" },
  ],
  products: [
    { id: 1, name: "MacBook Pro", age: 2023 },
    { id: 2, name: "iPhone 15", age: 2024 },
  ],
};

export default function AdminPage() {
  const [tables] = useState(Object.keys(mockData));
  const [searchSidebar, setSearchSidebar] = useState("");
  const [currentTable, setCurrentTable] = useState("users");

  const [tableSearch, setTableSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);

  const data = mockData[currentTable].filter((row) =>
    row.name.toLowerCase().includes(tableSearch.toLowerCase())
  );

  const toggleSelect = (id: number) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const selectAll = () => setSelected(data.map((r) => r.id));
  const clearSelection = () => setSelected([]);
  const deleteSelected = () => {
    alert(`Удалено записей: ${selected.length}`);
    setSelected([]);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r p-4 flex flex-col">
        <Input
          placeholder="Поиск таблицы..."
          value={searchSidebar}
          onChange={(e) => setSearchSidebar(e.target.value)}
          className="mb-3"
        />
        <ScrollArea className="flex-1">
          <div className="space-y-1">
            {tables
              .filter((t) =>
                t.toLowerCase().includes(searchSidebar.toLowerCase())
              )
              .map((table) => (
                <Button
                  key={table}
                  variant={currentTable === table ? "default" : "ghost"}
                  className="w-full justify-start capitalize"
                  onClick={() => {
                    setCurrentTable(table);
                    setSelected([]);
                  }}
                >
                  {table}
                </Button>
              ))}
          </div>
        </ScrollArea>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold capitalize">{currentTable}</h1>
          <Button onClick={() => alert("Добавить новую запись")}>
            + Добавить
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">
              Фильтрация и поиск
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Поиск в таблице..."
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
              />
              <Button variant="outline" onClick={() => setTableSearch("")}>
                Сброс
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Список записей</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="max-h-[60vh]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10 text-center">
                      <Checkbox
                        checked={
                          selected.length === data.length && data.length > 0
                        }
                        onCheckedChange={(checked) =>
                          checked ? selectAll() : clearSelection()
                        }
                      />
                    </TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Название</TableHead>
                    <TableHead>Доп. данные</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((row) => (
                    <TableRow
                      key={row.id}
                      className={selected.includes(row.id) ? "bg-muted/40" : ""}
                    >
                      <TableCell className="text-center">
                        <Checkbox
                          checked={selected.includes(row.id)}
                          onCheckedChange={() => toggleSelect(row.id)}
                        />
                      </TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email || row.age || "—"}</TableCell>
                      <TableCell className="text-right pr-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            alert(`Удалена запись: ${row.name}`);
                          }}
                        >
                          Удалить
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <Separator />

        <div className="flex justify-between items-center">
          <Button
            variant="destructive"
            onClick={selected.length ? deleteSelected : undefined}
            disabled={!selected.length}
          >
            Удалить выбранные ({selected.length})
          </Button>
          {selected.length > 0 && (
            <Button variant="ghost" onClick={clearSelection}>
              Снять выделение
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
