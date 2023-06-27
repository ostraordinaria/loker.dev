import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { type ReactNode, useEffect } from "react";
import { PageLoading } from "./PageLoading";

const Authenticated = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user || status !== "authenticated") {
      return router.push("/");
    }
  }, [session, status, router, pathname]);

  if (status === "loading") {
    return <PageLoading />;
  }

  return <>{children}</>;
};

export default Authenticated;
