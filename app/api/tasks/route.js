import { NextResponse } from "next/server";
const Task = require("../../../models/task");
import db from "../../../lib/db";

export const GET = async (req) => {
  try {
    await db();
    const tasks = await Task.find();
    return NextResponse.json({ status: "success", tasks });
  } catch (error) {
    return NextResponse.json({ status: "error", message: error.message });
  }
};

export const POST = async (req) => {
  try {
    await db();
    const { title, completed } = await req.json();
    const task = await Task.create({ title, completed });
    return NextResponse.json({ status: "success", task });
  } catch (error) {
    return NextResponse.json({ status: "error", message: error.message });
  }
};

export const PATCH = async (req) => {
  try {
    await db();
    const { id, completed } = await req.json();
    const task = await Task.findByIdAndUpdate(id, { completed }, { new: true });
    return NextResponse.json({ status: "success", task });
  } catch (error) {
    return NextResponse.json({ status: "error", message: error.message });
  }
};

export const DELETE = async (req) => {
  try {
    await db();
    const { id } = await req.json();
    await Task.findByIdAndDelete(id);
    return NextResponse.json({ status: "success" });
  } catch (error) {
    return NextResponse.json({ status: "error", message: error.message });
  }
};

export const OPTIONS = async () =>
  new NextResponse(null, {
    status: 204,
    headers: { Allow: "GET,POST,PATCH,DELETE,OPTIONS" },
  });
