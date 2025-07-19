'use client'

import { Activity, Users, UserPlus, Stethoscope, UserCheck } from "lucide-react"
import Link from "next/link"
import { Button } from "./components/ui/atoms/Button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "./components/ui/atoms/Card"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex flex-col items-center justify-center gap-3 mb-4 md:flex-row md:gap-4">
          <Activity className="h-12 w-12 text-primary" />
          <h1 className="text-3xl font-bold sm:text-4xl">Patient Management System</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Manage patients, providers, and track clinical status changes with comprehensive history tracking.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <Card className="hover:shadow-lg transition-shadow flex flex-col">
          <CardHeader className="text-center">
            <Users className="h-12 w-12 mx-auto text-primary mb-2" />
            <CardTitle>View Patients</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground">
              View and manage all patients, update their status, and track their progress.
            </p>
          </CardContent>
          <div className="p-4">
            <Link href="/patients" passHref>
              <Button buttonClass="w-full cursor-pointer hover:bg-blue-600 rounded transition-colors">View Patients</Button>
            </Link>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow flex flex-col">
          <CardHeader className="text-center">
            <UserPlus className="h-12 w-12 mx-auto text-primary mb-2" />
            <CardTitle>Add Patient</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground mb-6">
              Register a new patient and assign them to a provider.
            </p>
          </CardContent>
          <div className="p-4">
            <Link href="/create-patient" passHref>
              <Button buttonClass="w-full cursor-pointer hover:bg-blue-600 rounded transition-colors">Add Patient</Button>
            </Link>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow flex flex-col">
          <CardHeader className="text-center">
            <Stethoscope className="h-12 w-12 mx-auto text-primary mb-2" />
            <CardTitle>View Providers</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground mb-6">
              View all healthcare providers and their specialties.
            </p>
          </CardContent>
          <div className="p-4">
            <Link href="/providers" passHref>
              <Button buttonClass="w-full cursor-pointer hover:bg-blue-600 rounded transition-colors">View Providers</Button>
            </Link>
          </div>
        </Card>

        <Card className="hover:shadow-lg transition-shadow flex flex-col">
          <CardHeader className="text-center">
            <UserCheck className="h-12 w-12 mx-auto text-primary mb-2" />
            <CardTitle>Add Provider</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-muted-foreground mb-12">
              Register a new healthcare provider to the system.
            </p>
          </CardContent>
          <div className="p-4">
            <Link href="/create-provider" passHref>
              <Button buttonClass="w-full cursor-pointer bg-primary hover:bg-blue-600 rounded transition-colors">Add Provider</Button>
            </Link>
          </div>
        </Card>

      </div>

      {/* Features section */}
      <div className="mt-12 text-center">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div>
                <h4 className="font-semibold mb-2">Patient Management</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Create and manage patient records</li>
                  <li>• Assign providers to patients</li>
                  <li>• Update patient status in real-time</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Status Tracking</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Hierarchical status system</li>
                  <li>• Complete status change history</li>
                  <li>• Automated status logging</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
