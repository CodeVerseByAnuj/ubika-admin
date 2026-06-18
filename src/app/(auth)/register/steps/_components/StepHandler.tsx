"use client";

import { useState } from "react";
import BasicDetailsForm from "./BasicDetailsForm";
import PolicyDetailsForm from "./PolicyDetailsForm";
import HealthDetailsForm from "./HealthDetailsForm";
import EMRInstanceForm from "./EMRInstanceForm";
import ApplicationLogo from "@/components/common/ApplicationLogo";

const StepHandler = () => {
  const [step, setStep] = useState(1);

  const totalSteps = 4;

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-12">
      <div className="mx-auto max-w-lg">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <ApplicationLogo />
        </div>

        {/* Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 md:p-8">
          {/* Step Number */}
          <p className="mb-3 text-xs font-serif uppercase tracking-[0.3em] text-slate-500">
            Step {step} of {totalSteps}
          </p>

          {/* Progress */}
          <div className="mb-8 flex gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className={`h-1.5 flex-1 rounded-full transition-all ${
                  item <= step ? "bg-primary" : "bg-slate-200"
                }`}
              />
            ))}
          </div>

          {/* Form Content */}
          {step === 1 && <BasicDetailsForm onNext={() => setStep(2)} />}

          {step === 2 && <PolicyDetailsForm onNext={() => setStep(3)} />}

          {step === 3 && <HealthDetailsForm onNext={() => setStep(4)} />}

          {step === 4 && <EMRInstanceForm />}
        </div>
      </div>
    </div>
  );
};

export default StepHandler;
