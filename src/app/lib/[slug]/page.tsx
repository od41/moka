"use client";
import { useEffect, useState } from "react";
import { useGetBook } from "@/hooks/useGetBook";
import Image from "next/image";
import { useWallet } from "@mintbase-js/react";
import { useRouter } from "next/navigation";
import { useApp } from "@/providers/app";

export default function BookDetails({ params }: { params: { slug: string } }) {
  const [error, setError] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true)
  const {activeAccountId, isConnected } = useWallet()
  const { push } = useRouter();
  const { openModal } = useApp();

  // exit if the user isn't logged in
  // if(!isConnected) {
  //   openModal("default");
  //   return null;    
  // }

  // get book data
  const args = {
    accountId: isConnected ? activeAccountId : "",
    metadataId: params.slug
  }

  const {data, isLoading} = useGetBook(args);

  const handleError = () => {
    setError(true);
  };
  

  useEffect(() => {
    if(data || !isLoading) {
      setIsPageLoading(false)
    }
  }, [data, isLoading])

  

  if(isPageLoading) {
    return <>Loading</> // @TODO: replace with nicer looking loading screen OR use the Next13 loading API?
  }

  const bookData = data.data.book[0]

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
    <button onClick={() => push(`/lib/${params.slug}/read`)}>read</button>
  </div>
  </main>);
}