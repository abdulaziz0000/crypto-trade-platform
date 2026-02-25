import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VerifiedIcon } from 'lucide-react'
import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import AccountVerificationForm from './AccountVerificationForm'
import { useSelector } from "react-redux";

const Profile = () => {
      const auth = useSelector((state) => state.auth);
    const handleEnableTwoStepVerification=() =>{
        console.log("two step verification")
    }
  return (
    <div className='flex flex-col items-center mb-5' >
        <div className='pt-10 w-full lg:w-[60%]' >
            <Card>
                <CardHeader className='pb-9' >
                    <CardTitle>Your information</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='lg:flex gap-32' >
                        <div className='space-y-7' >
                            <div className='flex'>
                                <p className='w-[9rem]'>Email : </p>
                                <p className='w-[9rem]'> {auth.user?.email} </p>

                            </div>

                                <div className='flex'>
                                <p className='w-[9rem]'>full name : </p>
                                <p className='w-[9rem]'> {auth.user?.fullName}</p>

                            </div>

                                <div className='flex'>
                                <p className='w-[9rem]'>DOB : </p>
                                <p className='w-[9rem]'>25-98-8889</p>

                            </div>

                                <div className='flex'>
                                <p className='w-[9rem]'>Email : </p>
                                <p className='w-[9rem]'> azizabdul04327@gmail.com</p>

                            </div>

                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className='mt-6'>
                <Card>
                    <CardHeader className='flex items-center gap-3' >
                        <CardTitle>
                            2 Step verification
                        </CardTitle>
                        {true?<Badge className=" space-x-5 text-white bg-green-300"> 
                        <VerifiedIcon/>
                        <span>Enabled</span>
                        </Badge>:<Badge className="bg-red-600"> Disabled</Badge>}
                        

                    </CardHeader>
                    <CardContent>
                        <div>
                            <Dialog>
  <DialogTrigger>
    <Button>Enable Two step verification</Button>

  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Verify your account</DialogTitle>
    </DialogHeader>
    <AccountVerificationForm handleSubmit={handleEnableTwoStepVerification} />
  </DialogContent>
</Dialog>
                        </div>
                    </CardContent>
                </Card>

            </div>

        </div>
      
    </div>
  )
}

export default Profile
