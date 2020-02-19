# Problem
Design a middleware to support following at server side
- Throttle request
- Check for existing user
- Check user's role
- Authorize user

# Solution
- Define abstract class `Middleware` with `linkWith` and `check`. Also define `checkNext`
- Define concrete class `ThrottlingMiddleware`, `UserExistMiddleware`, `RoleCheckMiddleware`
- Define middleware as below
```
const middleware = new ThrottlingMiddleware(2);
    middleware.linkWith(new UserExistMiddleware(server))
    .linkWith(new RoleCheckMiddleware());
```
- Use this middleware for server
# Design pattern used
- Chain of responsibility

