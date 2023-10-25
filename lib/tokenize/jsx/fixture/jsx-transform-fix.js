const a = (
    <Controller render={({field}) => {
        const {value, onChange} = field;
        return (
            <CustomInput onTextChange={onChange} onBlur={onBlur} textValue={value}/>
        );
    }} control={control} name="test"/>
);
