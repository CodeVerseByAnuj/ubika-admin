"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicDetailsForm from "./BasicDetailsForm";
import PolicyDetailsForm from "./PolicyDetailsForm";
import EMRInstanceForm from "./EMRInstanceForm";
import HealthDetailsForm from "./HealthDetailsForm";

const StepHandler = () => {
  return (
    <div className="min-h-screen w-full bg-accent">
      <div className="mt-10 flex flex-col items-center gap-4">
        {/* Logo */}
        <div className="text-lg font-semibold text-primary"> Yubika</div>

        {/* Card */}
        <div className="w-full max-w-2xl rounded-xl border bg-white p-4 shadow-sm md:p-6">
          <Tabs defaultValue="personal-info">
            {/* Tabs */}
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal-info">Personal Info</TabsTrigger>

              <TabsTrigger value="privacy-consent">Privacy Consent</TabsTrigger>

              <TabsTrigger value="health-info">Health Info</TabsTrigger>

              <TabsTrigger value="emrlinking">EMR Linking</TabsTrigger>
            </TabsList>

            {/* Personal Info */}
            <TabsContent value="personal-info">
              <BasicDetailsForm />
            </TabsContent>

            {/* Privacy Consent */}
            <TabsContent value="privacy-consent">
              <PolicyDetailsForm />
            </TabsContent>

            {/* health info */}
            <TabsContent value="health-info">
              <HealthDetailsForm />
            </TabsContent>

            {/* Health System */}
            <TabsContent value="emrlinking">
              <EMRInstanceForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default StepHandler;
