import { React, useEffect, useState, useRef} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Label, Textarea, TextInput } from "flowbite-react";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImage } from '../../../assets/Library/uploadFile';
import { getCategories, searchProduct, updateProduct } from '../../../api/apiServices';
import Select from 'react-select';
import { Box, Button } from '@mui/joy';

export default function UpdateProductModal(props) {
  const { open, onClose, data, setData, row, tableData, setTableData } = props;
  const [listUrl, setListUrl] = useState([]);
  const [file, setFile] = useState(null);
  const [select, setSelect] = useState([]);
  const [selectCat, setSelectCat] = useState("");

  useEffect( () => {
    getCategories()
        .then(res => {
            setSelect(res.data.data)
        })
        .catch(err => {
            if (err.response) {
                console.log(err.response.data.result);
                console.log(err.response.status);
                console.log(err.response.data.message);
            }
        })  
  }, []);

  const handleSelect = (e) => {
    setSelectCat(e.value)
    setError({category: ""})
  }

  const selectCategory = Object.values(select)?.map(val => {return {value: val._id, label: val.categoryName}})
  const defaultCategoryName = selectCategory.find((e)=> {return e.value === data?.category?._id});

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const [error, setError] = useState({
    productName: "",
    description: "", 
    price: "",
    quantity: "",
    category: "",
    onSale: ""
  });

  const validateAll = () => {
    let msg = {}
    if (data.productName === "") {
      msg.productName = "Product name field is required!"
    } if (data.description === "") {
      msg.description = "Description field is required!"
    } if (data.price === "") {
      msg.price = "Price field is required!"
    } else if (data.price < 1) {
      msg.price = "Price must be greater than 1$!"
    } if (data.quantity === "") {
      msg.quantity = "Quantity field is required!"
    } else if (data.quantity < 1) {
      msg.quantity = "Quantity must be greater than 0!"
    } if (selectCat === "") {
      msg.category = "Category field is required!"
    } if (data.onSale === "") {
      msg.onSale = "On sale field is required!"
    } else if (data.onSale > 99) {
      msg.onSale = "Can't sale product over 100%!"
    } else if (data.onSale < 0) {
      msg.onSale = "Can't sale product smaller than 0%!"
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
    setData({...data, [name]: value})
    setError({...error, [name]: ""})
  }

  const handleClose = () => {
    clearState()
    onClose()
  }

  const clearState = () => {
    setError({
      productName: "",
      description: "", 
      price: "",
      quantity: "",
      category: "",
      onSale: ""
    })
    setData(data)
    onClose()
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
			_id: data._id,
      productName: data.productName,
      description: data.description,
      price: data.price,
      category: selectCat,
      quantity: data.quantity,
      onSale: data.onSale,
      image: []
    }

    if (file && file.length > 0) {
      for (let index = 0; index < file.length; index++) {
        const element = file[index];
        const upfile = await uploadImage(element);
        updateData.image.push(upfile.data);
        console.log(updateData)
        setListUrl(val=>[...val, upfile.data])  
      }
    }

    const isValid = validateAll()
    if (isValid){
      if (updateData.image.length > 0) {
        tableData[row.index] = updateData
        await updateProduct(data._id, updateData)
          .then(() => {
            searchProduct(data._id)
            .then(res => {
              tableData[row.index] = res.data.data.findProduct;
              setTableData([...tableData])
              clearState()
            })
          })
          .catch((err)=>{
            console.log(err)
          }) 
      } else {
        await updateProduct(data._id, updateData)
          .then(() => {
            searchProduct(data._id)
            .then(res => {
              tableData[row.index] = res.data.data.findProduct;
              setTableData([...tableData])
              clearState()
            })
          })
          .catch((err)=>{
            console.log(err)
          }) 
      }
      
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
      <DialogTitle id="scroll-dialog-title">Update Product
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
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div>
                    <Label htmlFor="productName">Product Name</Label>
                    <TextInput
                      autoFocus
                      id="productName"
                      name="productName"
                      type="text"
                      placeholder="Product Name"
                      className="mt-1"
                      value={data.productName}
                      onChange={handleChangeInput}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.productName}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <TextInput
                      id="price"
                      name="price"
                      type="number"
                      placeholder="Price"
                      className="mt-1"
                      value={data.price}
                      onChange={handleChangeInput}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.price}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="onSale">On Sale</Label>
                    <TextInput
                      id="onSale"
                      name="onSale"
                      type="number"
                      placeholder="Type sale percentage"
                      className="mt-1"
                      value={data.onSale}
                      onChange={handleChangeInput}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.onSale}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select
                      id="category"
                      options={selectCategory}
                      name="category"
                      value={selectCategory.value}
                      defaultValue={defaultCategoryName}
                      className="mt-1"
                      onChange={(e) => handleSelect(e)}
                      >
                    </Select>
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.category}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="image">image</Label>
                    <TextInput
                      id="image"
                      name="image"
                      type="file"
                      className="mt-1"
                      multiple
                      onChange={(e) => setFile(e.target.files)}
                    />
                    {/* <p class="mt-1 text-sm text-red-500"> 
                      {error.image}
                    </p> */}
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <TextInput
                      id="quantity"
                      name="quantity"
                      type="number"
                      className="mt-1"
                      placeholder="Type product sale percentage"
                      value={data.quantity}
                      onChange={handleChangeInput}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.quantity}
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Description"
                      rows={6}
                      className="mt-1"
                      value={data.description}
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
