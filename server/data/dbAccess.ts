import { driver } from "..";
import { Owned, Phone } from "../../common/validation";
import { Person, Review } from "../../common/Types";
import type { Integer, Node } from "neo4j-driver";
import { IPhonePriceRelationship, RNode } from "../Types";

const getSingleNodeType = async <
  T extends {},
  TNode extends { [key: string]: Node<Integer, T> }
>(
  query: string,
  nodeReturnName: keyof TNode
) => {
  const session = driver.session();
  try {
    const { records } = await session.executeRead((tx) => tx.run<TNode>(query));

    const res: T[] = records.map((r) => ({
      ...r.get(nodeReturnName).properties,
      id: r.get(nodeReturnName).elementId,
    }));
    return res;
  } catch (err) {
    console.error(err);
  } finally {
    await session.close();
  }
};

const getDoubleNodeType = async <
  R extends {},
  T extends R,
  TNode extends { [key: string]: Node<Integer, T> }
>(
  query: string,
  tNodeReturnName: string,
  rNodeReturnName: string
) => {
  const session = driver.session();
  try {
    const { records } = await session.executeRead((tx) => tx.run<TNode>(query));

    const recs: T[] = records.map((r) => {
      return {
        ...r.get(tNodeReturnName).properties,
        ...r.get(rNodeReturnName).properties,
        id: r.get(tNodeReturnName).elementId,
      };
    });

    return recs;
  } catch (err) {
    console.error(err);
  } finally {
    await session.close();
  }
};

const getFullRelationship = async <T extends {}, U extends {}, V extends {}>(
  query: string,
  filter: T
) => {
  const session = driver.session();
  try {
    const { records } = await session.executeRead((tx) =>
      tx.run<RNode<T, U, V>>(query, filter)
    );

    const res: Partial<{
      f: T[];
      r: U[];
      s: V[];
    }> = {};

    res.f = records.map((r) => r.get("f").properties);
    res.r = records.map((r) => r.get("r").properties);
    res.s = records.map((r) => r.get("s").properties);

    return res;
  } catch (err) {
    console.error(err);
  } finally {
    await session.close();
  }

  return null;
};

const addNode = async <T>(query: string, p: T) => {
  const session = driver.session();
  try {
    await session.executeWrite((tx) => tx.run(query, { ...p }));

    return true;
  } catch (err) {
    console.error(err);
  } finally {
    await session.close();
  }

  return false;
};

const addNodeWithRelationshipExisting = async <T extends {}>(
  query: string,
  params: T
) => {
  const session = driver.session();
  try {
    await session.executeWrite((tx) => tx.run(query, { ...params }));

    return true;
  } catch (err) {
    console.error(err);
  } finally {
    await session.close();
  }

  return false;
};

const addNodeWithRelationshipsBothExisting = async <T extends {}, R extends {}>(
  query: string,
  paramsFrom: T,
  paramsTo: R
) => {
  const session = driver.session();
  try {
    await session.executeWrite((tx) =>
      tx.run(query, { ...paramsFrom, ...paramsTo })
    );

    return true;
  } catch (err) {
    console.error(err);
  } finally {
    await session.close();
  }

  return false;
};

const editNode = async <T extends {}>(query: string, obj: T) => {
  const session = driver.session();
  try {
    await session.executeWrite((tx) => {
      tx.run(query, obj);
    });

    return true;
  } catch (err) {
    console.error(err);
  } finally {
    session.close();
  }
};

const deleteRelationship = async <T extends {}>(query: string, params: T) => {
  const session = driver.session();
  try {
    await session.executeWrite((tx) => {
      tx.run(query, params);
    });

    return true;
  } catch (err) {
    console.error(err);
  } finally {
    await session.close();
  }
};

export const getPhones = async () => {
  return await getSingleNodeType<Phone, { p: Node<Integer, Phone> }>(
    "MATCH(p:PHONE) RETURN p",
    "p"
  );
};

export const getPeople = async () => {
  return await getSingleNodeType<Person, { p: Node<Integer, Person> }>(
    "MATCH(p:PERSON) RETURN p",
    "p"
  );
};

export const getPhonePicker = async () => {
  return await getSingleNodeType<
    Required<Pick<Phone, "id" | "make" | "model">>,
    { p: Node<Integer, Required<Pick<Phone, "id" | "make" | "model">>> }
  >("MATCH(p:PHONE) RETURN p", "p");
};

export const addPhone = async (p: Phone) => {
  return await addNode(
    `CREATE (p:PHONE{image:$image, description:$description, model:$model,make:$make}) RETURN "Created";`,
    p
  );
};

export const addReview = async (p: Person, r: Review) => {
  const params = {
    ...p,
    ...r,
  };

  return await addNodeWithRelationshipExisting(
    `MATCH(p:PERSON{name:$name, surname:$surname}) MATCH(ph:PHONE) WHERE elementId(ph) = $phoneId
     CREATE (p)<-[r:REVIEW{rating:$rating, description:$description}]-(ph)
     RETURN r`,
    params
  );
};

export const getAllUserReviews = async (p: Person) => {
  return await getFullRelationship<Person, Review, Phone>(
    `MATCH(f:PERSON{name:$name,surname:$surname}) <-[r:REVIEW]-(s:PHONE)
     RETURN f,r,s`,
    p
  );
};

export const addPhoneBuy = async (o: Owned) => {
  return await addNodeWithRelationshipsBothExisting(
    `MATCH(p:PERSON{name:$name, surname:$surname}) MATCH(ph:PHONE{make:$make,model:$model})
     CREATE(p)-[:HAS_BOUGHT{price:$price}]->(ph)
     RETURN p;`,
    o.person,
    {
      ...o.owned,
      ...o.phone,
    }
  );
};

export const getSinglePhone = async (id: string) => {
  return await getSingleNodeType(
    `
    MATCH(p:PHONE)
    WHERE ELEMENTID(p) = "${id}"
    RETURN p
  `,
    "p"
  );
};

export const editSinglePhone = async (ph: Phone) => {
  return await editNode(
    `
    MATCH(p:PHONE)
    WHERE ELEMENTID(p)= $id
    SET p.description = $description, p.make = $make,
    p.model = $model, p.image = $image
    RETURN p
  `,
    ph as Omit<Phone, "id">
  );
};

export const getBoughtPhones = async (
  personName: string,
  personSurname: string
) => {
  return await getDoubleNodeType<
    Phone,
    IPhonePriceRelationship,
    { ph: Node<Integer, IPhonePriceRelationship> }
  >(
    `
    MATCH(:PERSON{name:"${personName}",surname:"${personSurname}"})-[h:HAS_BOUGHT]->(ph:PHONE)
    RETURN h, ph;`,
    "ph",
    "h"
  );
};

export const deleteBoughtPhone = async (person: Person) => {
  return await deleteRelationship(
    `
    MATCH(:PERSON{name:$name, surname: $surname})-[h:HAS_BOUGHT]->(ph)
    WHERE ELEMENTID(ph) = $id
    DELETE h
    RETURN h;
  `,
    person
  );
};
