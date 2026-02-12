export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-lavender-50">
      {children}
    </div>
  );
}
