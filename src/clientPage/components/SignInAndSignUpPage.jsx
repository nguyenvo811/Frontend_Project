import {React, useEffect, useState, forwardRef} from 'react';
import Button from '@mui/joy/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Label, TextInput } from "flowbite-react";
import { createNewUser, signIn } from '../../api/apiServices';
import isEmail from 'validator/lib/isEmail';
import { uploadImage } from '../../assets/Library/uploadFile';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function SignInAndSignUpPage() {
  const [open, setOpen] = useState(false);
	const [signUp, setSignUp] = useState(false);
	const [listUrl, setListUrl] = useState([]);
  const [file, setFile] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
		setSignUp(false)
		clearState()
  };

  const handleClose = () => {
    setOpen(false);
		setSignUp(false)
		clearState()
  };

	const [userSignIn, setUserSignIn] = useState({
    email: "",
    password: "", 
  })
	const [newUser, setNewUser] = useState({
    emailSignUp: "",
    passwordSignUp: "", 
    fullNameSignUp: "",
    phoneNumberSignUp: "",
  })

  const handleImage = (e) => {
    setFile(e.target.files)
    setErrorSignUp({imageSignUp: ""})
  }

  const [error, setError] = useState({
    email: "",
    password: ""
  });

	const [errorSignUp, setErrorSignUp] = useState({
    emailSignUp: "",
    passwordSignUp: "", 
    fullNameSignUp: "",
    phoneNumberSignUp: "",
    imageSignUp: ""
  });

  const validateAll = () => {
    let msg = {}
    if (userSignIn.email === "") {
      msg.email = "Email field is required!"
    } else if (!isEmail (userSignIn.email)) {
      msg.email = "Invalid email!"
		} if (userSignIn.password === "") {
      msg.password = "Password field is required!"
    } 
    
    setError(msg)
    console.log("validating")
    if (Object.keys(msg).length > 0) {
      return false
    } else {
      return true
    }
  };

	const validateSignUp = () => {
		let msg = {}
    if (newUser.emailSignUp === "") {
      msg.emailSignUp = "Email field is required!"
    } else if (!isEmail (newUser.emailSignUp)) {
      msg.emailSignUp = "Invalid email!"
		} if (newUser.passwordSignUp === "") {
      msg.passwordSignUp = "Password field is required!"
    } else if (newUser.passwordSignUp.length < 6) {
      msg.passwordSignUp = "Password must greater than 5!"
    } if (newUser.fullNameSignUp === "") {
      msg.fullNameSignUp = "Full Name field is required!"
    } if (newUser.phoneNumberSignUp === "") {
      msg.phoneNumberSignUp = "Phone Number field is required!"
    } if (!file) {
      msg.imageSignUp = "Image field is required!"
    }

		setErrorSignUp(msg)
    console.log("validating")
    if (Object.keys(msg).length > 0) {
      return false
    } else {
      return true
    }
	}

  const handleChangeInput = (e) => {
    let {name, value} = e.target;
    setUserSignIn({...userSignIn, [name]: value})
    setError({...error, [name]: ""})
  }

	const handleChangeInputSignUp = (e) => {
    let {name, value} = e.target;
    setNewUser({...newUser, [name]: value})
    setErrorSignUp({...errorSignUp, [name]: ""})
  }

  const clearState = () => {
    setError({
      email: "",
      password: "",
    })
    setUserSignIn({
      email: "",
      password: "", 
    })
		setNewUser({
      emailSignUp: "",
      passwordSignUp: "", 
      fullNameSignUp: "",
      phoneNumberSignUp: "",
    })
		setErrorSignUp({
      emailSignUp: "",
			passwordSignUp: "", 
			fullNameSignUp: "",
			phoneNumberSignUp: "",
			imageSignUp: ""
    })
  }

	const handleSignIn = async (e) => {
		e.preventDefault();
		const data = {
			email: userSignIn.email,
			password: userSignIn.password
		};

    const isValid = validateAll()
    if (isValid){
		return await signIn(data) 
			.then(res => { 
				console.log(res)
				handleClose()
				window.location.reload()
			})
			.catch((err)=>{
				if (err.response) {
					console.log(err.response.data.result);
					console.log(err.response.status);
					console.log(err.response.data.message);
				}
			})
		}
	}

	const handleSignUp = async (e) => {
		e.preventDefault();
		const data = {
      email: newUser.emailSignUp,
      password: newUser.passwordSignUp,
      fullName: newUser.fullNameSignUp,
      phoneNumber: newUser.phoneNumberSignUp,
      image: []
    }

    const isValid = validateSignUp()
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
          console.log("Sign up success")
					setOpen(false)
          clearState()
        })
        .catch((err)=>{
          console.log(err)
        }) 
    }
	}

  return (
    <div>
      <Button 
        variant="outlined" 
        color="neutral"
        onClick={handleClickOpen}
        startDecorator={<AccountCircleIcon color="action" />}>
        Sign In
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth={true}
        maxWidth="md"
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          	<div className='max-w-screen-xl mx-auto relative'>
							<div className="w-full flex justify-center md:gap-4">
								{ !signUp? 
									<div class="md:w-1/2 max-md:w-full py-8 border-none">
									<h1 class="text-xl font-semibold">Welcome back</h1>
									<h4 class="text-gray-400">Welcome back! Please enter your details</h4>

									<form class="mt-4">
										<div class="mb-3">
											<Label htmlFor="email">Email</Label>
											<TextInput
												autoFocus
												id="email"
												name="email"
												type="email"
												placeholder="example@gmail.com"
												className="mt-1"
												value={userSignIn.email}
												onChange={handleChangeInput}
											/>
											<p class="mt-1 text-sm text-red-500"> 
												{error.email}
											</p>
										</div>
										
										<div class="mb-3">
											<Label htmlFor="password">Password</Label>
											<TextInput
												id="password"
												name="password"
												type="password"
												placeholder="Your password"
												className="mt-1"
												value={userSignIn.password}
												onChange={handleChangeInput}
											/>
											<p class="mt-1 text-sm text-red-500"> 
												{error.password}
											</p>
										</div>

										<div class="mb-3 flex flex-wrap content-center">
											<input id="remember" type="checkbox" class="mr-1 checked:bg-purple-700" /> <label for="remember" class="mr-auto text-xs font-semibold">Remember for 30 days</label>
											<a href="#" class="text-xs font-semibold underline cursor-pointer hover:text-gray-900">Forgot password?</a>
										</div>

										<div class="mb-3">
											<Button 
												variant="solid" 
												color="neutral"
												className='mb-1.5 block w-full text-center px-2 py-1.5'
												onClick={handleSignIn}
												>
												Sign In
											</Button>
											{/* <Button 
												variant="outlined" 
												color="neutral"
												class=" w-full px-2 py-1.5"
												>
												<div className='flex justify-center items-center'>
													<img class="w-5 mr-2" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" />
													Sign in with Google
												</div>
											</Button> */}
										</div>
									</form>

									<div class="text-center">
										<span class="text-xs text-gray-400 font-semibold">Don't have account?</span>
										<a onClick={() => setSignUp(true)} class="text-xs font-semibold underline cursor-pointer hover:text-gray-900">Sign Up</a>
									</div>
								</div>
								:
								<div class="md:w-1/2 max-md:w-full border-none">
									<h1 class="text-xl font-semibold">Welcome New User</h1>
									<h4 class="text-gray-400">Please enter your details to Sign Up</h4>

									<form class="mt-4">
										<div>
											<Label htmlFor="emailSignUp">Email</Label>
											<TextInput
												autoFocus
												id="emailSignUp"
												name="emailSignUp"
												type="email"
												placeholder="example@gmail.com"
												className="mt-1"
												value={newUser.emailSignUp}
												onChange={handleChangeInputSignUp}
											/>
											<p class="mt-1 text-sm text-red-500"> 
												{errorSignUp.emailSignUp}
											</p>
										</div>
										
										<div>
											<Label htmlFor="passwordSignUp">Password</Label>
											<TextInput
												id="passwordSignUp"
												name="passwordSignUp"
												type="password"
												placeholder="Your password"
												className="mt-1"
												value={newUser.passwordSignUp}
												onChange={handleChangeInputSignUp}
											/>
											<p class="mt-1 text-sm text-red-500"> 
												{errorSignUp.passwordSignUp}
											</p>
										</div>

										<div>
											<Label htmlFor="fullNameSignUp">Full Name</Label>
											<TextInput
												id="fullNameSignUp"
												name="fullNameSignUp"
												type="text"
												placeholder="Your full name"
												className="mt-1"
												value={newUser.fullNameSignUp}
												onChange={handleChangeInputSignUp}
											/>
											<p class="mt-1 text-sm text-red-500"> 
												{errorSignUp.fullNameSignUp}
											</p>
										</div>

										<div>
											<Label htmlFor="phoneNumberSignUp">Phone Number</Label>
											<TextInput
												id="phoneNumberSignUp"
												name="phoneNumberSignUp"
												type="text"
												placeholder="Your phone number"
												className="mt-1"
												value={newUser.phoneNumberSignUp}
												onChange={handleChangeInputSignUp}
											/>
											<p class="mt-1 text-sm text-red-500"> 
												{errorSignUp.phoneNumberSignUp}
											</p>
										</div>

										<div>
                    <Label htmlFor="imageSignUp">Image</Label>
                    <TextInput
                      id="imageSignUp"
                      name="imageSignUp"
                      type="file"
                      className="mt-1"                      
                      onChange={(e) => handleImage(e)}
                    />
										<p class="mt-1 text-sm text-red-500"> 
												{errorSignUp.imageSignUp}
											</p>
                  </div>

										<div class="mb-3">
											<Button 
												variant="solid" 
												color="neutral"
												className='mb-1.5 block w-full text-center px-2 py-1.5'
												onClick={handleSignUp}
												>
												Sign Up
											</Button>
											{/* <Button 
												variant="outlined" 
												color="neutral"
												class=" w-full px-2 py-1.5"
												>
												<div className='flex justify-center items-center'>
													<img class="w-5 mr-2" src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA" />
													Sign in with Google
												</div>
											</Button> */}
										</div>
									</form>

									<div class="text-center">
										<span class="text-xs text-gray-400 font-semibold">Have an account already?</span>
										<a onClick={() => handleClickOpen()} class="text-xs font-semibold underline cursor-pointer hover:text-gray-900">Sign in</a>
									</div>
								</div>
								}

								<div class="md:w-1/2 max-md:hidden">
									<div class="w-full h-full bg-cover bg-center" style={{backgroundImage: `url(${"https://www.rd.com/wp-content/uploads/2022/08/GettyImages-1405467489.jpg"})`}} />
								</div>
							</div>
						</div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}