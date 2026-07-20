import React from 'react'

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 border border-t-2  ">
            <div className="relative z-10 mx-auto max-w-7xl px-4 h-2">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12">
                        <div className="flex h-full flex-col justify-between">
                           
                            <div>
                                <p className="text-sm text-white">
                                    &copy; Copyright 2023. All Rights Reserved by DevUI.
                                </p>
                            </div>
                        </div>
                    </div>
                  
                </div>
            </div>
        </section>
  )
}

export default Footer