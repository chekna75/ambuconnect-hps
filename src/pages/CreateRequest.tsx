import React, { useState } from "react"; // Add useState
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea"; // Added Textarea
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // Added RadioGroup
import { DashboardLayout } from "components/DashboardLayout";
import { toast } from "sonner"; // Import toast
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Add missing Card imports
import { Input } from "@/components/ui/input";

// Define the form schema using Zod
const formSchema = z.object({
  patientName: z.string().optional(),
  departureAddress: z.string().min(5, {
    message: "Departure address must be at least 5 characters.",
  }),
  destinationAddress: z.string().min(5, {
    message: "Destination address must be at least 5 characters.",
  }),
  pickupTime: z.string().refine((val) => !isNaN(Date.parse(val)), { // Basic check for valid date/time string
    message: "Please select a valid date and time.",
  }),
  transportType: z.enum(["Seated", "Stretcher", "Urgent"], {
    required_error: "You need to select a transport type.",
  }),
  additionalInfo: z.string().max(500, "Maximum 500 characters").optional(),
});

// Default value for departure - needs configuration later
const DEFAULT_DEPARTURE_ADDRESS = "Main Hospital Entrance, 123 Health St.";

export default function CreateRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false); // Add submitting state

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      departureAddress: DEFAULT_DEPARTURE_ADDRESS, // Pre-fill departure
      destinationAddress: "",
      pickupTime: "",
      // transportType: undefined, // Handled by RadioGroup default
      additionalInfo: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log("Form submitted:", values);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Replace with actual API call to submit the request
    console.log("Mock submission successful!");

    toast.success("Transport request created successfully!");
    form.reset(); // Reset form fields
    setIsSubmitting(false);
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold text-ambu-dark mb-6">Create New Transport Request</h1>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">Transport Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="patientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient Name (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter patient's full name" {...field} />
                      </FormControl>
                      <FormDescription>
                        Leave blank for anonymous requests.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="departureAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Departure Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter departure address" {...field} />
                      </FormControl>
                      <FormDescription>
                        Defaults to the main establishment address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* --- Destination Address --- */}
                <FormField
                  control={form.control}
                  name="destinationAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Destination Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter destination address" {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                 {/* --- Desired Pickup Time --- */}
                 <FormField
                  control={form.control}
                  name="pickupTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Desired Pickup Time</FormLabel>
                      <FormControl>
                         {/* Using native datetime-local for simplicity, might need ShadCN Calendar/Time Picker later */}
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                 {/* --- Transport Type --- */}
                 <FormField
                  control={form.control}
                  name="transportType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Transport Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Seated" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Seated (Assis)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Stretcher" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Stretcher (Allongé)
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Urgent" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Urgent
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* --- Additional Information --- */}
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Information (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="e.g., Requires oxygen, patient is frail, specific entrance..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Any extra details helpful for the transport team.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-ambu-blue hover:bg-ambu-dark">
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
