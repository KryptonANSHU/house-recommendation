import React, { Fragment, useEffect } from "react";
import './button.css'

const InputErrorModal = ({ showModal, setshowModal, heading, subheading }) => {
const onCancel = () => {
    setshowModal(false)
}

if(showModal){
    return (
    <>
    <div className='justify-center backdrop-blur-sm items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-lg'>
                <div className='p-6 bg-gray-300 text-black border-gray-600 rounded-md'>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='relative text-center w-full'>
                            <h1 className="text-2xl font-semibold flex-1 uppercase text-blue">
                               {heading}
                            </h1>
                        </div>
                        <h3 className='text-lg my-3 w-full break-words text-center'>{subheading}</h3>
                        <button
                                className=" w-full heroButton"
                                onClick={onCancel}
                            >
                                OK
                            </button>
                    </div>
                    <div className='flex items-center justify-center px-4'>
                        
                    </div>
                </div>
                <img src="/images/misc/modal_bg.png" alt="" />
            </div>
        </div><div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      );
} 
else return <></>;
 
};

export default InputErrorModal;