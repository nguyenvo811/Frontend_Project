import { React, useState, useEffect, useMemo } from "react";
import MaterialReactTable from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import { decodeJwt, getOrders } from "../../../api/apiServices";
import { FormatDateTimeDislay } from "../../../assets/FormatDateTimeDisplay";
import FormatPrice from "../../components/FormatPrice/FormatPrice";

export default function OrderPage() {
  
  return (
    <div className="m-auto py-4 pt-10 relative">
      <div class="bg-white rounded-lg">
        <div class="w-full">
          <OrderTable />
        </div>
      </div>
    </div>
  )
}   

const OrderTable = function() {
	const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (decodeJwt ()) {
      getOrders()
      .then(res => {
        setTableData(res.data.data)
        console.log(res.data.data)
      })
      .catch(err => {
        console.log(err); 
      }) 
    }
   
  }, [])

  const columns = useMemo(() => [
    {
      accessorFn: (originalRow) => originalRow?.user.fullName,
			id: "fullName",
      header: 'Username',
      size: 140,
    },
    {
      accessorKey: "address",
      header: 'Address',
      size: 140,
    },
		{
      accessorFn: (originalRow) => <FormatPrice price={originalRow?.subTotal} />,
      header: 'Total',
      size: 140,
    },
		{
      accessorKey: "status",
      header: 'Status',
      size: 140,
    },
		{
      accessorFn: (originalRow) => <FormatDateTimeDislay date={originalRow?.createdAt} />,
			id: 'createdAt',
      header: 'Create At',
      size: 140,
    },
		{
      accessorFn: (originalRow) => <FormatDateTimeDislay date={originalRow?.updatedAt} />,
			id: 'updatedAt',
      header: 'Update At',
      size: 140,
    },
  ], []);
	
	return (
		<MaterialReactTable
			displayColumnDefOptions={{
				'mrt-row-actions': {
					muiTableHeadCellProps: {
						align: 'center',
					},
					size: 120,
				},
			}}
			columns={columns}
			data={tableData || []}
			enableEditing={false}
			enableColumnOrdering
		/>
  )
}