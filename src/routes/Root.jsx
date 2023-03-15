import React,{useEffect} from "react";
import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit
} from "react-router-dom";
import { createContact, getContacts } from "../contacts";

export async function loader({request}) {
  // console.log(request.url.split('?searchquery=')[1])
  const url = new URL(request.url);
  const searchquery = url.searchParams.get("searchquery");
  // console.log(searchquery)
  const contacts = await getContacts(searchquery);
  return { contacts,searchquery };
}


export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts,searchquery } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();
  useEffect(() => {
    document.getElementById("searchquery").value = searchquery;
  }, [searchquery]);
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="searchquery"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              // localhost:3000/?searchquery={input}
              name="searchquery"
              defaultValue={searchquery}
              onChange={event => submit(event.currentTarget.form)}
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink to={`contacts/${contact.id}`}>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div className={navigation.state === 'loading' ? 'loading' : ""} id="detail">
        <Outlet />
      </div>
    </>
  );
}
