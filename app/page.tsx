"use client"
import Image from "next/image";
import { useMemo, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const frequencyMap = {
  Quarterly: 4,
  "Half yearly": 2,
  Yearly: 1,
  "At Maturity": 1,
};

export default function Home() {

  const [deposit, setDeposit] = useState(100000);
  const [rate , setRate] = useState(7);
  const [years , setYears] = useState(5);
  const [ interest , setInterest] = useState("Quarterly");

  const { maturityAmount, interestEarned, chartData } = useMemo(() => {
    const n = frequencyMap[interest as keyof typeof frequencyMap];
    const amount = deposit * Math.pow(1 + rate / (100 * n), n * years);
    const maturityAmount = Math.round(amount);
    const interestEarned = maturityAmount - deposit;

    const data = [];
    for (let i = 1; i <= years; i++) {
      const yearlyAmount = deposit * Math.pow(1 + rate / (100 * n), n * i);
      data.push({ year: `${i}`, value: Math.round(yearlyAmount) });
    }

    return { maturityAmount, interestEarned, chartData: data };
  }, [deposit, rate, years, interest]);

  return (
    <main className=" min-h-screen bg-white p-8">
      <div className="max-w-8xl mx-auto flex flex-col  lg:flex-row gap-8">
        <div className="left-div w-full  lg:w-[45%] bg-white  rounded-3xl p-8 "> 
         <h1 className=" text-4xl font-bold text-[#D1B29B] ">FD Calculator</h1>
         <p className="text-gray-500 mt-2">Estimates how much your fixed deposit investment will grow over time</p>
           
           <div className="mt-10">

           <div className="flex justify-between">
            <h2 className="text-xl font-semibold text-[#D1B29B] ">Deposit Amount (₹)</h2>
            <span className="font-bold bg-gray-100 px-4 py-2 rounded-full">{deposit}</span>
           </div>

           <input type="range" min={10000} max={5000000} className="w-full mt-4 accent-amber-300 " value={deposit} onChange={ (e) => setDeposit(Number(e.target.value))} />


           <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>10000</span>
            <span>2445000</span>
            <span>5000000</span>
           </div>

             <div className="mt-10">
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold text-[#D1B29B] ">Rate Of Return (%)</h2>
                <span className="font-bold bg-gray-100 px-4 py-2 rounded-full">{rate}</span>
              </div>

              <input type="range" min={5} max={30} className="w-full mt-4 accent-amber-300 " value={rate} onChange={ (e) => setRate(Number(e.target.value))} />
               
               <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>5%</span>
                <span>17.5%</span>
                <span>30%</span>
               </div>

             </div>


             <div className="mt-10">
              <h2 className="text-xl font-semibold text-[#D1B29B] " >Interest Payout</h2>
              <p className="text-sm text-gray-500">Cumulative Rate Of Return is <span className="text-green-700">{(((maturityAmount - deposit) / deposit) * 100).toFixed(2)}%</span></p>

               <div className="flex flex-wrap gap-3 mt-5"> {["Quarterly" , "Half yearly" , "Yearly" , "At Maturity"].map( (item)=> ( <button key={item} onClick={ () =>  setInterest(item)} className={`px-5 py-3 rounded-full transition ${interest === item ? "bg-[#D1B29B]  text-white " : "bg-gray-100 text-gray-700" } `}> {item}</button>) ) }</div>
             </div>

              
         

           </div>

            <div className="flex justify-between mt-10">

            <h2 className="text-xl font-semibold text-[#D1B29B] ">Time Period (Years)</h2>

            <span className="font-bold bg-gray-100 px-4 py-2 rounded-full">{years}</span>
          </div>
               <input type="range" min={1} max={50} className="w-full mt-4 accent-amber-300 " value={years} onChange={ (e) => setYears(Number(e.target.value))} />

               <div className="flex justify-between text-gray-500 mt-2" >

                <span>1</span>
                <span>25</span>
                <span>50</span>

               </div>

               <button className="bg-[#D1B29B]  px-5 py-3 rounded-full text-white" >Calculate</button>
           
           </div>



       <div className="right-dev w-full lg:w-[55%] bg-[#D1B29B] rounded-3xl p-8 flex flex-col gap-6">

         <div>
          <div className="flex justify-between text-white">

         <div >
          <p className="text-sm">Maturity Amount</p>
          <h2 className="text-4xl font-bold">₹{maturityAmount.toLocaleString("en-IN")}</h2>
          </div>    
          

            <div className="text-right" >
          <p className="text-sm">Interest Earned</p>
          <h2 className="text-4xl font-bold">₹{interestEarned.toLocaleString("en-IN")}</h2>
          </div> 

          </div>

          <div className="bg-white rounded-3xl mt-8 p-5 h-80">

            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, "Amount"]} />
                <Bar  dataKey="value" fill="#B67844" radius={[8,8,0,0]}/>
                </BarChart>
                </ResponsiveContainer>
          </div>
          
          

         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="bg-[#B67844] rounded-3xl p-6 text-white">
            <span className="bg-yellow-300 text-white px-3 py-1 rounded-full text-xs" >Personalised</span>

            <h3 className="text-2xl font-bold mt-5">Check Suitable Products For Your Investment</h3>
            <p className="mt-3 text-sm opacity-80">Exclusively For You</p>
          </div>

          <div className="bg-[#27313A] rounded-3xl p-6 text-white">

            <h3 className="text-2xl font-bold">Need Help Finding Right Product? <br/> Get Guidance From Wealth Manager</h3>
          </div>

         </div>
       </div>
      </div>
       
   
    </main>
  );
}
