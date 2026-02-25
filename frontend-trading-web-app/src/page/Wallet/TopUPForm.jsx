import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import React from 'react'

const TopUPForm = () => {

  const [amount, setAmount] = React.useState('')
  const [paymentMethod, setPaymentMethod] = React.useState('RAZORPAY')

  const handleChange = (e) => {
    setAmount(e.target.value)
  }

  const handleSubmit=()=>{
    console.log(amount,paymentMethod)
  }
  return (
    <div className='pt-10 space-y-5'>

      {/* Amount */}
      <div>
        <h1 className='pb-1'>Enter Amount</h1>
        <Input
          onChange={handleChange}
          value={amount}
          type="number"
          className='py-7 text-lg'
          placeholder="1000$"
        />
      </div>

      {/* Payment Method */}
      <div>
        <h1 className='pb-1'>Select Payment Method</h1>

        <RadioGroup
          value={paymentMethod}
          onValueChange={(value) => setPaymentMethod(value)}
          className='flex gap-4'
        >

          {/* Razorpay */}
          <div className='flex items-center space-x-3 border p-3 px-5 rounded-md cursor-pointer'>
            <RadioGroupItem
              className='h-5 w-5'
              value="RAZORPAY"
              id="razorpay"
            />
            <Label htmlFor="razorpay">
              <div className='bg-white rounded-md px-5 py-2 w-32'>
                <img
                  src="https://coralogix.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2025/01/1.jpg.webp"
                  alt="Razorpay"
                />
              </div>
            </Label>
          </div>

          {/* Stripe */}
          <div className='flex items-center space-x-3 border p-3 px-5 rounded-md cursor-pointer'>
            <RadioGroupItem
              className='h-5 w-5'
              value="STRIPE"
              id="stripe"
            />
            <Label htmlFor="stripe">
              <div className='bg-white rounded-md px-5 py-2 w-32'>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1280px-Stripe_Logo%2C_revised_2016.svg.png"
                  alt="Stripe"
                />
              </div>
            </Label>
          </div>

        </RadioGroup>
      </div>

      <Button   onClick={handleSubmit} className="w-full py-7">
        Submit
      </Button>

    </div>
  )
}

export default TopUPForm