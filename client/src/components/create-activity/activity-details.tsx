import { UseFormReturn } from "react-hook-form"; 
import { InsertActivity } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ActivityDetailsProps {
  form: UseFormReturn<InsertActivity>;
  onNext: () => void;
}

export default function ActivityDetails({ form, onNext }: ActivityDetailsProps) {
  const { toast } = useToast();

  const validateStep = async () => {
    const requiredFields = ["name", "category", "description", "activity_type", "location_type"];

    const isValid = await form.trigger(requiredFields);

    if (isValid) {
      onNext();
    } else {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800">Activity Details</h1>
      <div className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Activity Name <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Eg: Cooking class in Palo Alto" {...field} className="rounded-lg bg-white" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Select the best category to describe your activity <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  {[
                    "Adventure & Games",
                    "Creative Expression",
                    "Food & Drink",
                    "Learning & Development",
                    "Sports and Fitness",
                    "Volunteering",
                    "Other"
                  ].map((category) => (
                    <FormItem key={category} className="flex items-center space-x-3">
                      <FormControl>
                        <RadioGroupItem 
                          value={category} 
                          className="text-gray-800 border-gray-400 focus:ring-gray-800"
                        />
                      </FormControl>
                      <FormLabel className="mb-0 text-gray-700">{category}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Activity Description <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Activity Description"
                  className="min-h-[100px] rounded-lg bg-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="activity_type" 
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Please select the activity type <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  {["Indoor", "Outdoor", "Virtual"].map((type) => (
                    <FormItem key={type} className="flex items-center space-x-3">
                      <FormControl>
                        <RadioGroupItem 
                          value={type} 
                          className="text-gray-800 border-gray-400 focus:ring-gray-800"
                        />
                      </FormControl>
                      <FormLabel className="mb-0 text-gray-700">{type}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Please select the type of location <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-3"
                >
                  {[
                    { value: "Provider Location", label: "Provider Location (activity takes place at the provider's venue)" },
                    { value: "User Location", label: "User Location (activity takes place at the user's venue)" }
                  ].map((type) => (
                    <FormItem key={type.value} className="flex items-center space-x-3">
                      <FormControl>
                        <RadioGroupItem 
                          value={type.value} 
                          className="text-gray-800 border-gray-400 focus:ring-gray-800"
                        />
                      </FormControl>
                      <FormLabel className="mb-0 text-gray-700">{type.label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel className="text-gray-700">How many members can take part in the activity?</FormLabel>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="min_members"
              render={({ field: { value, onChange, ...field }}) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Minimum Members</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      value={value || ''} 
                      onChange={e => onChange(e.target.value ? Number(e.target.value) : undefined)}
                      className="rounded-lg bg-white" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="max_members"
              render={({ field: { value, onChange, ...field }}) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Maximum Members</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      value={value || ''} 
                      onChange={e => onChange(e.target.value ? Number(e.target.value) : undefined)}
                      className="rounded-lg bg-white" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button 
            type="button" 
            onClick={validateStep}
            className="group relative bg-gray-800 hover:bg-gray-700 text-white"
          >
            Save and Continue
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}