import { useEffect, useMemo, useState } from 'react'

const employeeNotifications = [
  { id: 1, type: 'leave', title: 'Leave request submitted', message: 'Your annual leave request for 28-29 August has been submitted.', time: '10 min ago', unread: true },
  { id: 2, type: 'approved', title: 'Leave request approved', message: 'Your leave request for 12 August was approved by HR.', time: 'Yesterday', unread: true },
  { id: 3, type: 'hr', title: 'Office holiday announcement', message: 'The office will be closed on 27 August for a public holiday.', time: '2 days ago', unread: false },
  { id: 4, type: 'rejected', title: 'Leave request rejected', message: 'Your leave request for 20 August was not approved.', time: '5 days ago', unread: false },
]

const adminNotifications = [
  { id: 1, type: 'leave', title: 'New leave request', message: 'Aarav Sharma requested annual leave for 28-29 August.', time: '10 min ago', unread: true },
  { id: 2, type: 'attendance', title: 'Attendance alert', message: 'Priya Nair has not checked in today.', time: '35 min ago', unread: true },
  { id: 3, type: 'hr', title: 'Important employee notification', message: 'Rohan Mehta uploaded a new address proof document.', time: 'Yesterday', unread: false },
]

const symbols = { leave: 'L', approved: 'OK', rejected: 'X', attendance: '!', hr: 'i' }

export default function Notifications({ role = 'admin' }) {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState(role === 'employee' ? employeeNotifications : adminNotifications)
  useEffect(() => { setItems(role === 'employee' ? employeeNotifications : adminNotifications); setOpen(false) }, [role])
  const unreadCount = useMemo(() => items.filter((item) => item.unread).length, [items])
  const markAllRead = () => setItems((current) => current.map((item) => ({ ...item, unread: false })))
  const markRead = (id) => setItems((current) => current.map((item) => item.id === id ? { ...item, unread: false } : item))

  return <div className="notification-wrap">
    <button className="notification-button" aria-label="Notifications" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
      <span className="bell">N</span>{unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
    </button>
    {open && <div className="notification-dropdown" role="dialog" aria-label="Notifications">
      <div className="notification-heading"><div><h2>Notifications</h2><p>{unreadCount ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'You are all caught up'}</p></div>{unreadCount > 0 && <button onClick={markAllRead}>Mark all as read</button>}</div>
      <div className="notification-list">
        {items.map((item) => <button key={item.id} className={item.unread ? 'notification-item unread' : 'notification-item'} onClick={() => markRead(item.id)}>
          <span className={`notification-type ${item.type}`}>{symbols[item.type]}</span><span className="notification-copy"><strong>{item.title}</strong><span>{item.message}</span><small>{item.time}</small></span>{item.unread && <i aria-label="Unread" />}
        </button>)}
      </div>
      <button className="view-all-button" onClick={markAllRead}>View all notifications</button>
    </div>}
  </div>
}
