import { React, useState, useEffect, useMemo } from "react";
import MaterialReactTable from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import { decodeJwt, getOrders } from "../../../api/apiServices";
import { FormatDateTimeDislay } from "../../../assets/FormatDateTimeDisplay";
import FormatPrice from "../../components/FormatPrice/FormatPrice";
import VisibilityIcon from '@mui/icons-material/Visibility';
import OrderDetails from "./OrderDetails";

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
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
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
      header: 'Buy At',
      size: 140,
    },
		// {
    //   accessorFn: (originalRow) => <FormatDateTimeDislay date={originalRow?.updatedAt} />,
		// 	id: 'updatedAt',
    //   header: 'Update At',
    //   size: 140,
    // },
  ], []);
	
	return (
    <>
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
			enableEditing
			enableColumnOrdering
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '1rem', WebkitJustifyContent: "center" }}>
          <Tooltip arrow placement="left" title="Edit">
            <IconButton onClick={() => setOpenDetailsModal(true)}> 
              <button
                type="button"
                class="text-blue-700"
                >
                <VisibilityIcon />
              </button>
            </IconButton>
          </Tooltip>
          {/* <Tooltip arrow placement="right" title="Delete">
            <IconButton color="error" onClick={() => {return handleShowDeleteModal(row)}}>
              <button
                type="button"
                class="text-red-700"
                >
                <HiTrash size='1.5rem' />
              </button>
            </IconButton>
          </Tooltip> */}
        </Box>
      )}
		/>
    <OrderDetails open={openDetailsModal} onClose={() => setOpenDetailsModal(false)} />
    </>
  )
}