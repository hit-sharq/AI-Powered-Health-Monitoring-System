"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Search, HelpCircle, MessageCircle, Book, Phone, Mail } from "lucide-react"
import { useState } from "react"

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const faqItems = [
    {
      question: "How do I connect my wearable device?",
      answer:
        "Go to Settings > Device & Data Settings > Connected Devices. Click 'Add Device' and follow the pairing instructions for your specific device model.",
    },
    {
      question: "What do the health alerts mean?",
      answer:
        "Health alerts are generated when your vital signs fall outside normal ranges. Critical alerts (red) require immediate attention, warnings (yellow) suggest monitoring, and info alerts (blue) are general recommendations.",
    },
    {
      question: "How accurate are the AI recommendations?",
      answer:
        "Our AI recommendations are based on medical guidelines and your personal health data patterns. They have an average confidence rating of 85-95%, but should not replace professional medical advice.",
    },
    {
      question: "Can I export my health data?",
      answer:
        "Yes, you can export your data in CSV format from the Metrics page or Settings page. Data includes all your health measurements, alerts, and recommendations.",
    },
    {
      question: "How is my health data protected?",
      answer:
        "All health data is encrypted in transit and at rest. We follow HIPAA compliance standards and never share personal health information without explicit consent.",
    },
    {
      question: "What should I do if I receive a critical alert?",
      answer:
        "Critical alerts indicate potentially serious health issues. Acknowledge the alert and consult with a healthcare professional immediately. Do not ignore critical alerts.",
    },
    {
      question: "How often is my data synchronized?",
      answer:
        "Data synchronization frequency can be configured in Settings. Default is every 5 minutes, but you can set it from 1 minute to 1 hour based on your needs.",
    },
    {
      question: "Can I share my health data with my doctor?",
      answer:
        "Yes, you can export your health reports and share them with healthcare providers. The data includes comprehensive health trends and AI-generated insights.",
    },
  ]

  const filteredFAQ = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          <h1 className="text-xl font-semibold">Help & Support</h1>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        {/* Search */}
        <Card>
          <CardHeader>
            <CardTitle>How can we help you?</CardTitle>
            <CardDescription>Search our knowledge base or browse frequently asked questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Help Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-base">Getting Started</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn how to set up your health monitoring system and connect devices
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-green-500" />
                <CardTitle className="text-base">Live Chat</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Chat with our support team for immediate assistance</p>
              <Badge variant="outline" className="mt-2 text-green-600 border-green-600">
                Available 24/7
              </Badge>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-purple-500" />
                <CardTitle className="text-base">Video Tutorials</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Watch step-by-step video guides for common tasks</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              {searchQuery ? `${filteredFAQ.length} results found` : "Common questions and answers"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {filteredFAQ.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filteredFAQ.length === 0 && searchQuery && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                <p className="text-sm text-muted-foreground mt-2">Try different keywords or contact support for help</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card>
          <CardHeader>
            <CardTitle>Still need help?</CardTitle>
            <CardDescription>Get in touch with our support team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@healthmonitor.com</p>
                    <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Phone Support</p>
                    <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                    <p className="text-xs text-muted-foreground">Mon-Fri, 9AM-6PM EST</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-muted-foreground">Available 24/7</p>
                    <Button size="sm" className="mt-2">
                      Start Chat
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">System Status</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Health Data API</span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Device Sync</span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Recommendations</span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Operational
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Alert System</span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Operational
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Notice */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Medical Emergency</CardTitle>
            <CardDescription className="text-red-700">
              If you are experiencing a medical emergency, do not rely on this application
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-red-700 mb-4">
              Call emergency services immediately (911 in the US) or go to your nearest emergency room. This health
              monitoring system is not a substitute for professional medical care.
            </p>
            <div className="flex gap-2">
              <Button variant="destructive" size="sm">
                Call 911
              </Button>
              <Button variant="outline" size="sm">
                Find Emergency Room
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
