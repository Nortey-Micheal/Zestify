"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export function InputOTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success(
      `You submitted the following values: ${data.pin}`
    )
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[95vw] space-y-6 bg-(--white) md:h-[300px] md:w-[500px] flex flex-col justify-cente p-10 items-center rounded-2xl gap-10 ">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormLabel className="text-3xl mb-3 font-[young-serif] " >Verify Email Address  </FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot className="border-(--dark-raspberry) text-lg " index={0} />
                    <InputOTPSlot className="border-(--dark-raspberry) text-lg " index={1} />
                    <InputOTPSeparator className="text-(--dark-raspberry) "/>
                    <InputOTPSlot className="border-(--dark-raspberry) text-lg " index={2} />
                    <InputOTPSlot className="border-(--dark-raspberry) text-lg " index={3} />
                    <InputOTPSeparator className="text-(--dark-raspberry) "/>
                    <InputOTPSlot className="border-(--dark-raspberry) text-lg " index={4} />
                    <InputOTPSlot className="border-(--dark-raspberry) text-lg " index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full bg-(--zesty-orange) text-lg font-bold font-[Outfit] hover:bg-(--rich-brown) " type="submit">Verify</Button>
      </form>
    </Form>
  )
}
