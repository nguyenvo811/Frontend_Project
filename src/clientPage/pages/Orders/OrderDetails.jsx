import { React, useEffect, useState, useRef, useCallback} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Label, Select, Textarea, TextInput } from "flowbite-react";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button } from '@mui/joy';
import FormatPrice from '../../../clientPage/components/FormatPrice/FormatPrice';

export default function OrderDetails(props) {
  const { open, onClose, data, setData, row, tableData, setTableData } = props;

  const formatPrice = (price) => {
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(price);
  }

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

  const handleRemoveProduct = useCallback((id) => {
    // deleteProductFromCart(id)
    //   .then(res => {
    //     console.log(res)
    //     setProducts([...res.data.data], products)
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })
  }, [])
  
  const products = {
    wishListItem: [
       {
        _id: "1",
        image: "https://images.samsung.com/is/image/samsung/p6pim/vn/2202/gallery/vn-galaxy-s22-s901-sm-s901eidgxxv-530762309?$650_519_PNG$",
        productName: "Samsung S22",
        price: 675
      },
    ],
    subTotal: 675
  }

  const productsFav= products.wishListItem.map((val, index) => {
    return (
      <div key={index} class="pb-6 mb-2 rounded-md border px-6 border-gray-900">
        <div className="flex md:items-center md:justify-center text-sm font-medium mt-6 gap-4">
          <div className="h-[140px] w-[200px] max-sm:w-[300px]" >
            <img className="w-full h-full object-cover rounded-lg" src={val.image} />
          </div> 
          <div className="grid w-full md:grid-cols-2 gap-2 break-all justify-between md:items-center">
            <div>
              <h2 className="max-sm:hidden">Product Name</h2>
              <span className="text-gray-700 max-sm:font-bold max-sm:text-lg font-bold">{val.productName}</span>
            </div>
            <div>
              <h2 className="max-sm:hidden">Price</h2>
              <strong className="text-gray-700"><FormatPrice price={val.price}/></strong>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth={true}
      scroll='paper'
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">Order Details
      {onClose ? (
          <IconButton
              aria-label="close"
              onClick={onClose}
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
            {productsFav}
            <div class="grid justify-end items-center font-bold ">
            <span class="title-font font-bold text-2xl text-red-300">Total: <FormatPrice price={products.subTotal}/></span>
        </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
          <Button variant="plain" color="neutral" onClick={() => onClose()}>
            Cancel
          </Button>
          {/* <Button variant="solid" color="primary" onClick={() => onClose()}>
            Confrim
          </Button> */}
        </Box>
      </DialogActions>
    </Dialog>
  );
}
