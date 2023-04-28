import { React, useEffect, useState, useRef} from 'react';
import { Box, Button } from '@mui/joy';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Label, TextInput, Select } from "flowbite-react";
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { uploadImage } from '../../../assets/Library/uploadFile';
import { createNewUser } from '../../../api/apiServices';
import isEmail from 'validator/lib/isEmail';

export default function CreateUserModal(props) {
  const { open, onClose, tableData, setTableData } = props;
  const [listUrl, setListUrl] = useState([]);
  const [file, setFile] = useState(null);

  const passwordElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: passwordElement } = passwordElementRef;
      if (passwordElement !== null) {
        passwordElement.focus();
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
  const [newUser, setNewUser] = useState({
    email: "",
    password: "", 
    fullName: "",
    phoneNumber: "",
    role: ""
  })

  const handleImage = (e) => {
    setFile(e.target.files)
    setError({image: ""})
  }

  const [error, setError] = useState({
    email: "",
    password: "", 
    fullName: "",
    phoneNumber: "",
    role: "",
    image: ""
  });

  const validateAll = () => {
    let msg = {}
    if (newUser.email === "") {
      msg.email = "Email field is required!"
    } else if (!isEmail(newUser.email)) {
      msg.email = "Invalid email!"
		} if (newUser.password === "") {
      msg.password = "Password field is required!"
    } else if (newUser.password.length < 6) {
      msg.password = "Password must greater than 5!"
    } if (newUser.fullName === "") {
      msg.fullName = "Full Name field is required!"
    } if (newUser.phoneNumber === "") {
      msg.phoneNumber = "Phone Number field is required!"
    } if (newUser.role === "") {
      msg.role = "Permission field is required!"
    } if (!file) {
      msg.image = "Image field is required!"
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
    setNewUser({...newUser, [name]: value})
    setError({...error, [name]: ""})
  }

  const handleClose = () => {
    clearState()
    onClose()
  }

  const clearState = () => {
    setError({
      email: "",
      password: "", 
      fullName: "",
      phoneNumber: "",
      role: "",
      image: ""
    })
    setNewUser({
      email: "",
      password: "", 
      fullName: "",
      phoneNumber: "",
      role: ""
    })
    onClose()
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: newUser.email,
      password: newUser.password,
      fullName: newUser.fullName,
      role: newUser.role,
      phoneNumber: newUser.phoneNumber,
      image: []
    }

    const isValid = validateAll()
    if (isValid){
      for (let index = 0; index < file.length; index++) {
        const element = file[index];
        const upfile = await uploadImage(element);
        data.image.push(upfile.data);
        setListUrl(val=>[...val, upfile.data])  
      }
      await createNewUser(data)
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
      aria-describedby="scroll-dialog-password"
    >
      <DialogTitle id="scroll-dialog-title">Create New User
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
          id="scroll-dialog-password"
          ref={passwordElementRef}
          tabIndex={-1}
        >
        <div class="relative overflow-y-auto p-4">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <TextInput
                      autoFocus
                      id="email"
                      name="email"
                      type="text"
                      placeholder="example@gmail.com"
                      className="mt-1"
                      value={newUser.email}
                      onChange={handleChangeInput}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.email}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <TextInput
                      id="fullName"
                      name="fullName"
                      type="text"
                      placeholder="Your full name"
                      className="mt-1"
                      value={newUser.fullName}
                      onChange={handleChangeInput}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.fullName}
                    </p>
                  </div>
                  {/* <div>
                    <Label htmlFor="role">Permission</Label>
                    <TextInput
                      id="role"
                      name="role"
                      type="text"
                      className="mt-1"
                      placeholder="Admin or Customer"
                      value={newUser.role}
                      onChange={handleChangeInput}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.role}
                    </p>
                  </div> */}
                  <div>
                    <Label htmlFor="role">Permission</Label>
                    <div className="mt-1">
                      <Select
                        id="role"
                        name="role"
                        value={newUser.role}
                        onChange={handleChangeInput}
                      >
                        <option>---Select---</option>
                        <option>Admin</option>
                        <option>Customer</option>
                      </Select>
                      <p class="mt-1 text-sm text-red-500"> 
                      {error.role}
                    </p>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <TextInput
                      id="phoneNumber"
                      name="phoneNumber"
                      type="text"
											placeholder='Your number phone'
                      className="mt-1"
                      value={newUser.phoneNumber}
                      onChange={handleChangeInput}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.phoneNumber}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <TextInput
                      id="password"
                      name="password"
                      placeholder="Password must be greater than 5"
                      className="mt-1"
                      value={newUser.password}
                      onChange={handleChangeInput}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.password}
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="image">Image</Label>
                    <TextInput
                      id="image"
                      name="image"
                      type="file"
                      className="mt-1"                      
                      onChange={(e) => handleImage(e)}
                    />
                    <p class="mt-1 text-sm text-red-500"> 
                      {error.image}
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
