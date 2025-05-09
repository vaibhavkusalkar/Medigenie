"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const OrganizationsPage = () => {
  const router = useRouter();
  const organizations = [
    {
      id: 1,
      name: "City Hospital",
    },
    {
      id: 2,
      name: "Green Valley Clinic",
    },
    {
      id: 3,
      name: "Sunrise Medical Center",
    },
  ]

  const handleSelectOrganization = (orgId: number, orgName: string) => {

    const organization = {
      id: orgId,
      name: orgName,
    }

    sessionStorage.setItem("organization", JSON.stringify(organization))
    console.log(`Organization stored in session storage:`, organization)
    router.replace("home")  
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Select Your Organization</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <Card key={org.id} className="border-1 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-center">{org.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-gray-800"
                onClick={() => handleSelectOrganization(org.id, org.name)}
              >
                Select
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default OrganizationsPage