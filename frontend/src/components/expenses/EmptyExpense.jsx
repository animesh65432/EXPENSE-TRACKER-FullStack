import React from 'react';

const EmptyExpense = () => {
    return (
        <div>
            <div>
                <div className="relative w-[20vw] h-[20vh]">
                    <img src="/close-up-mystery-box.jpg" alt="Mystery Box" />
                    <div className='text-black  font-bold sm:text-[16px] text-[8px]'>
                        No Expenses added
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmptyExpense;
