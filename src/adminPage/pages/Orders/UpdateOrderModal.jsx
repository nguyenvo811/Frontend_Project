import { React, useEffect, useState, useRef} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Label, Select, Textarea, TextInput } from "flowbite-react";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button } from '@mui/joy';
import { uploadImage } from '../../../assets/Library/uploadFile';
import { updateOrder } from '../../../api/apiServices';
import FormatPrice from '../../../clientPage/components/FormatPrice/FormatPrice';

export default function UpdateOrderModal(props) {
  const { open, onClose, data, setData, row, tableData, setTableData } = props;
  const [listUrl, setListUrl] = useState([]);
  const [file, setFile] = useState(null);
  const [deliStatus, setDeliStatus] = useState("");

  const formatPrice = (price) => {
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(price);
  }

  console.log(deliStatus)

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
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      _id: data._id,
      user: data.user,
      address: data.address,
      subTotal: data.subTotal,
      note: data.note,
      orderDetail: data.orderDetail,
      status: deliStatus,
    }
    console.log(updateData)

    tableData[row.index] = updateData
    await updateOrder(data._id, updateData)
      .then(res => {
        console.log(res.data.data)
        setTableData([...tableData])
        onClose()
      })
      .catch((err)=>{
        console.log(err)
      }) 
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
      <DialogTitle id="scroll-dialog-title">Update Order
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
        <div class="relative overflow-y-auto p-4">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div>
                    <Label htmlFor="fullName">Username</Label>
                    <TextInput
                      readOnly
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Your full name"
                      className="mt-1"
                      value={data?.user?.fullName}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subTotal">Total</Label>
                    <TextInput
                      readOnly
                      id="subTotal"
                      name="subTotal"
                      type="text"
                      placeholder="subTotal"
                      className="mt-1"
                      value={formatPrice(data.subTotal)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <div className="mt-1">
                      <Select
                        id="status"
                        name="status"
                        value={deliStatus}
                        defaultValue={deliStatus}
                        onChange={(e) => setDeliStatus(e.target.value)}
                      >
                        <option>---Select---</option>
                        <option>Preparing</option>
                        <option>Delivering</option>
                        <option>Delivered</option>
                        <option>Refunded</option>
                      </Select>
                    </div>
                  </div>
                  <div className="lg:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Textarea
                      readOnly
                      id="address"
                      name="address"
                      placeholder="Address"
                      rows={3}
                      className="mt-1"
                      value={data.address}
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <Label htmlFor="note">Note</Label>
                    <Textarea
                      readOnly
                      id="note"
                      name="note"
                      placeholder="Note"
                      rows={3}
                      className="mt-1"
                      value={data.note}
                    />
                  </div>
                  <div>
                    <Label htmlFor="createdAt">Created At</Label>
                    <TextInput
                      readOnly
                      id="createdAt"
                      name="createdAt"
                      type="date"
                      placeholder="createdAt"
                      className="mt-1"
                      value={formatDate(data.createdAt)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="updatedAt">Updated At</Label>
                    <TextInput
                      readOnly
                      id="updatedAt"
                      name="updatedAt"
                      type="date"
                      className="mt-1"
                      value={formatDate(data.updatedAt)}
                    />
                  </div>
                </div>
              </form>
            </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
          <Button variant="plain" color="neutral" onClick={() => onClose()}>
            Cancel
          </Button>
          <Button variant="solid" color="primary" onClick={handleSubmit}>
            Confrim
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}
