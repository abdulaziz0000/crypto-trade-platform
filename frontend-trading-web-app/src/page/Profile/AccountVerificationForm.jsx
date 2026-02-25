import React from "react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { Button } from "@/components/ui/button"

const AccountVerificationForm = () => {
    const [value,setValue] = useState("")

    const handleSubmit = ()=>{
        console.log(value)
    }
  return (
    <div className="flex justify-center">
      <div className="space-y-5 mt-10 w-full max-w-xl">

        {/* Email Row */}
        <div className="flex justify-between items-center">
          <p className="font-medium">Email :</p>
          <p className="text-gray-500">azizabdul04327@gmail.com</p>

          <Dialog>
            <DialogTrigger>
              <Button variant="outline"> Send Otp </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                    Enter Otp  
                </DialogTitle>
              </DialogHeader>
              <div className="py-5 flex gap-5 justify-center items-center" >
                <InputOTP 
                onChange={(value)=>setValue(value)}
                maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
<DialogClose>
    <Button
    onClick={handleSubmit} className='w-[10rem]' >
        Submit
    </Button>
</DialogClose>

              </div>
            </DialogContent>
          </Dialog>
        </div>

      </div>
    </div>
  )
}

export default AccountVerificationForm