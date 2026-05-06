import React from "react";
function Register(){
     const [info, setInfo] = React.useState({
            name : '' ,
            username : '',
            password : '' , 
            confirmPassword : ''
        });
        const [error , setErrors] = React.useState({
            errNmae : '' ,
            errUserNmae : '',
            errPassword : '' , 
            errConfirmPassword : '',
        });
    
        const handleForm = (e) => {
            
            if(e.target.name === 'name'){
                let msg = '';
                if(e.target.value.length === 0){
                    msg = 'enter the  name field';
                }

                setErrors({
                    ...error , 
                    errNmae : msg,
                });

                setInfo({
                    ...info,
                    name : e.target.value
                });
            }

            if(e.target.name === 'email'){
                let msg = '';
                if(e.target.value.length === 0){
                    msg = 'enter the email field'
                }
    
                else if (! /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.target.value)){
                   msg = 'Enter a valid email feild';
                }
                    
            setErrors({
                    ...error,
                    errUserNmae : msg
                    });
    
            setInfo({
                ...info,
                username : e.target.value 
            });
                
            }
    
            if(e.target.name === 'password'){
                let msg = ''
                if(e.target.value.length === 0){
                    msg = 'plz enter the password'
                }
                else if(e.target.value.length < 8){
                    msg = 'password must be longer than 8'
                }
                
                setErrors({
                    ...error,
                    errPassword : msg
                })
    
                setInfo({
                    ...info,
                    password : e.target.value
                })
            }

            if(e.target.name === 'confirmPassword'){
                let msg = ''
                if(e.target.value !== info.password){
                    msg = 'confrim password must match the password field';
                }
                setErrors({
                    ...error , 
                    errConfirmPassword : msg
                });

                setInfo({
                    ...info , 
                    confirmPassword : e.target.value
                });
            }
    
            
    
        }
       

     return(
        <div className="flex items-center justify-center h-screen bg-base-100">
            <fieldset className="fieldset ring-2 ring-gray-500/50 rounded-lg 
            bg-base-200 border-base-800 rounded-box w-xl h-[80%] border p-4">
        <legend className="fieldset-legend text-2xl font-bold ml-4 bg-inherit">Hello There!</legend>

        <div className="flex flex-col gap-4 justify-normal items-start
            my-0 mx-auto  w-[80%]
        ">

        <label className="label font-bold text-gray-700">Name</label>
        <input type="text" className="input w-full p-3 ring-2 ring-gray-500/50" 
        value={info.name} name="name" onChange={(e)=> handleForm(e)} />
        {(error.errNmae &&(<p className="text-red-900 font-light">{error.errNmae}</p>)) || <>&nbsp;</>}
        

        <label className="label font-bold text-gray-700">Email</label>
        <input type="text" className="input w-full p-3 ring-2 ring-gray-500/50" 
        value={info.username} name="email" onChange={(e)=> handleForm(e)} />
        {(error.errUserNmae &&(<p className="text-red-900 font-light">{error.errUserNmae}</p>)) || <>&nbsp;</>}
        


        <label className="label font-bold text-gray-700">Password</label>
        <input type="password" className="input p-3 w-full ring-2 ring-gray-500/50" value={info.password} 
        name="password" onChange={(e)=>handleForm(e)} />
        {(error.errPassword && (<p className="text-red-900 font-light">{error.errPassword}</p>)) || <>&nbsp;</>}

        
        <label className="label font-bold text-gray-700">Confirm Password</label>
        <input type="password" className="input p-3 w-full ring-2 ring-gray-500/50" value={info.confirmPassword} 
        name="confirmPassword" onChange={(e)=>handleForm(e)} />
        {(error.errConfirmPassword && (<p className="text-red-900 font-light">{error.errConfirmPassword}</p>)) || <>&nbsp;</>}
        


        </div>
            
        <button className="btn btn-primary mt-12 w-[50%] ml-[25%] bg-blue-200 hover:bg-blue-400 font-bold">Sign Up</button>
            <div className="flex justify-center gap-3 items-center mt-4 ">
                <span className="text-sm text-gray-600 mt-4">Allready have an account?</span>
                <button className="btn btn-primary mt-4 w-[20%]  bg-gray-300 hover:bg-gray-400 font-bold">Sign In</button>
            </div>

        </fieldset>
        </div>
    );
}


export default Register;