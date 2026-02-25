import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import React from 'react'
import PaymentDetailsForm from './PaymentDetailsForm'

const PaymentDetails = () => {
  return (
    <div className='px-20 ' >
        <h1  className='text-3xl font-bold py-10' >Payment Details</h1>
       {true? <Card>
            <CardHeader>
                <CardTitle>
                    Yes Bank 
                </CardTitle>
                <CardDescription>
                    A/C No:
                    **********1234

                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex items-center'>
                    <p className='w-32' >Account Holde Namer</p>
                    <p className='text-gray-500' >Abdul aziz </p>

                </div>
                 <div className='flex items-center'>
                    <p className='w-32'> IFSC</p>
                  
                    <p className='text-gray-300' >yes939u2</p>

                </div>
            </CardContent>
        </Card>:    <Dialog>
  <DialogTrigger>
    <Button className='py-6' >Add payment details</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>payment details</DialogTitle>
    </DialogHeader>
    <PaymentDetailsForm/>
  </DialogContent>
</Dialog>}
      
  

      
    </div>
  )
}

export default PaymentDetails
