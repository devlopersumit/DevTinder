# DevTinder API's
 
## authRouter
- POST /signup
- POST /login
- POST /logout

##  profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password - forgot password api

##  connectionRequest Router
- POST /request/send/:status/:userId
- POST /request/review/:status/:requestId


##  userRouter
- GET /user/connections
- GET /user/requests/received/:requestId
- GET /user/feed  - GEts you the profiles of other users on platform

# STATUS: Ignore, Interested, Accepted, Rejected

# while writing API code, always think about the corner cases.