"use client";

import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import {  PayPalButtons } from "@paypal/react-paypal-js";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { useRouter } from "next/navigation";

import { Users } from "@/config/schema";
import { db } from "@/config/db";


function BuyCredits() {
  const creditOptions = [
    { credits: 5, amount: 0.99 },
    { credits: 10, amount: 1.99 },
    { credits: 25, amount: 3.99 },
    { credits: 50, amount: 6.99 },
    { credits: 100, amount: 9.99 },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  const router=useRouter();
  const onPaymentSuccess=async()=>{
    console.log("Payment Success...")
    //update user credits in db
    const result=await db.update(Users)
    .set({
        credits:userDetail?.credits+selectedOption?.credits
    }).returning({id:Users.id});

    if(result)
    {   
        setUserDetail(prev=>({
            ...prev,
            credits:userDetail?.credits+selectedOption?.credits
        }))
        router.push('/dashboard');
    }

  }

  return (
    <div>
      <h2 className="font-bold text-2xl">Buy More Credits</h2>
      <p>Unlock endless possibilities - Buy more credits and transform your room.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
        {creditOptions.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedOption(item)}
            className={`flex flex-col gap-2 justify-center items-center p-4 border rounded-xl cursor-pointer transition 
              ${selectedOption?.credits === item.credits ? "border-primary" : "border-gray-300"}`}
          >
            <h2 className="font-bold text-3xl">{item.credits}</h2>
            <h2 className="font-medium text-xl">Credits</h2>
            <Button className="w-full">Select</Button>
            <h2 className="font-medium text-primary">${item.amount}</h2>
          </div>
        ))}
      </div>
      <div className="mt-20">
        {selectedOption?.amount&&
            <PayPalButtons style={{ layout: "horizontal" }} 
            onApprove={()=>onPaymentSuccess()}
            onCancel={()=>console.log("Payment Cancel")}
            createOrder={(data,actions)=>{
                return actions?.order.create({
                        purchase_units:[
                            {
                                amount:{
                                    value:selectedOption?.amount?.toFixed(2),
                                    currency_code:'USD'
                                }
                            }
                        ]
                })
            }}
            />
            
        }
      </div>
    </div>
  );
}

export default BuyCredits;
