import { useEffect, useState } from 'react';
import { personsImgs } from '../../utils/images';
import "./Sidebar.css";
import { useContext } from 'react';
import { SidebarContext } from '../../context/sidebarContext';

const Sidebar = () => {
  const [activeLinkIdx] = useState(1);
  const [sidebarClass, setSidebarClass] = useState("");
  const { isSidebarOpen } = useContext(SidebarContext);

  useEffect(() => {
    if(isSidebarOpen){
      setSidebarClass('sidebar-change');
    } else {
      setSidebarClass('');
    }
  }, [isSidebarOpen]);

  return (
    <div className={ `sidebar ${sidebarClass}` }>
      <div className="transparent-box">ADMIN</div>
    
      <div className="sidebar-item">
        <i className="fas fa-tachometer-alt"></i>
        <br/>
        <span className="item-text transparent-box-menu">Dashboard</span>
      </div>
    </div>
  )
}

export default Sidebar;
