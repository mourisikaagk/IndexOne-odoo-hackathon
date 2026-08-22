const money = (number) => `₹${number.toLocaleString('en-IN')}`
export default function SalarySlip({ salary }) {
  const net = salary.basic + salary.allowances - salary.deductions
  return <section className="panel salary-slip"><div><p className="eyebrow">SALARY SLIP</p><h2>{salary.month}</h2><span>{salary.employee} · {salary.id}</span></div><div className="slip-total"><span>Net payable</span><b>{money(net)}</b></div><button className="primary-button" onClick={() => window.print()}>Print salary slip</button></section>
}
