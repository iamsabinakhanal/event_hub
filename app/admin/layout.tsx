import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex w-full min-h-screen bg-background">
            <div className="page-wrapper flex w-full">
                {/* Sidebar */}
                <div className="hidden xl:block">
                    <Sidebar />
                </div>

                <div className="w-full">
                    {/* Header */}
                    <Header />

                    {/* Main Content */}
                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
