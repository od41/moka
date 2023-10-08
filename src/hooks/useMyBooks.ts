import { useMemo } from "react";
import { useGraphQlQuery } from "@/data/useGraphQlQuery";

export const MY_BOOKS_FETCH_FEED = `
  query minsta_fetch_feed_minted_tokens(
    $accountId: String!
    $contractAddress: String
    $offset: Int
  ) {
    token: mb_views_nft_tokens(
      where: {
        minter: { _eq: $accountId }
        nft_contract_id: { _eq: $contractAddress }
        burned_timestamp: { _is_null: true }
        metadata_content_flag: { _is_null: true }
        nft_contract_content_flag: { _is_null: true }
      }
      order_by: { minted_timestamp: desc },
       offset: $offset,
    ) {
      id: token_id
      createdAt: minted_timestamp
      media
      title
      description
      metadata_id
      attributes {
        attribute_display_type
        attribute_value
      } 
    }
    mb_views_nft_tokens_aggregate(where: {minter: {_eq: $accountId}, nft_contract_id: {_eq: $contractAddress}, burned_timestamp: {_is_null: true}}) {
      aggregate {
      count
      }
    }
  }
`;

const useMyBooks = (props: any) => {
  const { accountId, contractAddress } = props;

  const queryObj = {
    queryName: "q_FETCH_FEED",
    query: MY_BOOKS_FETCH_FEED,
    variables: { accountId, contractAddress, offset: 49 },
    queryOpts: { staleTime: Infinity },
  };

  const {
    data,
    isLoading,
    isFetching,
    refetch: refetchNfts,
  } = useGraphQlQuery(queryObj);

  const memoizedData = useMemo(() => {
    const uniqueMetadataIds = new Set<string>();

    const filteredData =  data?.data?.token?.filter((token: any) => {
      if (uniqueMetadataIds.has(token.metadata_id)) {
        return false;
      }

      uniqueMetadataIds.add(token.metadata_id);

      return true;
    });

    return filteredData;
  }, [data]);

  return {
    data: memoizedData,
    isLoading,
    isFetching,
    refetchNfts,
  };
};

export { useMyBooks };
