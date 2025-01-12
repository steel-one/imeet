// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               v5.27.3
// source: payment.proto

/* eslint-disable */
import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export const protobufPackage = 'payment';

export interface Payment {
  id: string;
  name: string;
  userId: string;
  eventId: string;
  amount: number;
}

export interface ListReq {
  ids: string[];
  search?: string | undefined;
  paginate?: Paginate | undefined;
  orderBy?: Order | undefined;
}

export interface Paginate {
  page?: number | undefined;
  perPage?: number | undefined;
}

export interface Order {
  sort?: string | undefined;
  order?: string | undefined;
  nulls?: string | undefined;
}

export interface ListRes {
  list: Payment[];
  totalCount: number;
}

export interface OneReq {
  id: string;
}

export interface OneRes {
  payment: Payment | undefined;
}

export interface PaymentGrpcService {
  list(request: ListReq, metadata?: Metadata): Observable<ListRes>;
  one(request: OneReq, metadata?: Metadata): Observable<OneRes>;
  create(request: Payment, metadata?: Metadata): Observable<Payment>;
  update(request: Payment, metadata?: Metadata): Observable<Payment>;
}
