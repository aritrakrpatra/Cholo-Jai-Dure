import fs from "fs";
import path from "path";

const usersFile = path.join(process.cwd(), "data", "users.json");

function readUsers() {
  try {
    const file = fs.readFileSync(usersFile, "utf8");
    return JSON.parse(file || "[]");
  } catch (err) {
    if (err.code === "ENOENT") {
      fs.mkdirSync(path.dirname(usersFile), { recursive: true });
      fs.writeFileSync(usersFile, "[]");
      return [];
    }
    throw err;
  }
}

function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

export async function POST(request) {
  const url = new URL(request.url);
  const action = url.searchParams.get("action");
  const body = await request.json();

  if (!action) {
    return new Response(JSON.stringify({ error: "Action is required" }), { status: 400 });
  }

  const users = readUsers();

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

    if (users.some((user) => user.phoneNumber === normalizedPhone)) {
      return new Response(JSON.stringify({ error: "Phone number already registered" }), { status: 409 });
    }

    if (email && users.some((user) => user.email === email)) {
      return new Response(JSON.stringify({ error: "Email already registered" }), { status: 409 });
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      gender,
      phoneNumber: normalizedPhone,
      email: email || null,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeUsers(users);

    const { password: _, ...userWithoutPassword } = newUser;
    return new Response(JSON.stringify({ user: userWithoutPassword }), { status: 201 });
  }

  if (action === "login") {
    const { emailOrPhone, password } = body;
    if (!emailOrPhone || !password) {
      return new Response(JSON.stringify({ error: "Missing email/phone or password" }), { status: 400 });
    }

    const foundUser = users.find(
      (user) =>
        (user.email === emailOrPhone || user.phoneNumber === emailOrPhone) &&
        user.password === password
    );

    if (!foundUser) {
      return new Response(JSON.stringify({ error: "Invalid email/phone or password" }), { status: 401 });
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    return new Response(JSON.stringify({ user: userWithoutPassword }), { status: 200 });
  }

  return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400 });
}
