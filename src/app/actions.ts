'use server'

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { cookies } from 'next/headers'

export async function deleteCookie(name: string) {
  ;(await cookies()).delete(name)
}

export async function setCookie(
  name: string,
  value: string,
  options?: Partial<ResponseCookie>,
) {
  ;(await cookies()).set(name, value, options)
}
