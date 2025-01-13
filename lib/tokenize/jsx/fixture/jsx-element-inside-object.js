createBrowserRouter([{
    path: '/',
    element: <Home/>,
}, {
    path: 'dashboard/*',
    element: <Dashboard/>,
}]);