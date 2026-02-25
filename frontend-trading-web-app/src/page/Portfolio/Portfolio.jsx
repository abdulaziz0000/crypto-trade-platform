import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const Portfolio = () => {
  return (
    <div className='p-5 lg:p:20' > 
    <h1 className='font-bold text-3xl pb-5' >Portfolio</h1>
        <Table>
        
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]" > Asset</TableHead>
                        <TableHead> Price</TableHead>
                        <TableHead> Unit</TableHead>
                        <TableHead> Change </TableHead>
                        <TableHead> change %</TableHead>
                        <TableHead className="text-right" > volume  </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[1,1,1,1,1,1,1,1,1,1].map((item,index) => <TableRow key={index} >
                        <TableCell className="font-medium flex items-center gap-2"  > 
                            <Avatar className="-z-50">
                                <AvatarImage src="https://cdn.pixabay.com/photo/2017/08/14/14/38/bitcoin-2640692_1280.png" />
        
                            
                            </Avatar>
                            <span>Bitcoin</span>
                        </TableCell>
                        <TableCell>BTC</TableCell>
                        <TableCell>78768675</TableCell>
                        <TableCell>312314175</TableCell>
                        <TableCell>42412442323</TableCell>
                        <TableCell className="text-right" > $250</TableCell>
                     
                    </TableRow>)}
                    <TableRow>
                        <TableCell className="font-medium flex items-center gap-2"  > 
                            <Avatar className="-z-50">
                                <AvatarImage src="https://cdn.pixabay.com/photo/2017/08/14/14/38/bitcoin-2640692_1280.png" />
        
                            
                            </Avatar>
                            <span>Bitcoin</span>
                        </TableCell>
                        <TableCell>BTC</TableCell>
                        <TableCell>78768675</TableCell>
                        <TableCell>312314175</TableCell>
                        <TableCell>42412442323</TableCell>
                        <TableCell className="text-right" > $250</TableCell>
                     
                    </TableRow>
                </TableBody>
              </Table>
      
    </div>
  )
}

export default Portfolio
