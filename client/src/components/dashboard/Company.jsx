import React from 'react'
import { CompanyMetrics } from '@/components/company/CompanyMetrics'
import MonthlySalesChart from '../company/MonthlySalesChart'
import MonthlyTarget from '../company/MonthlyTarget'
import StatisticsChart from '../company/StatisticsChart'
import Spinner from '../elements/Spinner'


const CompanyDash = () => {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <CompanyMetrics />
        <MonthlySalesChart />
      </div>
      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>


    </div>
  )
}

export default CompanyDash
