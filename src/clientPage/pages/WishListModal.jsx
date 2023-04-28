import { React, useEffect, useState, useRef, useCallback} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getFavProduct } from '../../api/apiServices';
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

	// const [products, setProduct] = useState([])

	useEffect(() => {
		// getFavProduct()
		// .then(res => {
		// 	setProduct(res.data.data)
		// })
		// .catch(err => {
		// 	console.log(err)
		// })
	}, [])

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
        price: 2300
      },
      {
        _id: "2",
        image: "https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg",
        productName: "iPhone 14",
        price: 2500
      },
    ]
  }
  console.log(products)

	const productsFav= products.wishListItem.map((val, index) => {
    return (
      <div key={index} class="pb-6 mb-2 rounded-md border px-6 border-gray-900">
        <div className="flex md:items-center md:justify-center text-sm font-medium mt-6 gap-4">
          <div className="h-[160px] w-[300px] max-sm:w-[300px]" >
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
          <IconButton
                aria-label="close"
                onClick={() => handleRemoveProduct(val._id)}
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
