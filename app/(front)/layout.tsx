export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex-grow container px-4">{children}</main>;
}
