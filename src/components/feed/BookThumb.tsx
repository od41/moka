"use client";

import React, { useEffect, useState } from "react";
import { constants } from "@/constants";

import Image from "next/image";
import Link from "next/link";
import { removeItemsBeforeColon } from "@/utils/removeItemsBeforeColon";

import { parseYoctoToNear } from "@/lib/numbers";
import { useNearPrice } from "@mintbase-js/react";

interface BookThumbProps {
  token: any;
  index: number;
  isOwned?: boolean;
}

const BookThumb = ({ token, index, isOwned=false }: BookThumbProps) => {
  const imageUrl = token?.media;
  const {title, description, createdAt, attributes} = token
  const author = attributes[0].attribute_value
  const datePublished = new Date(createdAt)
  const printAbleDate = new Intl.DateTimeFormat("en-US", {month: "short", year: "numeric"}).format(datePublished)
  const [error, setError] = useState(false);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true)
  const [bookPriceInUsd, setBookPriceInUsd] = useState("0")

  const {nearPrice, error: nearPriceError} = useNearPrice()

  useEffect(() => {
    if(nearPrice){
      const _bookPriceInUsd = parseYoctoToNear(token?.price) * nearPrice;
      setBookPriceInUsd(_bookPriceInUsd.toFixed(2))
      setIsLoadingPrice(false)
    }
  }, [nearPrice])

  const handleError = () => {
    setError(true);
  };

  if (error)
    return (
      <div className=" aspect-square flex flex-wrap	 p-10 w-72 h-72 xl:w-80 xl:h-80 relative justify-center items-center text-center bg-gray-200 w-full">
        <div>
          <h1 className="w-full"> No Image Metadata</h1>
          <p className="text-xs text-gray-600 w-full">
            There was an Error with the image.
          </p>
        </div>
      </div>
    );

  if (imageUrl) {
    return (
      <div className=" aspect-square  sm:w-full md:w-72 h-72 xl:w-80 xl:h-80 relative">
        <Link
          key={`${token?.metadata_id}-${index}`}
          href={
            isOwned ? `/library/${removeItemsBeforeColon(token?.metadata_id)}`
            : `/store/${removeItemsBeforeColon(token?.metadata_id)}`
          } // @TODO: If the book is owned, redirect to library, by default, it should go to the store view
          rel="noopener noreferrer"
          passHref
        >
          <Image
            key={token?.metadata_id}
            src={imageUrl}
            alt={`Token ${index}`}
            className="object-cover h-full w-full"
            width={320}
            height={320}
            quality={70}
            priority={index < 5}
            onError={handleError}
            placeholder="empty"
          />

          {true && <span
            className="absolute top-3 right-3 bg-black text-white rounded p-1 text-md px-2 py-1.5"
          >
            ${bookPriceInUsd} in NEAR
          </span>}
          <div>
            <h3 className="">{title}</h3>
            <p className="truncate">{description}</p>
            <small>{printAbleDate}</small>
          </div>
        </Link>
      </div>
    );
  } else {
    return null;
  }
};

export const MemoizedBookThumb = React.memo(BookThumb);
