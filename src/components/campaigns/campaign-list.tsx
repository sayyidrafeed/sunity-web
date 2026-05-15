import { useSearchParams } from "react-router";
import { CampaignCard } from "./campaign-card";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { MOCK_CAMPAIGNS } from "@/data/mock-campaigns";

export function CampaignList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") ?? "1", 10);

  // Filter Logic
  const q = searchParams.get("q")?.toLowerCase() ?? "";
  const rumahIbadah = searchParams.get("rumah_ibadah");
  const kota = searchParams.get("kota");
  const status = searchParams.get("status");

  const filteredCampaigns = MOCK_CAMPAIGNS.filter((campaign) => {
    const matchesSearch =
      campaign.title.toLowerCase().includes(q) ||
      campaign.worshipPlace.name.toLowerCase().includes(q);
    const matchesRumahIbadah =
      !rumahIbadah ||
      campaign.worshipPlace.religionType.toLowerCase() ===
        rumahIbadah.toLowerCase() ||
      campaign.worshipPlace.name
        .toLowerCase()
        .includes(rumahIbadah.toLowerCase());
    const matchesKota =
      !kota || campaign.worshipPlace.city.toLowerCase() === kota.toLowerCase();
    const matchesStatus = !status || status === "all" || status === "Aktif"; // Mock: all are 'Aktif'

    return matchesSearch && matchesRumahIbadah && matchesKota && matchesStatus;
  });

  const totalCampaigns = filteredCampaigns.length;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalCampaigns / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalCampaigns);
  const paginatedCampaigns = filteredCampaigns.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      prev.set("page", page.toString());
      return prev;
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilter = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <section className="mt-12 flex flex-col gap-8 pb-20">
      <div className="flex flex-col gap-2">
        <h2 className="font-outfit text-2xl font-bold text-brand-text">
          Kampanye Aktif
        </h2>
        <div className="h-px w-full bg-[#DDD]" />
      </div>

      {filteredCampaigns.length > 0 ? (
        <>
          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {paginatedCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex flex-col items-end gap-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
            <span className="text-[12px] font-medium text-slate-400">
              Menampilkan {(startIndex + 1).toLocaleString("id-ID")}-
              {endIndex.toLocaleString("id-ID")} dari{" "}
              {totalCampaigns.toLocaleString("id-ID")} Kampanye
            </span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <img
            src="/404-dashboard.avif"
            alt="Belum Ada Kampanye"
            className="h-auto w-[240px] object-contain"
          />
          <div className="mt-8 flex flex-col gap-2">
            <h3 className="font-outfit text-2xl font-bold text-brand-text">
              Belum Ada Kampanye yang Sesuai
            </h3>
            <p className="font-jakarta text-brand-gray">
              Coba gunakan kata kunci lain atau ubah filter pencarian.
            </p>
          </div>
          <Button
            onClick={handleResetFilter}
            className="mt-8 h-10 rounded-full bg-brand-green px-8 text-sm font-semibold text-white transition-all hover:bg-brand-green/90"
          >
            Reset Filter
          </Button>
        </div>
      )}
    </section>
  );
}
