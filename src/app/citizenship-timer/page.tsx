'use client';

import { useState, useEffect, useTransition } from 'react'; // Added useTransition import
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { addYears, subDays, format, differenceInDays, isValid, parse, startOfDay } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
// Assume sendEmailReminder exists and works
import { sendEmailReminder } from '@/services/citizenship-timer';
import { LoginSignupDialog } from '@/components/login-signup-dialog'; // Re-use dialog

const DATE_FORMAT = 'MM/dd/yyyy'; // Define the date format

const FormSchema = z.object({
  greenCardDate: z.date({
    required_error: 'Your Green Card issue date is required.',
    invalid_type_error: 'Please enter a valid date.',
  }),
  name: z.string().optional(),
  email: z.string().email({ message: 'Please enter a valid email.' }).optional(),
}).refine(data => {
    // Require name and email only if one of them is filled for reminder
    if (data.name || data.email) {
        return !!data.name && !!data.email;
    }
    return true;
}, {
    message: 'Both name and email are required for reminders.',
    path: ['email'], // Attach error to email field for visibility
});

type EligibilityResult = {
    eligibilityDate: Date;
    daysRemaining: number;
    canApplyNow: boolean;
};

// Helper function to format input value as MM/DD/YYYY
const formatInputDate = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  let formatted = digits;
  if (digits.length > 2) {
    formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  if (digits.length > 4) {
    formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
  }
  return formatted;
};

export default function CitizenshipTimerPage() {
  const [eligibilityResult, setEligibilityResult] = useState<EligibilityResult | null>(null);
  const [isSubmittingReminder, setIsSubmittingReminder] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [displayDate, setDisplayDate] = useState(''); // Local state for input display
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { toast } = useToast();
  const currentYear = new Date().getFullYear();
  const [isPending, startTransition] = useTransition(); // isPending from useTransition

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        greenCardDate: undefined, // Initialize date as undefined
    },
  });

  const selectedDate = form.watch('greenCardDate');

  // Sync displayDate with form value
  useEffect(() => {
    if (selectedDate && isValid(selectedDate)) {
      setDisplayDate(format(selectedDate, DATE_FORMAT));
    } else if (!selectedDate) {
        setDisplayDate(''); // Clear display if form value is cleared
    }
    // Don't update displayDate if parsing fails, keep user input
  }, [selectedDate]);


  function calculateEligibility(greenCardDate: Date): EligibilityResult {
    // Standard 5-year rule
    const fiveYearsLater = addYears(greenCardDate, 5);
    // USCIS allows filing 90 days early
    const eligibilityDate = subDays(fiveYearsLater, 90);
    const today = startOfDay(new Date()); // Normalize today's date to start of day
    const daysRemaining = differenceInDays(eligibilityDate, today);
    const canApplyNow = daysRemaining <= 0;

    return { eligibilityDate, daysRemaining, canApplyNow };
  }

  function onCalculate(data: z.infer<typeof FormSchema>) {
    if (data.greenCardDate && isValid(data.greenCardDate)) {
        setEligibilityResult(calculateEligibility(data.greenCardDate));
        // Clear reminder fields if they were previously shown
         form.setValue('name', '');
         form.setValue('email', '');
    } else {
        form.setError('greenCardDate', { type: 'manual', message: 'Please enter a valid date.' });
    }
  }

 async function handleSendReminder(data: z.infer<typeof FormSchema>) {
    if (!data.name || !data.email || !eligibilityResult) return;

    setIsSubmittingReminder(true);
    try {
        await sendEmailReminder({
            name: data.name,
            email: data.email,
            eligibilityDate: eligibilityResult.eligibilityDate,
        });
        toast({
            title: "Reminder Set!",
            description: `We'll send an email reminder to ${data.email} closer to your eligibility date.`,
        });
        // Reset reminder fields after successful submission
        form.reset({ greenCardDate: data.greenCardDate }); // Keep date
        setDisplayDate(data.greenCardDate ? format(data.greenCardDate, DATE_FORMAT) : ''); // Keep display date synced
        setEligibilityResult(null); // Optionally clear results or keep them
        // Offer Login/Signup
        setTimeout(() => setShowLoginPrompt(true), 500);

    } catch (error) {
        console.error("Failed to send reminder:", error);
        toast({
            title: "Error",
            description: "Could not set the reminder. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsSubmittingReminder(false);
    }
 }

 const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // Ensure date is valid before submitting
    if (!data.greenCardDate || !isValid(data.greenCardDate)) {
        form.setError('greenCardDate', { type: 'manual', message: 'Please enter a valid date.' });
        return;
    }
    if(data.name || data.email) {
        // Wrap the async reminder submission in startTransition if you want
        // to use the isPending state for the Set Reminder button (currently uses isSubmittingReminder)
        // startTransition(() => {
            handleSendReminder(data);
        // });
    } else {
        // onCalculate is synchronous, doesn't need transition
        onCalculate(data);
    }
 }

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, fieldOnChange: (date: Date | undefined) => void) => {
    const rawValue = e.target.value;
    const formattedValue = formatInputDate(rawValue);
    setDisplayDate(formattedValue);

    // Try parsing only when the format is potentially complete
    if (formattedValue.length >= 8) { // Basic check for MM/DD/YY or longer
        const parsedDate = parse(formattedValue, DATE_FORMAT, new Date());
        const today = startOfDay(new Date());
        const minDate = new Date('1900-01-01');

        if (isValid(parsedDate) && parsedDate <= today && parsedDate >= minDate) {
            fieldOnChange(parsedDate);
            form.clearErrors('greenCardDate'); // Clear error if valid date typed
        } else {
            // Don't immediately set error, wait for blur or submission
             fieldOnChange(undefined); // Set form value to undefined if parse fails
        }
    } else {
        fieldOnChange(undefined); // Set form value to undefined if input is incomplete
    }
  };

  const handleInputBlur = (fieldOnChange: (date: Date | undefined) => void) => {
      const parsedDate = parse(displayDate, DATE_FORMAT, new Date());
      const today = startOfDay(new Date());
      const minDate = new Date('1900-01-01');

      if (isValid(parsedDate) && parsedDate <= today && parsedDate >= minDate) {
          fieldOnChange(parsedDate);
          setDisplayDate(format(parsedDate, DATE_FORMAT)); // Ensure correct format on blur
          form.clearErrors('greenCardDate');
      } else {
           fieldOnChange(undefined);
          // Only set error if the input is not empty and invalid
          if(displayDate.trim() !== '') {
            form.setError('greenCardDate', { type: 'manual', message: 'Please enter a valid date (MM/DD/YYYY).' });
          } else {
             form.clearErrors('greenCardDate'); // Clear error if empty
          }
      }
  }

  const handleCalendarSelect = (date: Date | undefined, fieldOnChange: (date: Date | undefined) => void) => {
      if (date) {
          const today = startOfDay(new Date());
          const minDate = new Date('1900-01-01');
          if (date <= today && date >= minDate) {
              fieldOnChange(date);
              setDisplayDate(format(date, DATE_FORMAT));
              form.clearErrors('greenCardDate');
              setIsCalendarOpen(false); // Close calendar on selection
          } else {
              // Handle date out of range selection if necessary (though disabled prop should prevent this)
              toast({ title: "Invalid Date", description: "Please select a date between 01/01/1900 and today.", variant: "destructive"});
          }
      } else {
          fieldOnChange(undefined);
          setDisplayDate('');
          form.clearErrors('greenCardDate');
          setIsCalendarOpen(false); // Close calendar on selection
      }
  }


  return (
    <div className="container py-12 md:py-16 lg:py-20">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl text-center">Citizenship Eligibility Timer</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Estimate when you might be eligible to apply for U.S. naturalization (based on the standard 5-year rule for permanent residents). You can type the date (MM/DD/YYYY) or select from the calendar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="greenCardDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-2 font-semibold">Green Card Issue Date</FormLabel>
                    <div className="relative flex items-center">
                       <FormControl>
                         <Input
                           placeholder="MM/DD/YYYY"
                           value={displayDate}
                           onChange={(e) => handleInputChange(e, field.onChange)}
                           onBlur={() => handleInputBlur(field.onChange)}
                           maxLength={10} // Limit input length
                           className={cn("pr-10", form.formState.errors.greenCardDate && "border-destructive")} // Add padding for icon
                         />
                       </FormControl>
                       <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                         <PopoverTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 h-8 w-8 text-muted-foreground hover:text-foreground"
                                aria-label="Open calendar"
                            >
                               <CalendarIcon className="h-4 w-4" />
                            </Button>
                         </PopoverTrigger>
                         <PopoverContent className="w-auto p-0" align="start">
                           <Calendar
                             mode="single"
                             selected={field.value}
                             onSelect={(date) => handleCalendarSelect(date, field.onChange)}
                             disabled={(date) =>
                               date > new Date() || date < new Date('1900-01-01')
                             }
                             captionLayout="dropdown-buttons" // Enable dropdowns
                             fromYear={1920} // Set start year for dropdown
                             toYear={currentYear} // Set end year for dropdown
                             initialFocus
                             defaultMonth={field.value || new Date(currentYear - 30, 0)} // Start near a common age range
                           />
                         </PopoverContent>
                       </Popover>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

             {!eligibilityResult && (
                 <Button type="submit" className="w-full" disabled={!form.formState.isValid}>
                   {/* Removed isPending check as calculation is synchronous */}
                   Calculate Eligibility
                 </Button>
             )}

              {eligibilityResult && (
                <Card className="bg-accent mt-6">
                  <CardContent className="pt-6 space-y-4">
                    <h3 className="text-lg font-semibold text-center">Estimated Eligibility</h3>
                     <p className="text-center">Based on your Green Card issue date, you may be eligible to file Form N-400 around:</p>
                     <p className="text-center text-2xl font-bold text-primary">
                       {format(eligibilityResult.eligibilityDate, 'MMMM d, yyyy')}
                     </p>
                     {eligibilityResult.canApplyNow ? (
                         <p className="text-center text-green-600 font-medium">You might be eligible to apply now!</p>
                     ): (
                        <p className="text-center text-muted-foreground">
                            Approximately {Math.max(0, eligibilityResult.daysRemaining)} days remaining until you can file.
                        </p>
                     )}
                    <p className="text-xs text-muted-foreground text-center pt-2">
                      Disclaimer: This is an estimate based on the 5-year rule and 90-day early filing provision. Other factors may affect your eligibility. Consult official USCIS resources or an immigration professional.
                    </p>

                     <div className="border-t pt-4 space-y-4">
                         <p className="text-center font-medium">Get an email reminder?</p>
                         <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your Name" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                         <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="your.email@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                          <Button type="submit" className="w-full" disabled={isSubmittingReminder || !form.getValues().name || !form.getValues().email || !form.formState.isValid}>
                            {isSubmittingReminder ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Set Reminder
                          </Button>
                          <p className="text-xs text-muted-foreground text-center">We respect your privacy. Your email will only be used for this reminder.</p>
                     </div>
                     <Button variant="outline" onClick={() => {
                         setEligibilityResult(null);
                         form.reset({ greenCardDate: undefined, name: '', email: '' }); // Reset form fully
                         setDisplayDate(''); // Clear display date
                         }} className="w-full mt-4">
                         Calculate for a different date
                     </Button>

                  </CardContent>
                </Card>
              )}
            </form>
          </Form>
        </CardContent>
         {/* Removed CardFooter as it wasn't used */}
      </Card>
       {/* Login/Signup Dialog */}
      <LoginSignupDialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt} />
    </div>
  );
}
