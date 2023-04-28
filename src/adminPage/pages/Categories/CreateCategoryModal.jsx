import { React, useEffect, useState, useRef} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Label, Textarea, TextInput } from "flowbite-react";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createNewCategory } from '../../../api/apiServices';
import { Box, Button } from '@mui/joy';

export default function CreateCategoryModal(props) {
  const { tableData, setTableData, open, onClose } = props;

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const formatDate = (date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
    const day = String(formattedDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    description: "", 
  })

  const [error, setError] = useState({
    categoryName: "",
    description: "", 
  });

  const validateAll = () => {
    let msg = {}
    if (newCategory.categoryName === "") {
      msg.categoryName = "Product name field is required!"
    } if (newCategory.description === "") {
      msg.description = "Description field is required!"
    } 
    
    setError(msg)
    console.log("validating")
    if (Object.keys(msg).length > 0) {
      return false
    } else {
      return true
    }
  };

  const handleChangeInput = (e) => {
    let {name, value} = e.target;
    setNewCategory({...newCategory, [name]: value})
    setError({...error, [name]: ""})
  }

  const handleClose = () => {
    clearState()
    onClose()
  }

  const clearState = () => {
    setError({
      categoryName: "",
      description: "", 
    })
    setNewCategory({
      categoryName: "",
      description: "", 
    })
    onClose()
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      categoryName: newCategory.categoryName,
      description: newCategory.description,
    }

    const isValid = validateAll()
    if (isValid){
      await createNewCategory(data)
        .then(res => {
          console.log(res.data.data)
          tableData.push(res.data.data);
          setTableData([...tableData])
          clearState()
        })
        .catch((err)=>{
          console.log(err)
        }) 
    }
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      scroll='paper'
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Create New Category
      {onClose ? (
          <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
      </DialogTitle>
      <DialogContent dividers={'paper'}>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
        <div class="relative overflow-y-auto p-4">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="categoryName">Category Name</Label>
                    <TextInput
                      autoFocus
                      id="categoryName"
                      name="categoryName"
                      type="text"
                      placeholder="Category Name"
                      className="mt-1"
                      value={newCategory.categoryName}
                      onChange={handleChangeInput}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.categoryName}
                    </p>
                  </div>
                  <div className="">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Description"
                      rows={6}
                      className="mt-1"
                      value={newCategory.description}
                      onChange={handleChangeInput}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.description}
                    </p>
                  </div>
                </div>
              </form>
            </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
          <Button variant="plain" color="neutral" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="solid" color="primary" onClick={handleSubmit}>
            Confirm
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
