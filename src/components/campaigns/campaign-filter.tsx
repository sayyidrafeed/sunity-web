import * as React from "react";
import { useSearchParams } from "react-router";
import { Search, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import { INDONESIA_CITIES } from "@/data/cities";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RUMAH_IBADAH_OPTIONS = [
  "Masjid",
  "Mushalla",
  "Gereja Katolik",
  "Gereja Kristen",
  "Pura",
  "Vihara",
  "Klenteng",
];

const STATUS_OPTIONS = ["Aktif", "Berhasil"];

export function CampaignFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Local state for debounced inputs
  const [searchValue, setSearchValue] = React.useState(
    searchParams.get("q") || "",
  );
  const [isCityPopoverOpen, setIsCityPopoverOpen] = React.useState(false);

  const debouncedSearchValue = useDebounce(searchValue, 300);

  // Sync debounced search to URL
  React.useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (debouncedSearchValue) {
      newParams.set("q", debouncedSearchValue);
    } else {
      newParams.delete("q");
    }
    newParams.delete("page");
    setSearchParams(newParams, { replace: true });
  }, [debouncedSearchValue, searchParams, setSearchParams]);

  const handleSelectChange = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.delete("page");
    setSearchParams(newParams, { replace: true });
  };

  const handleCitySelect = (city: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (city) {
      newParams.set("kota", city);
    } else {
      newParams.delete("kota");
    }
    newParams.delete("page");
    setSearchParams(newParams, { replace: true });
    setIsCityPopoverOpen(false);
  };

  return (
    <div className="flex w-full items-center gap-[11px] py-4">
      <span className="font-jakarta text-lg font-medium text-brand-gray shrink-0">
        Browse By
      </span>

      {/* Rumah Ibadah Dropdown */}
      <Select
        value={searchParams.get("rumah_ibadah") || "all"}
        onValueChange={(v) => handleSelectChange("rumah_ibadah", v)}
      >
        <SelectTrigger className="flex h-[38px] w-auto min-w-[160px] items-center gap-2.5 rounded-full border border-[#DDD] bg-white px-4 py-1.5 shadow-[0_14px_37.8px_0_rgba(54,53,53,0.10)] transition-all focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2">
          <SelectValue placeholder="Rumah Ibadah" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Rumah Ibadah</SelectItem>
          {RUMAH_IBADAH_OPTIONS.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Kota Combobox */}
      <Popover open={isCityPopoverOpen} onOpenChange={setIsCityPopoverOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isCityPopoverOpen}
            className="flex h-[38px] w-auto min-w-[120px] items-center justify-between gap-2.5 rounded-full border border-[#DDD] bg-white px-4 py-1.5 font-normal text-brand-text shadow-[0_14px_37.8px_0_rgba(54,53,53,0.10)] transition-all hover:bg-white focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
          >
            {searchParams.get("kota") || "Kota"}
            <ChevronDown
              className={cn(
                "ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform duration-200",
                isCityPopoverOpen && "rotate-180",
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Cari kota..." />
            <CommandList>
              <CommandEmpty>Kota tidak ditemukan.</CommandEmpty>
              <CommandGroup>
                <CommandItem value="all" onSelect={() => handleCitySelect("")}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      !searchParams.get("kota") ? "opacity-100" : "opacity-0",
                    )}
                  />
                  Semua Kota
                </CommandItem>
                {INDONESIA_CITIES.map((city) => (
                  <CommandItem
                    key={city}
                    value={city}
                    onSelect={() => handleCitySelect(city)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        searchParams.get("kota") === city
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {city}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Status Dropdown */}
      <Select
        value={searchParams.get("status") || "all"}
        onValueChange={(v) => handleSelectChange("status", v)}
      >
        <SelectTrigger className="flex h-[38px] w-auto min-w-[120px] items-center gap-2.5 rounded-full border border-[#DDD] bg-white px-4 py-1.5 shadow-[0_14px_37.8px_0_rgba(54,53,53,0.10)] transition-all focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Status</SelectItem>
          {STATUS_OPTIONS.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Search Input */}
      <div className="relative flex-1">
        <Input
          type="text"
          placeholder="Cari Kampanye..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="h-[44px] w-full rounded-full border border-[#DDD] bg-white pl-5 pr-12 shadow-[0_14px_37.8px_0_rgba(54,53,53,0.10)] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-2"
        />
        <Search className="absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-text" />
      </div>
    </div>
  );
}
