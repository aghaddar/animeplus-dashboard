import { Skeleton } from "@/components/ui/skeleton"

export default function LoginLoading() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-6 p-6">
        <Skeleton className="h-8 w-[180px] mx-auto" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}
