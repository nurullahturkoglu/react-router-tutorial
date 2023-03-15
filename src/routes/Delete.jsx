import React from "react";
import { useLoaderData, redirect } from "react-router-dom";
import { deleteContact } from "../contacts";

export async function action({ request, params }) {
  await deleteContact(params.contactId);
  return redirect(`/`);
}

function Delete() {
  const { contact } = useLoaderData();

  return <div>Deleted {contact}</div>;
}

export default Delete;
