import {
  createLegacyUser,
  findLegacyUserByCredentials,
} from "@/app/lib/users";

export async function POST(request) {
  const url = new URL(request.url);
  const action = url.searchParams.get("action");
  const body = await request.json();

  if (!action) {
    return new Response(JSON.stringify({ error: "Action is required" }), { status: 400 });
  }

  if (action === "signup") {
    const { name, gender, phoneNumber, email, password } = body;

    if (!name || !gender || !phoneNumber || !password) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const normalizedPhone = phoneNumber.replace(/\D/g, "");
    if (!/^\d{10}$/.test(normalizedPhone)) {
      return new Response(JSON.stringify({ error: "Invalid phone number" }), { status: 400 });
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: "Invalid email" }), { status: 400 });
    }

    try {
      const user = await createLegacyUser({
        name,
        gender,
        phoneNumber: normalizedPhone,
        email: email || null,
        password,
      });

      return new Response(JSON.stringify({ user }), { status: 201 });
    } catch (error) {
      if (error?.code === 11000) {
        return new Response(JSON.stringify({ error: "Phone number or email already registered" }), { status: 409 });
      }
      throw error;
    }
  }

  if (action === "login") {
    const { emailOrPhone, password } = body;
    if (!emailOrPhone || !password) {
      return new Response(JSON.stringify({ error: "Missing email/phone or password" }), { status: 400 });
    }

    const foundUser = await findLegacyUserByCredentials({
      emailOrPhone,
      password,
    });

    if (!foundUser) {
      return new Response(JSON.stringify({ error: "Invalid email/phone or password" }), { status: 401 });
    }

    return new Response(JSON.stringify({ user: foundUser }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400 });
}
