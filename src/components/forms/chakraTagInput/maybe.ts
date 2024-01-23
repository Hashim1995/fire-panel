/* eslint-disable no-else-return */
/* eslint-disable no-unused-vars */
type Func<A extends unknown[], R> = (...args: A) => R
export type MaybeFunc<A extends unknown[], R> = R | Func<A, R>
export function maybeCall<A extends unknown[], R>(maybeFunc: MaybeFunc<A, R>, ...args: A) {
    if (typeof maybeFunc === 'function') {
        return (maybeFunc as Func<A, R>)(...args)
    } else {
        return maybeFunc
    }
}
