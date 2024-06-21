import { Outlet } from "react-router-dom"

const Layout = () => {
    return (
        <main className="App" style={{height:'100%'}}>
            <Outlet />
        </main>
    )
}

export default Layout
