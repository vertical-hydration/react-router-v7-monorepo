import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { type SelectTodo, todosTable } from "@workspace/db";
import { formatDate } from "@workspace/shared/utils";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Input } from "@workspace/ui/components/input";
import { cn } from "@workspace/ui/lib/utils";
import { and, eq, sql } from "drizzle-orm";
import { ArrowLeft, ListTodoIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { data, Form, Link, useFetcher, useNavigation } from "react-router";
import { z } from "zod";
import { adapterContext } from "~/workers/app";
import type { Route } from "./+types/todos";

export const schema = z.discriminatedUnion("intent", [
  z.object({
    intent: z.literal("deleteTodo"),
    id: z.string(),
  }),
  z.object({
    intent: z.literal("createTodo"),
    title: z
      .string({ message: "Todo title is required" })
      .min(10, {
        message: "Todo title must be at least 10 characters long",
      })
      .max(255, {
        message: "Todo title must be less than 255 characters long",
      }),
  }),
  z.object({
    intent: z.literal("toggleTodo"),
    id: z.string(),
  }),
]);

export const meta: Route.MetaFunction = () => [{ title: "Todo List" }];

export async function loader({ context }: Route.LoaderArgs) {
  const { db } = context.get(adapterContext);
  const todos = await db.query.todosTable.findMany({
    orderBy: (todos, { desc }) => [desc(todos.createdAt)],
  });
  return data({ todos });
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  // ...existing code...
}