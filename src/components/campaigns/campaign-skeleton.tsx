export function CampaignSkeleton() {
  return (
    <div className="flex flex-col gap-6 rounded-[30px] border border-[#E0E0E0] bg-white p-5 animate-pulse">
      <div className="h-[240px] w-full rounded-[20px] bg-gray-200" />
      <div className="flex flex-col gap-4">
        <div className="h-6 w-3/4 rounded bg-gray-200" />
        <div className="flex gap-2">
          <div className="h-6 w-24 rounded-full bg-gray-200" />
          <div className="h-6 w-32 rounded-full bg-gray-200" />
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-20 rounded bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
        </div>
        <div className="h-3 w-full rounded-full bg-gray-200" />
        <div className="flex justify-between">
          <div className="h-4 w-12 rounded bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
