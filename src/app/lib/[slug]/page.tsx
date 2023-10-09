"use client";
import { useState } from "react";
import { useGetBook } from "@/hooks/useGetBook";
import Image from "next/image";


export default function BookDetails({ params }: { params: { slug: string } }) {
  const [error, setError] = useState(false);

  // get book data
  const args = {
    accountId: "dafeengineer.testnet", // @TODO: replace with whatever account is signed in
    metadataId: params.slug
  }

  const handleError = () => {
    setError(true);
  };
  
  const {data, isLoading} = useGetBook(args)

  if(isLoading) {
    return <>Loading</> // @TODO: replace with nicer looking loading screen OR use the Next13 loading API?
  }

  const bookData = data.data.book[0]

  return (<>
  <h2 className="mt-[72px]">{bookData.title} | Details</h2>
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
    <button onClick={() => window.alert("reading book")}>read</button>
  </div>
  </>);
}