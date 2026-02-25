import { Button } from '@/components/ui/button'
import AssertTable from './AssertTable'
import StockChart from './StockChart'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Dot, MessageCircleCheck } from 'lucide-react';
import { Input } from '@/components/ui/input'
import { getCoinList, getTop50Coins } from '@/State/Coin/Action'
import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'


const Home = () => {
    const [category,setCategory] = React.useState("all");
    const [inputValue,setInputValue] = React.useState("");
    const [isBotRelease,setBotRelase] = React.useState(false);
   const { coinList ,top50Coins} = useSelector((state) => state.coin);

     const dispatch= useDispatch()

    const handleBotRelease=()=>setBotRelase(!isBotRelease);
    console.log("coinList:", coinList);

    const handleCategory=(value) =>{
     
        setCategory(value);
    }
    const handleChange=(e) =>{
        setInputValue(e.target.value);

    }
    const handleKeyPress=(event)=>{
        if(event.key=="Enter"){
            console.log(inputValue)
        }
        setInputValue("")
    }
    useEffect(() =>{
      dispatch(getTop50Coins())

    },[category])
      useEffect(()=>{
            dispatch(getCoinList(1))
    
        },[])
  return (
    <div className='relative'>
        <div className='lg:flex'>
            <div className='lg:w-[50%] lg:border-r'>
                <div className='p-3 flex items-center gap-4'>
                    <Button  onClick={()=>handleCategory("all")} variant={category=="all"?"default":"outline"} className="rounded-full">
                        All
                    </Button>
                    <Button  onClick={()=>handleCategory("top50")} variant={category=="top50"?"default":"outline"} className="rounded-full">
                        Top 50
                    </Button>
                    <Button  onClick={()=>handleCategory("topGainers")} variant={category=="topGainers"?"default":"outline"} className="rounded-full">
                        Top gainers
                    </Button>
                      <Button  onClick={()=>handleCategory("topLosers")} variant={category=="topLosers"?"default":"outline"} className="rounded-full">
                        Top losers
                    </Button>

                </div>
<AssertTable
  coin={category === "all" ? coinList ?? [] : top50Coins ?? []}
  category={category}
/>

            </div>
            <div className='hidden lg:block lg:w-[50%] p-5'>
                <StockChart/>
                <div className='flex gap-5 items-center'>
                    <div>
                        <Avatar>
                            <AvatarImage src={"https://cdn.pixabay.com/photo/2017/08/14/14/38/bitcoin-2640692_1280.png"}/>
                        </Avatar>
                    </div>

                    <div className='flex items-center gap-2'>
                        <p>BIT</p>
                        <Dot className='text-gray-300'/>
                        <p className='text-gray-50' > Bitcoin</p>

                    </div>
                    <div className='flex items-end gap-2' >
                        <p className='text-xl font-bold'>
                            5465
                        </p>
                        <p className='text-red-500'>
                            <span>-12811882818 </span>
                            <span>(-92832)</span>
                        </p>

                    </div>

                </div>

            </div>


        </div>       
         <section className="absolute bottom-5 right-5 z-40 flex flex-col items-end gap-3">

  {/* Chat Window */}
  {isBotRelease && (
    <div className="rounded-xl w-[20rem] md:w-[25rem] h-[70vh] bg-gray-800 shadow-xl flex flex-col">

      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-600 px-6 h-[12%]">
        <p className="text-white font-semibold">Chat Bot</p>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBotRelease}
        >
          ✕
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 flex flex-col overflow-y-auto gap-4 px-5 py-4">

        {[1, 1, 1, 1, 1].map((item, i) => {
          const isBot = i % 2 === 0;

          return (
            <div
              key={i}
              className={`flex ${isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[70%] break-words text-sm
                  ${isBot
                    ? "bg-gray-300 text-black"
                    : "bg-blue-600 text-white"
                  }`}
              >
                {isBot
                  ? "Hi want to know the best coin to buy"
                  : "Hi"}
              </div>
            </div>
          );
        })}

      </div>

      {/* Input */}
      <div className="border-t border-gray-600 p-3">
        <Input
          placeholder="Write a message..."
          value={inputValue}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && inputValue.trim()) {
              console.log(inputValue);
              setInputValue("");
            }
          }}
          className="bg-gray-700 text-white border-none focus-visible:ring-0"
        />
      </div>

    </div>
  )}

  {/* Toggle Button */}
  <div className="relative w-[10rem] cursor-pointer group">
    <Button
      className="w-full h-[3rem] gap-2 items-center"
      onClick={handleBotRelease}
    >
      <MessageCircleCheck
        size={25}
        className="fill-[#f2ecec] -rotate-90 stroke-none group-hover:fill-[#ede1a5]"
      />
      <span>Chat Bot</span>
    </Button>
  </div>

</section>

       
    </div>
  )
}

export default Home
