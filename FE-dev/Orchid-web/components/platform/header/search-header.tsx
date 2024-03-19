"use client";

import { Hash, Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { IAuction } from "@/types/dashboard";
import { useSearchParams } from "next/navigation";

export const ServerSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [auctions, setAuctions] = useState<IAuction[]>([]);
  const [filteredAuctions, setFilteredAuctions] = useState<IAuction[]>([]);
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";

  useEffect(() => {
    setSearchQuery(initialSearch);
  }, [initialSearch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://orchid.fams.io.vn/api/v1/auctions/list?search=${searchQuery}`
        );
        const data = await response.json();
        setAuctions(data.payload.content);
      } catch (error) {
        console.error("Error fetching auctions:", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  useEffect(() => {
    const filtered = auctions.filter((auction) =>
      auction.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAuctions(filtered);
  }, [auctions, searchQuery]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-x-1 px-2 py-2
                         w-full bg-gray-200 rounded-md border border-gray-300 hover:bg-gray-100 transition group "
      >
        <Search className="h-4 w-4 text-gray-500 group-hover:text-gray-400" />
        <p className="text-sm text-gray-500 group-hover:text-gray-400 transition">
          Search
        </p>
        <kbd className="ml-auto pointer-events-none inline-flex items-center gap-1 bg-gray-100 rounded border font-mono px-1.5 text-gray-500 group-hover:text-gray-400">
          <span className="text-xs">&#8984;</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="KAO ĐANG TO DO cái này nhé ....."
          value={searchQuery}
          onValueChange={setSearchQuery}
        />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {filteredAuctions.map((auction) => (
            <CommandItem key={auction.id}>
              <Hash className="w-4 h-4 mr-2" />
              <span>{auction.title}</span>
            </CommandItem>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};
