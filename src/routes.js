import React from 'react'
import New_employee from './views/employee/New_employee'
import Liste_employee from './views/employee/Liste_employee'
import AddEvent from './views/Events/AddEvent'
import Calendar from './views/Events/Calendar'
import DisplayEvent from './views/Events/DisplayEvent'
import FileManager from './views/FTP/FileManager'
import Inbox from './views/Inbox/Inbox'
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
 

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
 
  

  { path: '/new_employee', name: 'Ajout empmlyee', component: New_employee },
  { path: '/liste_employee', name: 'Liste employee', component: Liste_employee },

  { path: '/ajout_event', name: 'Ajout event', component: AddEvent },
  { path: '/calendar', name: 'Calendar', component: Calendar },
  { path: '/display_events', name: 'Display Events', component: DisplayEvent },
  { path: '/file_manager', name: 'File manager', component: FileManager },
  { path: '/inbox', name: 'Inbox', component: Inbox },

 
]

export default routes
