<Routes>
    <Route path="/" element={<Home/>}/>
    <Route path='dashboard'>
        <Route path='*' element={<Dashboard/>}/>
    </Route>
</Routes>;

const b = (
    <Hello>
        <Controller
            render={({field}) => {
                const {value, onChange} = fieldset;
                
                return (
                    <CustomInput name={name} onChange={onChange}/>
                );
            }}
            rules={rules}
            name={name}
        />
    </Hello>
);