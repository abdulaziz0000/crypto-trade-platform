import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { DotIcon } from 'lucide-react'

const TreadingForm = () => {

  const [orderType, setOrderType] = useState("buy")
  const [amount, setAmount] = useState("")

  return (
    <div className='space-y-8 p-5'>

      {/* Buy / Sell Toggle */}
      <div className='flex rounded-md overflow-hidden border'>
        <Button
          variant="ghost"
          onClick={() => setOrderType("buy")}
          className={`flex-1 rounded-none ${
            orderType === "buy"
              ? "bg-green-500 text-white hover:bg-green-500"
              : ""
          }`}
        >
          Buy
        </Button>

        <Button
          variant="ghost"
          onClick={() => setOrderType("sell")}
          className={`flex-1 rounded-none ${
            orderType === "sell"
              ? "bg-red-500 text-white hover:bg-red-500"
              : ""
          }`}
        >
          Sell
        </Button>
      </div>

      {/* Amount Input */}
      <Input
        placeholder="Enter Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="py-6"
      />

      {/* Coin Info */}
      <div className='flex gap-5 items-center'>
        <Avatar>
          <AvatarImage src="https://cdn.pixabay.com/photo/2017/08/14/14/38/bitcoin-2640692_1280.png" />
        </Avatar>

        <div>
          <div className='flex items-center gap-2'>
            <p>BTC</p>
            <DotIcon className='text-gray-400' />
            <p className='text-gray-400'>Bitcoin</p>
          </div>

          <div className='flex items-end gap-2'>
            <p className='text-xl font-bold'>$6655</p>
            <span className='text-red-500'>-1388.32</span>
            <span className='text-red-500'>(-0.24%)</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        className={`w-full ${
          orderType === "buy"
            ? "bg-green-500 hover:bg-green-600"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {orderType === "buy" ? "Buy BTC" : "Sell BTC"}
      </Button>

    </div>
  )
}

export default TreadingForm