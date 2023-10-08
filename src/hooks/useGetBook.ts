import { useGraphQlQuery } from "@/data/useGraphQlQuery";
import { constants } from "@/constants";

/* 
query MyQuery {
  books: mb_views_nft_tokens(
    where: {nft_contract_id: {_eq: "bookpublisher.mintspace2.testnet"}, metadata_id: {_eq: "bookpublisher.mintspace2.testnet:8200f898689a761ba6d025c49af05a11"}}
  ) {
    id: token_id
    title
    owner
    nft_contract_id
    metadata_id
    copies
    nft_contract_owner_id
  }
}

*/

const FetchBookQuery = `
  query FetchBook($accountId: String, $contractAddress: String, $metadataId: String) @cached {
    book: mb_views_nft_tokens(
      where: { owner: {_eq: $accountId},  nft_contract_id: { _eq: $contractAddress }, metadata_id: {_eq: $metadataId} }
      limit: 1
    ) {
        id: token_id
        media
        title
        description
        metadata_id
        attributes {
            attribute_display_type
            attribute_value
        } 
    }
  }
`;

export const useGetBook = (props: any) => {
    const { accountId, metadataId } = props;
    const fullMetadataId = constants.tokenContractAddress + ":" + metadataId
    const queryObj = {
        queryName: "q_FetchBook",
        query: FetchBookQuery,
        variables: { accountId: accountId, contractAddress: constants.tokenContractAddress, metadataId:  fullMetadataId },
        queryOpts: { staleTime: Infinity },
      };

    const {
        data,
        isLoading,
        isFetching,
        refetch: refetchNfts,
      } = useGraphQlQuery(queryObj);
      
    let bookData: any = []
    
    // if(data && !isLoading) {
    //     bookData = data.book[0]
    // }

    return {data, isLoading}
}

 