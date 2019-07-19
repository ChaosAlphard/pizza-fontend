"use strict"

type Pizza = {
  id: number,
  name: string,
  pictureLink: string,
  picturePreLink: string,
  priceSmall: number|string,
  priceBig: number|string,
  description: string|null
}

type BasketItem = {
  id: number,
  name: string,
  amount: number,
  size: string,
  price: number
}

type ToBeAddPizza = {
  name: string,
  pictureLink: string,
  picturePreLink: string,
  priceSmall: number|string,
  priceBig: number|string,
  description: string|null
}

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  level: number;
}

type ZoomPlugin = {
  imgCover: Element|null;
  hiddenImg: Element|null;
  init: Function;
  watch: Function;
  unwatch: Function;
  watchError: Function;
  unwatchError: Function;
  discard: Function;
}