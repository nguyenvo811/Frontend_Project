import { React, useState, useEffect, useMemo } from "react";
import { Breadcrumb } from "flowbite-react";
import { HiHome, HiPencilAlt, HiTrash } from "react-icons/hi";
import MaterialReactTable from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import CreateProductModal from "./CreateProductModal";
import AlertDeleteModal from "./AlertDeleteModal";
import { getProducts, deleteProduct } from "../../../api/apiServices";
import UpdateProductModal from "./UpdateProductModal";
import { FormatDateTimeDislay } from "../../../assets/FormatDateTimeDisplay";

export default function ProductPage(){
	return (
		<>
			<div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
				<div className="mb-1 w-full">
					<div className="mb-4">
						<Breadcrumb className="mb-4">
							<Breadcrumb.Item href="#">
								<div className="flex items-center gap-x-3">
									<HiHome className="text-xl" />
									<span className="dark:text-white">Home</span>
								</div>
							</Breadcrumb.Item>
							<Breadcrumb.Item>Products</Breadcrumb.Item>
						</Breadcrumb>
						<h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
							All Products
						</h1>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="overflow-x-auto">
					<div className="inline-block min-w-full align-middle">
						<div className="overflow-hidden shadow">
							<ProductTable />
						</div>
					</div>
				</div>
			</div> 
		</>
	)
}

const ProductTable = function() {

  const [tableData, setTableData] = useState("");
  const [user_id, setUser_id] = useState("");

  const [row, setRow] = useState("");
  const [currentRow, setCurrentRow] = useState("");

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [showErr, setShowErr] = useState(false)
  const [error, setError] = useState("");

  useEffect(() => {
    // if (decodeJwt().id !== "") {
    //   setUser_id(decodeJwt().id)
    // }
    getProducts()
      .then(res => {
        setTableData(res.data.data)
        console.log(res.data.data)
      })
      .catch(err => {
        console.log(err); 
      }) 
  }, [tableData.length])

  const handleDelete = (row) => {
    deleteProduct(row.original._id)
    .then((response) => { 
      tableData.splice(row.index, 1);
      setTableData([...tableData]);
    })
    .catch((err)=>{
      console.log(err)
    })  
    setOpenDeleteModal(false)
  }

  const columns = useMemo(() => [
    {
      accessorFn: (originalRow) => <img src={originalRow?.image[0]} className="w-20 h-20 object-cover object-center"/>,
			id: 'image',
      header: 'Image',
      enableColumnOrdering: false,
      enableEditing: false, //disable editing on this column
      enableSorting: false,
      size: 80,
    },
    {
      accessorKey: 'productName',
      header: 'Product Name',
      size: 140,
    },
    {
      accessorKey: "onSale",
      header: 'On Sale',
      size: 140,
    },
    {
      accessorKey: "quantity",
      header: 'Quantity',
      size: 140,
    },
    {
      accessorFn: (originalRow) => originalRow.category?.categoryName,
      id: 'category',
      header: 'Category Name',
    },
    {
      accessorKey: "price",
      header: 'Price',
      size: 80,
    },
    {
      accessorFn: (originalRow) => <FormatDateTimeDislay date={originalRow?.createdAt} />,
			id: 'createdAt',
      header: 'Create At',
      size: 140,
    },
		{
      accessorFn: (originalRow) => <FormatDateTimeDislay date={originalRow?.createdAt} />,
			id: 'updatedAt',
      header: 'Update At',
      size: 140,
    },
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
          <Box sx={{ display: 'flex', gap: '1rem' }}>
            <Tooltip arrow placement="left" title="Edit">
              <IconButton onClick={() => {return setOpenUpdateModal(true), setCurrentRow(row), setRow(row.original)}}> 
                <button
                  type="button"
                  class="text-blue-700"
                  >
                  <HiPencilAlt size='1.5rem'/>
                </button>
              </IconButton>
            </Tooltip>
            <Tooltip arrow placement="right" title="Delete">
              <IconButton color="error" onClick={() => {return setOpenDeleteModal(true), setRow(row)}}>
                <button
                  type="button"
                  class="text-red-700"
                  >
                  <HiTrash size='1.5rem' />
                </button>
              </IconButton>
            </Tooltip>
          </Box>
        )}
        renderTopToolbarCustomActions={() => (
					<Button
						variant="outlined"
						color="neutral"
						startDecorator={<Add />}
						onClick={() => setOpenCreateModal(true)}
					>
						New Product
					</Button>
        )}
      />
			<CreateProductModal 
        tableData={tableData}
        setTableData={setTableData}
        open={openCreateModal} 
        onClose={() => setOpenCreateModal(false)}/>
      <UpdateProductModal 
        open={openUpdateModal} 
        onClose={() => setOpenUpdateModal(false)} 
        data={row} 
        setData={setRow}
        row={currentRow}
        tableData={tableData}
        setTableData={setTableData}
      />
			<AlertDeleteModal 
        open={openDeleteModal} 
        onClose={() => setOpenDeleteModal(false)}
        handleDelete={() => handleDelete(row)} 
        />
    </>
  )
}