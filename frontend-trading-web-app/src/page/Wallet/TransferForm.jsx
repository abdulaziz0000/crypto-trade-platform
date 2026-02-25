import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import React from 'react'

const TransferForm = () => {
    const [formDate,setFormData] = React.useState({
        amount:'',
        walletId:'',
        purpose:'',
    })
    const handleChange = (e) =>{
        setFormData({...formDate,[e.target.name]: e.target.value})
    }

    const handleSubmit=() =>{
 
        console.log(formDate)
    }
  return (
    <div className='pt-10 space-y-5' >
        <div>
            <h1 className='pb-1' >Enter Amount</h1>
            <Input
            name="amount"
            onChange={handleChange}
            value={formDate.amount}
            className="py-7"
            placeholder="$8823"
            />

        </div>

         <div>
            <h1 className='pb-1' >Wallet id </h1>
            <Input
            name="walletId"
            onChange={handleChange}
            value={formDate.walletId}
            className="py-7"
            placeholder="#72882"
            />

        </div>
         <div>
            <h1 className='pb-1' >Purpose</h1>
            <Input
            name="purpose"
            onChange={handleChange}
            value={formDate.Purpose}
            className="py-7"
            placeholder="gift to friend"
            />

        </div>
        <DialogClose className='w-full' >
            <Button 
        onClick={handleSubmit}
        className='w-full py-7'>
            Submit
        </Button>



        </DialogClose>

        
      
    </div>
  )
}

export default TransferForm
