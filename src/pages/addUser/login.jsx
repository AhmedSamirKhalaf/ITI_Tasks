import React from "react";

function LoginForm(){
    const [info, setInfo] = React.useState({
        username : '',
        password : ''
    });
    const [error , setErrors] = React.useState({
        errUserNmae : '',
        errPassword : ''
    });

    const handleForm = (e) => {

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

        

    }
    
    return(
        <div className="flex items-center justify-center h-screen bg-base-100">
            <fieldset className="fieldset  rounded-lg bg-base-200 border-base-300
             rounded-box w-xl h-[50%] border p-4
             transition duration-300 ease-in-out ring-2 ring-gray-200/20 hover:shadow-lg hover:ring-gray-700/50 ">
        <legend className="fieldset-legend text-2xl ml-4 font-bold bg-inherit">Hello There!</legend>

        <div className="flex flex-col my-0 mx-auto  gap-4 justify-normal w-[80%] items-start ">
        <label className="label font-bold text-gray-700">Email</label>
        <input type="text" className="input w-full p-3 ring-2 ring-gray-500/50" 
        value={info.username} name="email" onChange={(e)=> handleForm(e)} />
        {(error.errUserNmae &&(<p className="text-red-900 font-light">{error.errUserNmae}</p>)) || <>&nbsp;</>}
        


        <label className="label font-bold text-gray-700">Password</label>
        <input type="password" className="input p-3 w-full ring-2 ring-gray-500/50" value={info.password} 
        name="password" onChange={(e)=>handleForm(e)} />

        {(error.errPassword && (<p className="text-red-900 font-light">{error.errPassword}</p>)) || <>&nbsp;</>}
        
        </div>
        
        <button className="btn btn-primary mt-12 w-[50%] ml-[25%] bg-blue-200 hover:bg-blue-400 font-bold">Sign In</button>
            <div className="flex justify-center gap-3 items-center mt-4 ">
                <span className="text-sm text-gray-600 mt-4">Don't have an account?</span>
                <button className="btn btn-primary mt-4 w-[20%]  bg-gray-300 hover:bg-gray-400 font-bold">Sign Up</button>
            </div>
            
        </fieldset>
        </div>
    );
}

export default LoginForm;