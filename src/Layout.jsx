import { Outlet, Link } from "react-router-dom";
import Sidebar from './Components/SidebarLeft';  // Đảm bảo đường dẫn đúng

const Layout = () => {
    return (
        <>
            <Sidebar role="admin" />  {/* Thêm Sidebar ở đây */}
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;
