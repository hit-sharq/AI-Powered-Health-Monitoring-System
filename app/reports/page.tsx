"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Inbox, Download, CalendarIcon, TrendingUp, FileText, Share } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [date, setDate] = useState<Date | undefined>(new Date())

  const reports = [
    {
      id: "weekly-summary",
      title: "Weekly Health Summary",
      description: "Comprehensive overview of your health metrics for the past week",
      type: "summary",
      date: "2024-01-15",
      status: "ready",
      size: "2.3 MB",
    },
    {
      id: "monthly-trends",
      title: "Monthly Health Trends",
      description: "Detailed analysis of health patterns and trends over the past month",
      type: "analysis",
      date: "2024-01-01",
      status: "ready",
      size: "5.7 MB",
    },
    {
      id: "anomaly-report",
      title: "Anomaly Detection Report",
      description: "Summary of all health anomalies detected in the past 30 days",
      type: "alerts",
      date: "2024-01-10",
      status: "processing",
      size: "1.2 MB",
    },
    {
      id: "recommendations-report",
      title: "AI Recommendations Report",
      description: "Personalized health recommendations and their effectiveness",
      type: "recommendations",
      date: "2024-01-12",
      status: "ready",
      size: "3.1 MB",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="text-green-600 border-green-600">Ready</Badge>
      case "processing":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            Processing
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "summary":
        return "📊"
      case "analysis":
        return "📈"
      case "alerts":
        return "⚠️"
      case "recommendations":
        return "💡"
      default:
        return "📄"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Inbox className="h-5 w-5" />
            <h1 className="text-xl font-semibold">Health Reports</h1>
          </div>
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate New Report
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Report Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Custom Report</CardTitle>
            <CardDescription>Create a personalized health report for any time period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select defaultValue="comprehensive">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comprehensive">Comprehensive Health Report</SelectItem>
                    <SelectItem value="summary">Health Summary</SelectItem>
                    <SelectItem value="trends">Trend Analysis</SelectItem>
                    <SelectItem value="anomalies">Anomaly Report</SelectItem>
                    <SelectItem value="recommendations">Recommendations Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Time Period</label>
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Last Week</SelectItem>
                    <SelectItem value="month">Last Month</SelectItem>
                    <SelectItem value="quarter">Last Quarter</SelectItem>
                    <SelectItem value="year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="mt-4">
              <Button>
                <TrendingUp className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Available Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>Download or share your previously generated health reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{getTypeIcon(report.type)}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">{report.title}</h4>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Generated: {new Date(report.date).toLocaleDateString()}</span>
                        <span>Size: {report.size}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(report.status)}
                    {report.status === "ready" && (
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Report Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reports.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ready to Download</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {reports.filter((r) => r.status === "ready").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {reports.filter((r) => r.status === "processing").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.3 MB</div>
            </CardContent>
          </Card>
        </div>

        {/* Report Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
            <CardDescription>Quick access to commonly used report formats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🏥</span>
                  <h4 className="font-medium">Doctor Visit Report</h4>
                </div>
                <p className="text-sm text-muted-foreground">Comprehensive report formatted for healthcare providers</p>
              </div>

              <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📱</span>
                  <h4 className="font-medium">Personal Summary</h4>
                </div>
                <p className="text-sm text-muted-foreground">Easy-to-read summary of your health progress</p>
              </div>

              <div className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">📊</span>
                  <h4 className="font-medium">Detailed Analytics</h4>
                </div>
                <p className="text-sm text-muted-foreground">In-depth analysis with charts and trends</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
