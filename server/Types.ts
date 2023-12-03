import { Node, Relationship, Integer } from "neo4j-driver";

export type RNode<T extends {}, U extends {}, V extends {}> = {
  f: Node<Integer, T>;
  r: Relationship<Integer, U>;
  s: Node<Integer, V>;
};
