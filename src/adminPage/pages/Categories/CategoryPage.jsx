import { React, useState, useEffect, useMemo } from "react";
import { Breadcrumb } from "flowbite-react";
import { HiHome, HiPencilAlt, HiTrash } from "react-icons/hi";
import MaterialReactTable from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import Button from '@mui/joy/Button';
import Add from '@mui/icons-material/Add';
import CreateCategoryModal from "./CreateCategoryModal";
import AlertDeleteModal from "./AlertDeleteModal";
import { getCategories, deleteCategory, getProductsByCategoryID } from "../../../api/apiServices";
import UpdateCategoryModal from "./UpdateCategoryModal";
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
							<Breadcrumb.Item>Categories</Breadcrumb.Item>
						</Breadcrumb>
						<h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
							All Categories
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
  const [category, setCategory] = useState("")
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // if (decodeJwt().id !== "") {
    //   setUser_id(decodeJwt().id)
    // }
    getCategories()
      .then(res => {
        setTableData(res.data.data)
        console.log(res.data.data)
      })
      .catch(err => {
        console.log(err); 
      }) 
  }, [tableData.length])

  const handleShowDeleteModal = async (row) => {
    setRow(row)
    setOpenDeleteModal(true)
    getProductsByCategoryID(row.original._id)
    .then(res => {
      console.log(res.data.data)
      setCategory(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const handleDelete = (row) => {
    if (category.length === 0) {
      deleteCategory(row.original._id)
      .then((response) => { 
        tableData.splice(row.index, 1);
        setTableData([...tableData]);
      })
      .catch((err)=>{
        console.log(err)
      })  
      setOpenDeleteModal(false)
    } else {
      setError(true)
    }
  }

  const columns = useMemo(() => [
    {
      accessorKey: 'categoryName',
      header: 'Category Name',
      size: 140,
    },
    {
      accessorKey: "description",
      header: 'Description',
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
              <IconButton color="error" onClick={() => {return handleShowDeleteModal(row)}}>
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
						New Category
					</Button>
        )}
      />
			<CreateCategoryModal
        tableData={tableData}
        setTableData={setTableData}
        open={openCreateModal} 
        onClose={() => setOpenCreateModal(false)}/>
      <UpdateCategoryModal 
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
        onClose={() => {return setOpenDeleteModal(false), setError(false)}}
        handleDelete={() => handleDelete(row)} 
        error={error}
        />
    </>
  )
}