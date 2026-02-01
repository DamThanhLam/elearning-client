import TeacherSidebar from "@/components/teachers/Sidebar";

const layout: React.FC<Readonly<{children: React.ReactNode}>> = ({ children }) => {
    return (
        <>
            <div className="d-flex">
                <TeacherSidebar/>
                <div className="p-3 flex-grow-1 overflow-auto hide-scrollbar" style={{height: '100vh'}}>
                    {children}
                </div>
            </div>
        </>
    );
};

export default layout;