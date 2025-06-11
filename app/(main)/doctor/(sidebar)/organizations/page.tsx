"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import axios from "axios";
import { GetDoctorOrganizationResponse } from "@/types/api";
 
const OrganizationsPage = () => {
  
  const [organizations, setOrganizations] = React.useState<{ organization_id: string; organization_name: string }[]>([]);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const userId = sessionStorage.getItem("doctorId");
        if (!userId) {
          console.error("No doctorId found in sessionStorage.");
          return;
        }
        const apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL || ""}/get-doctor-organization`;
        const response = await axios.get<GetDoctorOrganizationResponse>(
          apiUrl,
          {
            headers: {
              "UserID": userId,
            },
          }
        );
        setOrganizations(response.data.organization);
        console.log("Fetched organizations:", response.data.organization);
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
      }
    };
  
    fetchOrganizations();
  }, []);

  const router = useRouter();
  // const organizations = [
  //   {
  //     id: 1,
  //     name: "City Hospital",
  //   },
  //   {
  //     id: 2,
  //     name: "Green Valley Clinic",
  //   },
  //   {
  //     id: 3,
  //     name: "Sunrise Medical Center",
  //   },
  // ]

  const handleSelectOrganization = (orgId: string, orgName: string) => {

    const organization = {
      organization_id: orgId,
      organization_name: orgName,
    }

    sessionStorage.setItem("organization", JSON.stringify(organization))
    console.log(`Organization stored in session storage:`, organization)
    router.replace("home")  
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Select Your Organization</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <Card key={org.organization_id} className="border-1 hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-center">{org.organization_name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full bg-gray-800"
                onClick={() => handleSelectOrganization(org.organization_id, org.organization_name)}
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