import {CALL_API} from "../middleware/api";

export function authorized(authorization) {
  return (action) => {
    action[CALL_API].authorization = authorization;
    return action;
  }
}