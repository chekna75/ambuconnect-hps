import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DashboardLayout } from "components/DashboardLayout";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

// Définir le schéma du formulaire avec Zod
const formSchema = z.object({
  patientName: z.string().optional(),
  departureAddress: z.string().min(5, {
    message: "L'adresse de départ doit contenir au moins 5 caractères.",
  }),
  destinationAddress: z.string().min(5, {
    message: "L'adresse de destination doit contenir au moins 5 caractères.",
  }),
  pickupTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Veuillez sélectionner une date et une heure valides.",
  }),
  transportType: z.enum(["Assis", "Brancard", "Urgent"], {
    required_error: "Vous devez sélectionner un type de transport.",
  }),
  additionalInfo: z.string().max(500, "Maximum 500 caractères").optional(),
});

// Valeur par défaut pour le départ - à configurer plus tard
const DEFAULT_DEPARTURE_ADDRESS = "Entrée Principale de l'Hôpital, 123 Rue de la Santé";

export default function CreateRequestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Définir le formulaire
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: "",
      departureAddress: DEFAULT_DEPARTURE_ADDRESS,
      destinationAddress: "",
      pickupTime: "",
      additionalInfo: "",
    },
  });

  // 2. Définir le gestionnaire de soumission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    console.log("Formulaire soumis:", values);

    // Simuler un délai d'appel API
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Remplacer par un véritable appel API pour soumettre la demande
    console.log("Soumission simulée réussie!");

    toast.success("Demande de transport créée avec succès!");
    form.reset();
    setIsSubmitting(false);
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8">
        <h1 className="text-3xl font-bold text-ambu-dark mb-6">Créer une Nouvelle Demande de Transport</h1>
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-xl">Détails du Transport</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="patientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du Patient (Optionnel)</FormLabel>
                      <FormControl>
                        <Input placeholder="Entrez le nom complet du patient" {...field} />
                      </FormControl>
                      <FormDescription>
                        Laissez vide pour les demandes anonymes.
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
                      <FormLabel>Adresse de Départ</FormLabel>
                      <FormControl>
                        <Input placeholder="Entrez l'adresse de départ" {...field} />
                      </FormControl>
                      <FormDescription>
                        Par défaut, l'adresse principale de l'établissement.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="destinationAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Adresse de Destination</FormLabel>
                      <FormControl>
                        <Input placeholder="Entrez l'adresse de destination" {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="pickupTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Heure de Prise en Charge Souhaitée</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                       <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="transportType"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Type de Transport</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1 md:flex-row md:space-y-0 md:space-x-4"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Assis" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Assis
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="Brancard" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Brancard
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
                <FormField
                  control={form.control}
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Informations Complémentaires (Optionnel)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ex: Nécessite de l'oxygène, patient fragile, entrée spécifique..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Tous détails supplémentaires utiles pour l'équipe de transport.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto bg-ambu-blue hover:bg-ambu-dark">
                  {isSubmitting ? "Envoi en cours..." : "Soumettre la Demande"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
