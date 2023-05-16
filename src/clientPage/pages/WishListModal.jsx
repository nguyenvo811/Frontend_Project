import { React, useEffect, useState, useRef, useCallback} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { deleteProductFromWishList, viewWishList } from '../../api/apiServices';
import { Box, Button } from '@mui/joy';
import FormatPrice from '../components/FormatPrice/FormatPrice';

export default function WishListModal(props) {
  const { open, onClose } = props;

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

	const [products, setProducts] = useState([])

	useEffect(() => {
		viewWishList()
		.then(res => {
			setProducts(res.data.data)
		})
		.catch(err => {
			console.log(err)
		})
	}, [])

	const handleRemoveProduct = (id) => {
    console.log(id)
    deleteProductFromWishList(id)
      .then(res => {
        console.log(res)
        setProducts(oldProducts => ({...oldProducts, wishListItem: oldProducts.wishListItem.filter(p => p.product._id != id)}));
      })
      .catch(error => {
        console.log(error)
      })
  } 

	const productsFav= products?.wishListItem?.map((val, index) => {
    return (
      <div key={index} class="pb-6 mb-2 rounded-md border px-6 border-gray-900">
        <div className="flex md:items-center md:justify-center text-sm font-medium mt-6 gap-4">
          <div className="h-[160px] w-[300px] max-sm:w-[300px]" >
            <img className="w-full h-full object-cover rounded-lg" src={val.product.image} />
          </div> 
          <div className="grid w-full md:grid-cols-2 gap-2 break-all justify-between md:items-center">
            <div>
              <h2 className="max-sm:hidden">Product Name</h2>
              <span className="text-gray-700 max-sm:font-bold max-sm:text-lg font-bold">{val.product.productName}</span>
            </div>
            <div>
              <h2 className="max-sm:hidden">Price</h2>
              <strong className="text-gray-700"><FormatPrice price={val.product.price}/></strong>
            </div>
          </div>
          <IconButton
                aria-label="close"
                onClick={() => handleRemoveProduct(val.product._id)}
                sx={{
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon fontSize="small"/>
            </IconButton>
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
      <DialogTitle id="scroll-dialog-title">Favorite list
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
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
}
