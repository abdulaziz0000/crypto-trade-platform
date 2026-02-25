import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const Withdrawal = () => {
  return (
    <div className='p-5 lg:p-20'>
      <h1 className='font-bold text-3xl pb-8'>Withdrawal</h1>

      <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="py-5">Date</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {[1, 1, 1, 1, 1, 1].map((item, index) => (
              <TableRow
                key={index}
                className="hover:bg-gray-50 transition"
              >
                {/* Date */}
                <TableCell>
                  <p className="font-medium">2025/06/23</p>
                  <p className="text-gray-400 text-sm">12:35 PM</p>
                </TableCell>

                {/* Method */}
                <TableCell className="font-medium">
                  Bank Transfer
                </TableCell>

                {/* Amount */}
                <TableCell className="font-semibold text-gray-700">
                  $658
                </TableCell>

                {/* Status */}
                <TableCell>
                  <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-600 font-medium">
                    Completed
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Withdrawal