
function ListLayout({children} : {children: React.ReactNode}) {
    return (
        <div className="list-group">
            {children}
        </div>
    );
}
export default ListLayout;