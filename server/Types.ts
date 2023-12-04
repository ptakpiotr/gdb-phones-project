import { Node, Relationship, Integer } from "neo4j-driver";
import { Phone } from "../common/validation";

export type RNode<T extends {}, U extends {}, V extends {}> = {
  f: Node<Integer, T>;
  r: Relationship<Integer, U>;
  s: Node<Integer, V>;
};

export interface IPriceRelationship {
  price: number;
}

export interface IPhonePriceRelationship extends Phone, IPriceRelationship {}
