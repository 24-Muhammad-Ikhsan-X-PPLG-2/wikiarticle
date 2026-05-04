"use server";

export async function printLog(message: string, object?: Object) {
  console.log({
    log: true,
    message,
    data: object,
  });
}
