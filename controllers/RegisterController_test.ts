import { RouterContext } from "../deps.ts";
import { Iregister } from "../entity/register.ts";
import { Registeract } from "../models/Registeract_test.ts";

export async function getAll(ctx: RouterContext) {
  try {
    const { response } = ctx;
    const posts = await Registeract.findAll();
    response.status = 200;
    response.body = posts;
  } catch (error) {
    throw error;
  }
}

export async function getFristpage(ctx: RouterContext) {
  try {
    const { response } = ctx;
    const posts = await Registeract.findfristpage();
    response.status = 200;
    response.body = posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getOne(ctx: RouterContext) {
  try {
    const { response, params } = ctx;
    const posts = await Registeract.findOne(params.id!);
    response.status = 200;
    response.body = posts;
  } catch (error) {
    throw error;
  }
}

export async function getMachinegroupid(ctx: RouterContext) {
  try {
    const { response, params } = ctx;
    const posts = await Registeract.findmachinegroupid(
      params.id!,
      params.seasonid!,
    );
    response.status = 200;
    response.body = posts;
  } catch (error) {
    throw error;
  }
}

export async function createPost(ctx: RouterContext) {
  const {
    request,
    response,
  } = ctx;
  try {
    const body = await request.body();
    const value = await body.value;
    const data: Omit<Iregister, "id"> = value;

    const post = await Registeract.insert({ ...data });
    response.status = 201;
    response.body = post;
  } catch (error) {
    throw error;
  }
}

export async function updatePost(ctx: RouterContext) {
  const {
    request,
    response,
  } = ctx;
  try {
    const { response, params } = ctx;
    const body = await request.body();
    const value = await body.value;
    const id = Number(params.id!);
    const data: Omit<Iregister, "id"> = value;
    const Register = await Registeract.findOne(String(id));
    if (Register.length == 0) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid Customer ID" };
      return;
    }
    const post = await Registeract.update({ ...data, id: id });
    response.status = 200;
    response.body = post;
  } catch (error) {
    throw error;
  }
}

export async function deletePost(ctx: RouterContext) {
  const {
    request,
    response,
    params,
  } = ctx;
  try {
    const id = Number(params.id!);
    const Register = await Registeract.findOne(String(id));
    if (Register.length == 0) {
      ctx.response.status = 404;
      ctx.response.body = { message: "Invalid Customer ID" };
      return;
    }
    const post = await Registeract.delete(String(id));
    response.status = 200;
    response.body = post;
  } catch (error) {
    throw error;
  }
}
