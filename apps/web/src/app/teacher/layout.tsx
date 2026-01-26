import Footer from "@/components/Footer";
import TeacherSidebar from "@/components/teachers/Sidebar";

const layout: React.FC<Readonly<{children: React.ReactNode}>> = ({ children }) => {
    return (
        <>
            <div className="d-flex">
                <TeacherSidebar/>
                <div className="p-2">
                    {children}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default layout;