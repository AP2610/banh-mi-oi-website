import '../../styles/globals.css';

type StudioLayoutProps = {
    children: React.ReactNode;
};

const StudioLayout = ({ children }: StudioLayoutProps) => (
    <html lang="en">
        <body>{children}</body>
    </html>
);

export default StudioLayout;
