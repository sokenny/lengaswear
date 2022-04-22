import { NextPage } from "next";
export type NextPageAugmented<P = {}, IP = P> = NextPage<P, IP> & {
    nav?: React.ReactNode,
    footer?: React.ReactNode
};
  