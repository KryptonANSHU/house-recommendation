import React, { Fragment, useEffect } from "react";
import Portal from "./Portal";

const InputErrorModal = ({ showModal, setshowModal }) => {
const onCancel = () => {
    setshowModal(false)
}

if(showModal){
    return (
    <>
    <div className='justify-center backdrop-blur-md items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-lg'>
                <div className='p-4 bg-black font-manrope text-white border-[1px] border-gray-600'>
                    <div className='flex flex-col items-center justify-center'>
                        <div className='relative text-center w-full'>
                            <h1 className="text-2xl flex-1 uppercase text-blue">
                                Please Enter Valid Values
                            </h1>
                            <button
                                className="p-3 absolute top-0 right-0 bg-custom-blue text-white text-sm font-bold uppercase px-6 py-3 rounded w-full max-w-xs"
                                onClick={onCancel}
                            >
                                <img src="/icons/cross.png" alt="" className='w-3' />
                                OK
                            </button>
                        </div>
                        <h3 className='text-lg my-3 w-full break-words text-center'>Rows and Coloumns cannot be less than 0</h3>
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