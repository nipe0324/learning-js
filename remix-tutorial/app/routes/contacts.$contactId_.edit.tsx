import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getContact, updateContact } from "../data";

export const loader = async ({
  params,
}: LoaderFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
}

export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const { contact } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <Form id="contact-form" method="post">
      <p>
        <span>Name</span>
        <input
          name="first"
          type="text"
          defaultValue={contact.first}
          aria-label="First name"
          placeholder="First"
        />
        <input
          name="last"
          type="text"
          defaultValue={contact.last}
          aria-label="Last name"
          placeholder="Last"
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          name="twitter"
          type="text"
          defaultValue={contact.twitter}
          placeholder="@jack"
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          name="avatar"
          type="text"
          defaultValue={contact.avatar}
          aria-label="Avatar URL"
          placeholder="https://example.com/avatar.jpg"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea
          name="notes"
          defaultValue={contact.notes}
          rows={6}
        />
      </label>
      <p>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>
      </p>
    </Form>
  )
}
