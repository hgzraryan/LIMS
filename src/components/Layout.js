import { Outlet } from "react-router-dom"
import { Suspense } from "react"
import LoadingSpinner from "./LoadingSpinner"
const Layout = () => {
    return (
        <main className="LoadingSpinner">
            <Suspense fallback = {<LoadingSpinner />}>
                <Outlet />
            </Suspense>
        </main>
    )
}

export default Layout
