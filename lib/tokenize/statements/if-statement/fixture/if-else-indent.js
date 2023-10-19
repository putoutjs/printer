function c() {
    const _ = Cookies.get('theme') ?? 'dark';
    
    if (_ === 'dark') {
        Cookies.set('theme', 'light');
        B();
    } else if (_ === 'light') {
        Cookies.set('theme', 'dark');
        B();
    }
}