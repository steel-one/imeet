// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.181.2
//   protoc               v5.27.3
// source: event.proto

/* eslint-disable */
import { Metadata } from '@grpc/grpc-js';
import { Observable } from 'rxjs';

export const protobufPackage = 'event';

export interface Event {
  id: string;
  name: string;
  start: Date | undefined;
  end: Date | undefined;
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
  list: Event[];
  totalCount: number;
}

export interface OneReq {
  id: string;
}

export interface OneRes {
  event: Event | undefined;
}

export interface EventGrpcService {
  list(request: ListReq, metadata?: Metadata): Observable<ListRes>;
  one(request: OneReq, metadata?: Metadata): Observable<OneRes>;
  create(request: Event, metadata?: Metadata): Observable<Event>;
  update(request: Event, metadata?: Metadata): Observable<Event>;
}
