"use client";
import { useEffect, useState } from "react";
import { useGetBook } from "@/hooks/useGetBook";
import Image from "next/image";
import { useWallet } from "@mintbase-js/react";
import { useRouter } from "next/navigation";
import { useApp } from "@/providers/app";
import BuyModal from "@/components/buy-modal/BuyModal"

export default function BookDetails({ params }: { params: { slug: string } }) {
  const [error, setError] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [bookData, setBookData] = useState<any>({});
  const [isPageLoading, setIsPageLoading] = useState(true)
  const { activeAccountId, isConnected } = useWallet()
  const { push } = useRouter();
  const { openModal } = useApp();



  // get book data
  const args = {
    accountId: "", // this uses the gql query without the accountId filter
    metadataId: params.slug
  }

  const { data, isLoading } = useGetBook(args);

  const handleError = () => {
    setError(true);
  };

  const handleCloseBuyModal = () => {
    setShowBuyModal(false);
  };

  const handleBuy = (metadataId: string) => {
    setShowBuyModal(true);
  }


  useEffect(() => {
    if (data || !isLoading) {
      setIsPageLoading(false)
      setBookData(data?.data?.book[0])
    }
  }, [data, isLoading])

  // display a loading UI
  if (isPageLoading) {
    return <>Loading</> // @TODO: replace with nicer looking loading screen OR use the Next13 loading API?
  }

  // exit if the user isn't logged in
  if (!isConnected) {
    openModal("default");
    return <></>;
  } 

  return (<main className="px-4 lg:px-12 mx-auto flex flex-col items-center justify-center space-y-4">
    <h2 className="mt-[72px]">{bookData.title} </h2>
    <div>
      <div>
        <Image
          key={params.slug}
          src={bookData.media}
          alt={`Book ${bookData.title}`}
          className="object-cover h-full w-full"
          width={320}
          height={320}
          quality={70}
          priority={true}
          onError={handleError}
          placeholder="empty"
        />
      </div>
      <p>{bookData.description}</p>
      <button onClick={() => handleBuy(bookData.metadata_id)}>Buy</button>
    </div>
    <div className="mx-24 mt-4">
        {!!showBuyModal && (
          <BuyModal closeModal={handleCloseBuyModal} item={{metadataId: bookData.metadata_id}} />
        )}
      </div>
  </main>
  );
}