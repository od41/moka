"use client";

import { useState, useEffect } from "react";
import { useMyBooks } from "@/hooks/useMyBooks";
import { constants } from "@/constants";
import { useWallet } from "@mintbase-js/react";
import { PageTemplate } from "@/components/pages/page-template";

export default function Library() {
  const { activeAccountId } = useWallet()
  const {
    data,
    isLoading: isDataLoading,
    isFetching,
    refetchBooks,
  } = useMyBooks({ accountId: activeAccountId, contractAddress: constants.tokenContractAddress });


  useEffect(() => {
    refetchBooks();
  }, [activeAccountId]);


  if (isDataLoading) {
    return <>Loading...</>
  }

  return (<>
    <PageTemplate
      title="My Books"
      data={data}
      isLoading={isDataLoading}
      isOwned={true}
    />
  </>);
}