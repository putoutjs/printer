<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path='dashboard'>
        <Route path='*' element={<Dashboard/>}/>
    </Route>
</Routes>;