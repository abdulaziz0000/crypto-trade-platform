import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CopyCheckIcon, DollarSign, Loader, LoaderCircle, LoaderIcon, LoaderPinwheel, ShuffleIcon, UploadIcon, Wallet2Icon } from 'lucide-react'
import React from 'react'
import TopUPForm from './TopUPForm'
import TransferForm from './TransferForm'
import WithdrawalForm from './WithdrawalForm'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const Wallet = () => {
  return (
    <div className='flex flex-col  items-center'>
        <div className='pt-10 w-full lg:w-[60%]'>
            <Card>
                <CardHeader classNam='pb-9' >
                    <div className='flex justify-between items-center' >
                        <div className='flex items-center gap-5'>
                            <Wallet2Icon size={30} />
                            <div>
                                <CardTitle classNam="text-2xl" >  My Wallet</CardTitle>
                               <div className='flex items-center gap-2' >
                                <p className='text-gray-700'>
                                    #A475Ed
                                </p>
                                <CopyCheckIcon size={15} className='cursor-pointer hover:text-slate-500' />

                               </div>
                            </div>

                        </div>

                        <div>
                            <LoaderCircle className='w-6 h-6 cursor-pointer hover:text-gray-400' />
                        </div>

                    </div>

                </CardHeader>
                <CardContent>
                    <div className='flex items-center '>
                        <DollarSign/>
                        <span className='text-2xl font-semibold' >2000</span>

                    </div>
                    <div className='flex gap-7'>
                        <Dialog>
                            <DialogTrigger>
                                <div className='h-24 w-24 hover:text-gray-500 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-500 shadow-md'>
                                    <UploadIcon/>
                                    <span className='text-sm mt-2'>Add Money </span>

                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Top up your wallet 
                                    </DialogTitle>
                                </DialogHeader>
                                <TopUPForm/>
                            </DialogContent>
                        </Dialog>
                        

                        <Dialog>
                            <DialogTrigger>
                                <div className='h-24 w-24 hover:text-gray-500 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-500 shadow-md'>
                                    <UploadIcon/>
                                    <span className='text-sm mt-2'>Withdrawal Money </span>

                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Request withdrawal
                                    </DialogTitle>
                                </DialogHeader>
                                <WithdrawalForm/>
                            </DialogContent>
                        </Dialog>

                        <Dialog>
                            <DialogTrigger>
                                <div className='h-24 w-24 hover:text-gray-500 cursor-pointer flex flex-col items-center justify-center rounded-md shadow-slate-500 shadow-md'>
                                    <ShuffleIcon/>
                                    <span className='text-sm mt-2'>Transfer to Wallets </span>

                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className='text-center text-xl' >
                                        Transfer funds to other wallets
                                    </DialogTitle>
                                </DialogHeader>
                                <TransferForm/>
                            </DialogContent>
                        </Dialog>
        
                    </div>
                </CardContent>
            </Card>
            <div className='py-5 pt-10' >
                <div className='flex gap-2 items-center pb-5' >
                    <h1 className='text-2xl font-semibold' >History</h1>
                    <LoaderCircle className='h-7 w-7 p-0 cursor:pointer hover:text-gray-400' />

                </div>

                <div className='space-y-5'>
                    {[1,1,1,1,1,1].map((item,i) => <div key={i}>
                       <Card className='lg:w-[90%] px-5 py-2 flex justify-between items-center'>
                            <div className='flex items-center gap-5'>
                                <Avatar>
                                    <AvatarFallback>
                                        <ShuffleIcon/>
                                    </AvatarFallback>
                                </Avatar>

                                <div className='space-y-1'>
                                    <h1>Buy Asset </h1>
                                    <p className='text-sm text-gray-300'> 2025/06/23</p>


                                </div>

                            </div>
                            <div>
                                <p className={`text-green-400`} >999 USD</p>
                        
                            </div>

                    

                        </Card>
                    </div>)}

                </div>

            </div>

        </div>

      
    </div>
  )
}

export default Wallet
