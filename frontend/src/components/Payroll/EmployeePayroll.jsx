import SalarySlip from './SalarySlip'

const salary = { employee: 'Aarav Sharma', id: 'EMP-1042', month: 'August 2026', basic: 45000, allowances: 10500, deductions: 3300 }
const currency = (amount) => `₹${amount.toLocaleString('en-IN')}`

export default function EmployeePayroll() {
  const net = salary.basic + salary.allowances - salary.deductions
  return <main className="demo-content payroll-page"><div className="page-title"><div><p>PAYROLL / MY SALARY</p><h1>My salary</h1><span>Your salary details for {salary.month}.</span></div></div><section className="salary-hero"><div><p>Net salary</p><strong>{currency(net)}</strong><span>Payable for {salary.month}</span></div><div className="salary-mini"><span>Basic salary <b>{currency(salary.basic)}</b></span><span>Allowances <b>{currency(salary.allowances)}</b></span><span>Deductions <b className="negative">−{currency(salary.deductions)}</b></span></div></section><section className="two-column"><section className="panel"><h2>Salary breakdown</h2><div className="breakdown-row"><span>Basic salary</span><b>{currency(salary.basic)}</b></div><div className="breakdown-row"><span>Allowances</span><b>{currency(salary.allowances)}</b></div><div className="breakdown-row"><span>Provident fund & tax</span><b className="negative">−{currency(salary.deductions)}</b></div><div className="breakdown-row total"><span>Net salary</span><b>{currency(net)}</b></div></section><SalarySlip salary={salary} /></section></main>
}
