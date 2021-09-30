import { __, assoc } from "ramda";
import { option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";

export function createAction(type: string): () => Record<"type", string>;
export function createAction<T>(
    type: string
): (payload: T) => Record<"type", string> & Record<"payload", T>;
export function createAction(type: any) {
    const actionResult = { type };
    const action = (payload: any) =>
        pipe(
            option.of(payload),
            option.map(assoc("payload", __, actionResult)),
            option.getOrElse(() => actionResult)
        );

    action.toString = () => type;
    return action;
}
