import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AssertTable = ({ coin = [], category }) => {

  const navigate = useNavigate()

  return (
    <Table>
      <TableBody>
        {coin.map((item) => (
          <TableRow key={item.id}>
            <TableCell
              onClick={()=>navigate(`/market/${item.id}`)}
              className="font-medium flex items-center gap-2"
            >
              <Avatar>
                <AvatarImage src={item.image} />
              </Avatar>
              <span>{item.name}</span>
            </TableCell>

            <TableCell>{item.symbol}</TableCell>
            <TableCell>{item.totalVolume}</TableCell>
            <TableCell>{item.marketCap}</TableCell>
            <TableCell>{item.priceChangePercentage24h}</TableCell>
            <TableCell className="text-right">
             ${item.currentPrice ?? 0}
            </TableCell>

          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default AssertTable
