import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/models/task";

export const dynamic = "force-dynamic";

function handleError(error, label) {
  console.error(`[API /api/tasks ${label}]`, error);
  return NextResponse.json(
    { status: "error", message: error.message || "Internal Server Error" },
    { status: 500 }
  );
}

export async function GET() {
  try {
    console.log("[API /api/tasks] GET called");
    await connectDB();
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ status: "success", tasks });
  } catch (error) {
    return handleError(error, "GET");
  }
}

export async function POST(req) {
  try {
    console.log("[API /api/tasks] POST called");
    await connectDB();
    const { title, completed = false } = await req.json();
    if (!title || !title.trim()) {
      return NextResponse.json(
        { status: "error", message: "Title is required" },
        { status: 400 }
      );
    }
    const task = await Task.create({ title: title.trim(), completed });
    return NextResponse.json({ status: "success", task }, { status: 201 });
  } catch (error) {
    return handleError(error, "POST");
  }
}

export async function PATCH(req) {
  try {
    console.log("[API /api/tasks] PATCH called");
    await connectDB();
    const { id, completed } = await req.json();
    if (!id) {
      return NextResponse.json(
        { status: "error", message: "Task id is required" },
        { status: 400 }
      );
    }
    const task = await Task.findByIdAndUpdate(
      id,
      { completed: !!completed },
      { new: true }
    );
    if (!task) {
      return NextResponse.json(
        { status: "error", message: "Task not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ status: "success", task });
  } catch (error) {
    return handleError(error, "PATCH");
  }
}

export async function DELETE(req) {
  try {
    console.log("[API /api/tasks] DELETE called");
    await connectDB();
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json(
        { status: "error", message: "Task id is required" },
        { status: 400 }
      );
    }
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json(
        { status: "error", message: "Task not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ status: "success" });
  } catch (error) {
    return handleError(error, "DELETE");
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: { Allow: "GET,POST,PATCH,DELETE,OPTIONS" },
  });
}
