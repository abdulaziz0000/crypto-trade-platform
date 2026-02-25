import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

/* ---------------- VALIDATION SCHEMA ---------------- */

const formSchema = z.object({
  accountHolderName: z.string().min(3, "Name is required"),
  accountNumber: z.string().min(6, "Account number is required"),
  confirmAccountNumber: z.string(),
  IFSC: z.string().min(5, "IFSC is required"),
  bankName: z.string().min(2, "Bank name is required")
}).refine(
  (data) => data.accountNumber === data.confirmAccountNumber,
  {
    message: "Account numbers do not match",
    path: ["confirmAccountNumber"],
  }
)

/* ---------------- COMPONENT ---------------- */

const PaymentDetailsForm = () => {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountHolderName: "",
      accountNumber: "",
      confirmAccountNumber: "",
      IFSC: "",
      bankName: ""
    }
  })

  const onSubmit = (data) => {
    console.log("Form Submitted:", data)
  }

  return (
    <div className='px-10 py-5'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >

          {/* Account Holder Name */}
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Holder Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Account Number */}
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Number</FormLabel>
                <FormControl>
                  <Input placeholder="1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Account Number */}
          <FormField
            control={form.control}
            name="confirmAccountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Account Number</FormLabel>
                <FormControl>
                  <Input placeholder="Re-enter account number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* IFSC */}
          <FormField
            control={form.control}
            name="IFSC"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC Code</FormLabel>
                <FormControl>
                  <Input placeholder="SBIN0001234" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Bank Name */}
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input placeholder="State Bank of India" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Save Details
          </Button>

        </form>
      </Form>
    </div>
  )
}

export default PaymentDetailsForm