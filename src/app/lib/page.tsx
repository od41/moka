"use client";

import { DynamicGrid } from "@/components/DynamicGrid";
import { MemoizedBookThumb } from "@/components/feed/BookThumb";
import { useMyBooks } from "@/hooks/useMyBooks";
import { constants } from "@/constants";

export default function Library() {
  
  const  {
    data,
    isLoading: isDataLoading,
    isFetching,
    refetchNfts,
  } = useMyBooks({accountId: constants.proxyContractAddress, contractAddress: constants.tokenContractAddress})

  return (<>
  <main className="px-4 lg:px-12 mx-auto flex flex-col items-center justify-center space-y-4 ">
  <h2 className="mt-20">My Books</h2>
  <DynamicGrid mdCols={2} nColsXl={4} nColsXXl={6}>
  {data?.length > 0 &&
            data.map((token: any, index: number) => {
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
  </>);
}