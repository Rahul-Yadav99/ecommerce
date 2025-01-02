import React from 'react'
import Layout from './Layout'
import Chart from 'react-apexcharts'
import { useState } from 'react'

const Dashboard = () => {

  const sales = {
    options: {
      chart: {
        id: 'apexchart-example'
      },
      xaxis: {
        categories: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]
      }
    },
    series: [{
      name: 'series-1',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }]
  }

  const [profit, setProfit] = useState({
          
    series: [{
      name: 'Net Profit',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
      name: 'Revenue',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
    }, {
      name: 'Free Cash Flow',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
          borderRadiusApplication: 'end'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands"
          }
        }
      }
    },
  
  
});

  return (
    <Layout>
        <div className='grid md:grid-cols-4 grid-cols-1 gap-6'>
          <div className="rounded-lg shadow-xl p-8 bg-orange-200 border flex justify-around items-center">
            <div className="space-y-2">
              <div className='bg-orange-400 w-24 h-24 border-white border-2 rounded-full flex justify-center items-center'>
              <i className="ri-shopping-cart-2-line text-2xl text-white"></i>
              </div>
              <h1 className='text-xl font-semibold ml-3'>Products</h1>
            </div>
            <div className='border-r border-white h-full' />
            <h1 className='text-3xl font-semibold'>
              {(22251).toLocaleString()}
            </h1>
          </div>

          <div className="rounded-lg shadow-xl p-8 bg-lime-200 border flex justify-around items-center">
            <div className="space-y-2">
              <div className='bg-lime-400 w-24 h-24 border-white border-2 rounded-full flex justify-center items-center'>
              <i className="ri-shopping-basket-line text-2xl text-white"></i>
              </div>
              <h1 className='text-xl font-semibold ml-3'>Orders</h1>
            </div>
            <div className='border-r border-white h-full' />
            <h1 className='text-3xl font-semibold'>
              {(222).toLocaleString()}
            </h1>
          </div>

          <div className="rounded-lg shadow-xl p-8 bg-rose-200 border flex justify-around items-center">
            <div className="space-y-2">
              <div className='bg-rose-400 w-24 h-24 border-white border-2 rounded-full flex justify-center items-center'>
              <i className="ri-money-rupee-circle-line text-2xl text-white"></i>
              </div>
              <h1 className='text-xl font-semibold ml-3'>Payments</h1>
            </div>
            <div className='border-r border-white h-full' />
            <h1 className='text-3xl font-semibold'>
              {(222567).toLocaleString()}
            </h1>
          </div>

          <div className="rounded-lg shadow-xl p-8 bg-violet-200 border flex justify-around items-center">
            <div className="space-y-2">
              <div className='bg-violet-400 w-24 h-24 border-white border-2 rounded-full flex justify-center items-center'>
              <i className="ri-user-line text-2xl text-white"></i>
              </div>
              <h1 className='text-xl font-semibold ml-3'>Customer</h1>
            </div>
            <div className='border-r border-white h-full' />
            <h1 className='text-3xl font-semibold'>
              {(500).toLocaleString()}
            </h1>
          </div>

          <div className="bg-white shadow-xl rounded-lg md:col-span-2 p-8">
            <h1 className='text-xl font-semibold'>Sales</h1>
            <Chart
              options={sales.options}
              series={sales.series}
              height={350}
            />
          </div>

          <div className="bg-white shadow-xl rounded-lg md:col-span-2 p-8">
          <h1 className='text-xl font-semibold'>Profit</h1>
            <Chart
                options={profit.options}
                series={profit.series}
                height={350}
                type='bar'
              />
          </div>
          
          <div className="bg-gray-700 shadow-xl rounded-lg md:col-span-4 p-8 flex md:flex-row flex-col items-center gap-8">
            <div className="bg-gray-800 rounded-full ">
              <img src="/img/avtar.png" alt="avtar" className='w-[180px]'/>
            </div>
            <div className='md:space-y-5 space-y-3'>
              <h1 className="md:text-4xl text-xl font-bold text-white text-center">Dashbord Report & Analytics</h1>
              <p className='text-gray-50 md:text-sm text-xs text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit corporis, ut recusandae doloremque perspiciatis aperiam incidunt praesentium repudiandae laudantium at?</p>
            </div>
          </div>
        
        </div>
    </Layout>
  )
}

export default Dashboard