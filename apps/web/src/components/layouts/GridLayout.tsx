
function GridLayout({children} : {children: React.ReactNode}) {
    return (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {children}
        </div>
    );
}

export default GridLayout;