"use client";

import { DynamicGrid } from "@/components/DynamicGrid";
import React, { useEffect } from "react";

import { useFirstToken } from "@/hooks/useFirstToken";
import { useFeed } from "@/hooks/useFeed";
import { constants } from "@/constants";
import { FeedScroll } from "../feed/feedscroll";
import { MemoizedBookThumb } from "../feed/BookThumb";
import { useBlockedNfts } from "@/hooks/useBlockedNfts";

import { serif } from "@/app/layout";

export const StorePage = () => {
  const { newToken, tokensFetched, isLoading } = useFirstToken();
  const  {
    data,
    isLoading: isDataLoading,
    isFetching,
    refetchNfts,
  } = useFeed({accountId: constants.proxyContractAddress, contractAddress: constants.tokenContractAddress})
  
  const { blockedNfts } = useBlockedNfts();

  const firstTokenisBlocked =
    newToken?.metadata_id && blockedNfts?.includes(newToken?.metadata_id);

  useEffect(() => {
    let reloadTimeout: any;

    if (!newToken?.media) {
      reloadTimeout = setTimeout(() => {
        // Reload the page after 4 minutes (120,000 milliseconds)
        window.location.reload();
      }, 360000); //4 minutes in milliseconds
    }

    return () => {
      // Clear the timeout if the component unmounts
      clearTimeout(reloadTimeout);
    };
  }, [newToken]);

  return (
    <>
      <main className="px-4 lg:px-12 flex flex-col items-start justify-center mb-[300px] md:mb-[120px]">
        <h1 style={serif.style} className="text-[34px] mt-[5rem]">Moka Store</h1>
        <hr className="w-full mt-2 mb-6" />
        <DynamicGrid nCols={2} mdCols={2} nColsXl={4} nColsXXl={6} nGap={4} nGapMobile={8}>
          {data?.length > 0 &&
            data.map((token: any, index: number) => {
              if (!!blockedNfts && blockedNfts.includes(token?.metadata_id)) {
                return null;
              }

              return (
                <MemoizedBookThumb
                  key={token?.metadata_id}
                  token={token}
                  index={index}
                />
              );
            })}

          {/* <FeedScroll blockedNfts={blockedNfts} /> */}
        </DynamicGrid>
      </main>
    </>
  );
};
