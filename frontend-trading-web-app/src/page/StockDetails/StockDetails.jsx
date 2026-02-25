import React, { useEffect } from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { BookmarkCheck, DotIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import TreadingForm from './TreadingForm'
import StockChart from '../Home/StockChart'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchCoinDetails } from '@/State/Coin/Action'

const StockDetails = () => {
  const { coinDetails } = useSelector(state => state.coin);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      console.log("Fetching coin details for:", id);
      dispatch(fetchCoinDetails(id));
    }
  }, [id, dispatch]);

  if (!coinDetails) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className='pt-5 mt-5'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-5 items-center'>
          <Avatar>
            <AvatarImage src={coinDetails?.image?.large} />
          </Avatar>

          <div>
            <div className='flex items-center gap-2'>
              <p>{coinDetails?.symbol?.toUpperCase() ?? 'N/A'}</p>
              <DotIcon className='text-gray-400' />
              <p className='text-gray-400'>{coinDetails?.id ?? 'N/A'}</p>
            </div>

            <div className='flex items-end gap-2'>
              <p>${coinDetails?.market_data?.current_price?.usd ?? 'N/A'}</p>
              <span>{coinDetails?.market_data?.price_change_24h?.toFixed(2) ?? '0'}</span>
              <span>({coinDetails?.market_data?.price_change_percentage_24h?.toFixed(2) ?? '0'}%)</span>
              <p>Market Cap: ${coinDetails?.market_data?.market_cap?.usd ?? 'N/A'}</p>
              <p>Total Volume: ${coinDetails?.market_data?.total_volume?.usd ?? 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-4'>
          <Button variant="ghost" size="icon">
            <BookmarkCheck className='h-6 w-6 text-black-500' />
          </Button>

          <Dialog>
            <DialogTrigger>
              <Button size="lg">Trade</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Trade {coinDetails?.name ?? ''}</DialogTitle>
              </DialogHeader>
              <TreadingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className='mt-5'>
        <StockChart coinId={id} />
      </div>
    </div>
  );
}

export default StockDetails;