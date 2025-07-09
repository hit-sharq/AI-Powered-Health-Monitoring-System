"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { User, Edit, Camera, Heart, Activity, Target, Calendar } from "lucide-react"
import { useState } from "react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Health User",
    email: "user@health.com",
    age: 30,
    height: 175,
    weight: 70,
    bloodType: "O+",
    emergencyContact: "+1 (555) 123-4567",
    medicalConditions: "None",
    medications: "None",
    allergies: "None",
    fitnessGoals: "Maintain healthy lifestyle and improve cardiovascular health",
    joinDate: "2024-01-01",
  })

  const healthStats = {
    totalDays: 45,
    averageHeartRate: 72,
    averageSteps: 8500,
    healthScore: 85,
    goalsAchieved: 12,
    totalGoals: 15,
  }

  const handleSave = () => {
    // In a real app, this would save to the backend
    console.log("Saving profile:", profile)
    setIsEditing(false)
  }

  const updateProfile = (key: string, value: any) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <h1 className="text-xl font-semibold">Profile</h1>
          </div>
          <Button
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
            variant={isEditing ? "default" : "outline"}
          >
            {isEditing ? (
              "Save Changes"
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-user.jpg" alt="Profile" />
                  <AvatarFallback className="text-lg">
                    <User className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.email}</p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                  <Badge variant="outline">Age: {profile.age}</Badge>
                  <Badge variant="outline">Blood Type: {profile.bloodType}</Badge>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Health Score: {healthStats.healthScore}%
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Member since {new Date(profile.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Health Statistics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Days Active
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{healthStats.totalDays}</div>
              <p className="text-xs text-muted-foreground">Consecutive monitoring</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Avg Heart Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{healthStats.averageHeartRate} bpm</div>
              <p className="text-xs text-muted-foreground">Resting heart rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Daily Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{healthStats.averageSteps.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Average per day</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Goals Achieved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {healthStats.goalsAchieved}/{healthStats.totalGoals}
              </div>
              <Progress value={(healthStats.goalsAchieved / healthStats.totalGoals) * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic demographic and contact information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => updateProfile("name", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => updateProfile("email", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={profile.age}
                  onChange={(e) => updateProfile("age", Number.parseInt(e.target.value))}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={profile.height}
                  onChange={(e) => updateProfile("height", Number.parseInt(e.target.value))}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={profile.weight}
                  onChange={(e) => updateProfile("weight", Number.parseInt(e.target.value))}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bloodType">Blood Type</Label>
                <Input
                  id="bloodType"
                  value={profile.bloodType}
                  onChange={(e) => updateProfile("bloodType", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={profile.emergencyContact}
                  onChange={(e) => updateProfile("emergencyContact", e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medical Information */}
        <Card>
          <CardHeader>
            <CardTitle>Medical Information</CardTitle>
            <CardDescription>Health conditions, medications, and allergies</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="medicalConditions">Medical Conditions</Label>
              <Textarea
                id="medicalConditions"
                value={profile.medicalConditions}
                onChange={(e) => updateProfile("medicalConditions", e.target.value)}
                disabled={!isEditing}
                placeholder="List any chronic conditions, past surgeries, or ongoing health issues"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="medications">Current Medications</Label>
              <Textarea
                id="medications"
                value={profile.medications}
                onChange={(e) => updateProfile("medications", e.target.value)}
                disabled={!isEditing}
                placeholder="List all current medications, dosages, and frequency"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                value={profile.allergies}
                onChange={(e) => updateProfile("allergies", e.target.value)}
                disabled={!isEditing}
                placeholder="List any known allergies to medications, foods, or environmental factors"
              />
            </div>
          </CardContent>
        </Card>

        {/* Fitness Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Fitness & Health Goals</CardTitle>
            <CardDescription>Your personal health and wellness objectives</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="fitnessGoals">Health Goals</Label>
              <Textarea
                id="fitnessGoals"
                value={profile.fitnessGoals}
                onChange={(e) => updateProfile("fitnessGoals", e.target.value)}
                disabled={!isEditing}
                placeholder="Describe your health and fitness goals"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>Data & Privacy</CardTitle>
            <CardDescription>Manage your health data and privacy settings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Data Export</h4>
                  <p className="text-sm text-muted-foreground">Download all your health data</p>
                </div>
                <Button variant="outline" size="sm">
                  Export Data
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Account Deletion</h4>
                  <p className="text-sm text-muted-foreground">Permanently delete your account and data</p>
                </div>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
