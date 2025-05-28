"use client"

import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendItem, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for the chart
const data = [
  { name: "Technology", value: 35, color: "hsl(var(--chart-1))" },
  { name: "Gaming", value: 25, color: "hsl(var(--chart-2))" },
  { name: "Entertainment", value: 15, color: "hsl(var(--chart-3))" },
  { name: "Education", value: 12, color: "hsl(var(--chart-4))" },
  { name: "Other", value: 13, color: "hsl(var(--chart-5))" },
]

export function GroupCategoryDistribution() {
  return (
    <div className="space-y-4">
      <ChartLegend className="flex-wrap gap-4">
        {data.map((entry, index) => (
          <ChartLegendItem key={`legend-${index}`} name={entry.name} color={entry.color} />
        ))}
      </ChartLegend>

      <ChartContainer className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <ChartTooltip>
                      <ChartTooltipContent>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
                          <p className="font-semibold">{payload[0].name}</p>
                        </div>
                        <p className="text-sm">
                          {payload[0].value} channels ({((payload[0].value / 100) * 100).toFixed(0)}%)
                        </p>
                      </ChartTooltipContent>
                    </ChartTooltip>
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
