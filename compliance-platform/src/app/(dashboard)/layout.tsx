import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-slate-900">
            Compliance Platform
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">
              {session.user?.name || session.user?.email}
            </span>
            <Link
              href="/api/auth/signout"
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              Wyloguj
            </Link>
          </div>
        </div>
      </header>

      {/* Main */}
      <main>{children}</main>
    </div>
  );
}
