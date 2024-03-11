"use client";

import { vendorData } from "@/data/user-working-data/listing-details";

import { Button } from "@/components/ui/button";
import ListingDetailsHeroBlock from "./hero-block";
import { Input } from "@/components/ui/input";
import { IAuction } from "@/types/dashboard";
import { useModal } from "@/hooks/use-modal";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { number } from "zod";
interface ListingDetailsProps {
  auction: IAuction | null;
}
export default function ListingDetails({ auction }: ListingDetailsProps) {
  const { onOpen } = useModal();
  const [bidAmount, setBidAmount] = useState<number | null>(null);

  const { data: session } = useSession();

  // console.log(auction?.bidList);
  // console.log(auction);

  const isRegisterAuction = auction?.bidList.some(
    (item) => item.userID.toString() === session?.user.id
  );

  const isStatusComing = auction?.status === "COMING";
  const isStatusLive = auction?.status === "LIVE";

  const canBid = isRegisterAuction && isStatusLive;

  console.log(isRegisterAuction);

  const handleBidAmountChange = (value: number | null) => {
    setBidAmount(value);
  };

  const handlePlaceBid = () => {
    if (canBid && bidAmount !== null) {
      // Xử lý đặt giá với bidAmount
      console.log(`Đặt giá: ${bidAmount}`);
    }
  };
  return (
    <>
      <div className="flex justify-between gap-5 lg:gap-8 xl:gap-12 4xl:gap-16">
        <div className="w-full">
          {!isRegisterAuction && isStatusComing && (
            <Button
              variant="primary"
              onClick={() => onOpen("registerAtendAction", {auction})}
              className="mt-6"
            >
              Open Register Auction
            </Button>
          )}

          {!isRegisterAuction && isStatusLive && (
            <div>Đã quá hạn đăng kí đấu giá</div>
          )}
          <ListingDetailsHeroBlock
            vendor={vendorData.vendor}
            auction={auction}
          />

          <div className=" bg-slate-200 h-[150px] p-4 rounded-md">
            <h1>Bind now</h1>
            <p>Bid Amount : Minimum Bid $20.00</p>

            <div className="flex items-center space-x-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">$</span>
                </div>
                <Input
                  type="number"
                  placeholder="00.00"
                  className="bg-gray-100 text-gray-700 placeholder-gray-400 rounded-lg py-3 pl-8 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  onChange={(e) =>
                    handleBidAmountChange(parseFloat(e.target.value))
                  }
                  disabled={!canBid}
                />
              </div>
              <Button
                onClick={handlePlaceBid}
                disabled={!canBid}
                className="bg-indigo-500 text-white py-3 px-6 rounded-lg hover:bg-indigo-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Place Bid
              </Button>
            </div>

            <div className="mt-4">
              <Button
                onClick={() => handleBidAmountChange(20)}
                disabled={!canBid}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Raise by Default ($20)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
