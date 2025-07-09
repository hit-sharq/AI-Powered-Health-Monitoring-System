"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Settings, User, Bell, Shield, Database, Smartphone, Save } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Profile Settings
    name: "Health User",
    email: "user@health.com",
    age: "30",
    weight: "70",
    height: "175",

    // Notification Settings
    realTimeAlerts: true,
    emailNotifications: true,
    pushNotifications: false,
    alertThreshold: "medium",

    // Privacy Settings
    dataSharing: false,
    anonymousAnalytics: true,

    // Device Settings
    syncInterval: "5",
    dataRetention: "365",
    autoExport: false,
  })

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log("Saving settings:", settings)
    // Show success message
  }

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <h1 className="text-xl font-semibold">Settings</h1>
          </div>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>Manage your personal information and health profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={settings.name} onChange={(e) => updateSetting("name", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) => updateSetting("email", e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={settings.age}
                  onChange={(e) => updateSetting("age", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={settings.weight}
                  onChange={(e) => updateSetting("weight", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={settings.height}
                  onChange={(e) => updateSetting("height", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>Configure how you receive health alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Real-time Health Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get immediate notifications for critical health anomalies
                </p>
              </div>
              <Switch
                checked={settings.realTimeAlerts}
                onCheckedChange={(checked) => updateSetting("realTimeAlerts", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive daily health summaries and recommendations via email
                </p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => updateSetting("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Get push notifications on your mobile device</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => updateSetting("pushNotifications", checked)}
              />
            </div>

            <div className="space-y-2">
              <Label>Alert Sensitivity</Label>
              <Select value={settings.alertThreshold} onValueChange={(value) => updateSetting("alertThreshold", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Only critical alerts</SelectItem>
                  <SelectItem value="medium">Medium - Important alerts</SelectItem>
                  <SelectItem value="high">High - All anomalies</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy & Security
            </CardTitle>
            <CardDescription>Control how your health data is used and shared</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Data Sharing</Label>
                <p className="text-sm text-muted-foreground">Allow sharing anonymized data for medical research</p>
              </div>
              <Switch
                checked={settings.dataSharing}
                onCheckedChange={(checked) => updateSetting("dataSharing", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Anonymous Analytics</Label>
                <p className="text-sm text-muted-foreground">Help improve the system by sharing usage analytics</p>
              </div>
              <Switch
                checked={settings.anonymousAnalytics}
                onCheckedChange={(checked) => updateSetting("anonymousAnalytics", checked)}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Data Security</h4>
              <div className="grid gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Data Encryption</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Enabled
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Two-Factor Authentication</span>
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                    Recommended
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Data Backup</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Active
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Device & Data Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5" />
              Device & Data Settings
            </CardTitle>
            <CardDescription>Configure data collection and device synchronization</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Sync Interval (minutes)</Label>
                <Select value={settings.syncInterval} onValueChange={(value) => updateSetting("syncInterval", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 minute</SelectItem>
                    <SelectItem value="5">5 minutes</SelectItem>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Data Retention (days)</Label>
                <Select value={settings.dataRetention} onValueChange={(value) => updateSetting("dataRetention", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="90">90 days</SelectItem>
                    <SelectItem value="365">1 year</SelectItem>
                    <SelectItem value="730">2 years</SelectItem>
                    <SelectItem value="-1">Forever</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Automatic Data Export</Label>
                <p className="text-sm text-muted-foreground">Automatically export health data weekly</p>
              </div>
              <Switch
                checked={settings.autoExport}
                onCheckedChange={(checked) => updateSetting("autoExport", checked)}
              />
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="text-sm font-medium">Connected Devices</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Health Monitor Pro</p>
                      <p className="text-xs text-muted-foreground">Last sync: 2 minutes ago</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Connected
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-gray-400 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Smart Scale</p>
                      <p className="text-xs text-muted-foreground">Last sync: 2 hours ago</p>
                    </div>
                  </div>
                  <Badge variant="outline">Offline</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              System Information
            </CardTitle>
            <CardDescription>Application version and system status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Application Version</Label>
                <p className="text-sm">v1.0.0</p>
              </div>
              <div className="space-y-2">
                <Label>Last Update</Label>
                <p className="text-sm">{new Date().toLocaleDateString()}</p>
              </div>
              <div className="space-y-2">
                <Label>Data Storage</Label>
                <p className="text-sm">2.3 GB used</p>
              </div>
              <div className="space-y-2">
                <Label>System Status</Label>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">All systems operational</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions that affect your account and data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
              <div>
                <h4 className="text-sm font-medium">Export All Data</h4>
                <p className="text-xs text-muted-foreground">Download all your health data</p>
              </div>
              <Button variant="outline" size="sm">
                Export Data
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
              <div>
                <h4 className="text-sm font-medium">Delete All Data</h4>
                <p className="text-xs text-muted-foreground">Permanently delete all health records</p>
              </div>
              <Button variant="destructive" size="sm">
                Delete Data
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
