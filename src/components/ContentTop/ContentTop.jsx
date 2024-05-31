import { iconsImgs } from "../../utils/images";
import "./ContentTop.css";
import { useContext } from "react";
import { SidebarContext } from "../../context/sidebarContext";

const ContentTop = () => {
  const { toggleSidebar } = useContext(SidebarContext);
  return (
    <div className="main-content-top">
      <div className="content-top-left">
        <button type="button" className="sidebar-toggler" onClick={() => toggleSidebar()}>
          <img src={iconsImgs.dashboard} alt="Toggle Sidebar" />
        </button>
        <h3 className="content-top-title">Dashboard</h3>
      </div>
      <div className="content-top-right">
        <img src={iconsImgs.bell} alt="Notifications" />
        <img src={iconsImgs.person_one} alt="User" />
        <img src={iconsImgs.down} alt="User" />
      </div>
    </div>
  );
};

export default ContentTop;
