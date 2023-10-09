"use client";
import { useState } from "react";
import { useGetBook } from "@/hooks/useGetBook";
import { EpubReader } from "@/components/epub-reader";


export default function BookReader({ params }: { params: { slug: string } }) {
  const [error, setError] = useState(false);

  // get book data
  const args = {
    accountId: "dafeengineer.testnet", // @TODO: replace with whatever account is signed in
    metadataId: params.slug
  }
  
  // check if account owns this book or has access in other ways, else, revert
  
  const {data, isLoading} = useGetBook(args)

  if(isLoading) {
    return <>Loading</> // @TODO: replace with nicer looking loading screen OR use the Next13 loading API?
  }

  const bookData = data.data.book[0]

  return (<>
    <EpubReader url={"https://react-reader.metabits.no/files/alice.epub"} title="Alice in wonderland" />
  </>);
}